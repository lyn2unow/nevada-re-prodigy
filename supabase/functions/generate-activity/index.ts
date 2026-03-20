import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const cognitiveLevelDescriptions: Record<string, string> = {
  knowledge: "Recall definitions, rules, timelines, thresholds",
  application: "Apply rules to a given situation or scenario",
  analysis: "Evaluate, compare, and reason through complex problems",
};

const extractActivityTool = {
  name: "extract_activity",
  description: "Extract the generated activity fields into structured data",
  input_schema: {
    type: "object",
    required: ["title", "description", "instructorNotes", "debriefPrompts"],
    properties: {
      title: { type: "string", description: "A concise, descriptive activity title" },
      description: {
        type: "string",
        description: "Full activity description including learning objectives and student engagement instructions",
      },
      instructorNotes: {
        type: "string",
        description: "Private instructor notes: setup, timing, materials, facilitation tips",
      },
      debriefPrompts: {
        type: "array",
        items: { type: "string" },
        minItems: 3,
        maxItems: 3,
        description: "Exactly 3 post-activity debrief discussion questions",
      },
    },
  },
};

async function callModel(
  model: string,
  systemPrompt: string,
  userPrompt: string,
  apiKey: string
): Promise<Response> {
  return fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      tools: [extractActivityTool],
      tool_choice: { type: "function", function: { name: "extract_activity" } },
    }),
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { activityType, topic, cognitiveLevel, pearsonVueArea, sourceContent } = await req.json();

    const cognitiveLevelText = cognitiveLevel && cognitiveLevelDescriptions[cognitiveLevel]
      ? `Target cognitive level: ${cognitiveLevel} — ${cognitiveLevelDescriptions[cognitiveLevel]}.`
      : "";

    const pearsonVueText = pearsonVueArea
      ? `Align with Pearson VUE exam area: ${pearsonVueArea}.`
      : "";

    const systemPrompt = `You are an expert Nevada real estate instructor creating classroom activities for a pre-licensing course. 
Activities must be pedagogically sound, exam-relevant, and engaging. 
Use Nevada-specific laws (NRS/NAC) when applicable. 
${cognitiveLevelText}
${pearsonVueText}
Always use the extract_activity tool to return your response.`;

    let sourceBlock = "";
    if (sourceContent) {
      const parts: string[] = [];
      if (sourceContent.conceptExplanation) {
        parts.push(`Concept: ${sourceContent.conceptExplanation}`);
      }
      if (sourceContent.keyTerms?.length) {
        parts.push(`Key Terms: ${sourceContent.keyTerms.map((t: { term: string; definition: string }) => `${t.term}: ${t.definition}`).join("; ")}`);
      }
      if (sourceContent.examAlerts?.length) {
        parts.push(`Exam Alerts: ${sourceContent.examAlerts.map((a: { text: string }) => a.text).join("; ")}`);
      }
      sourceBlock = parts.length ? `\n\nSource material from the course module:\n${parts.join("\n")}` : "";
    }

    const userPrompt = `Create a ${activityType} activity about "${topic}" for a Nevada real estate pre-licensing class.${sourceBlock}

The activity should be practical, exam-relevant, and suitable for adult learners preparing for the Nevada real estate salesperson exam.`;

    // Try primary model first
    let response = await callModel("claude-sonnet-4-20250514", systemPrompt, userPrompt, LOVABLE_API_KEY);

    // Fallback on rate limit or payment required
    if (response.status === 429 || response.status === 402) {
      console.log(`Primary model returned ${response.status}, falling back to Gemini`);
      response = await callModel("google/gemini-3-flash-preview", systemPrompt, userPrompt, LOVABLE_API_KEY);
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Failed to generate activity" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const responseJson = await response.json();
    let toolInput: Record<string, unknown>;

    // Claude native format: content array with tool_use blocks
    const toolUseBlock = responseJson.content?.find(
      (block: { type: string; name?: string }) =>
        block.type === "tool_use" && block.name === "extract_activity"
    );

    if (toolUseBlock) {
      toolInput = toolUseBlock.input;
    } else {
      // OpenAI-compatible format (Gemini fallback via gateway)
      const toolCall = responseJson.choices?.[0]?.message?.tool_calls?.[0];
      if (!toolCall) {
        console.error("No tool call found in response:", JSON.stringify(responseJson).slice(0, 500));
        return new Response(
          JSON.stringify({ error: "No tool call found in AI response" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      toolInput = typeof toolCall.function.arguments === "string"
        ? JSON.parse(toolCall.function.arguments)
        : toolCall.function.arguments;
    }

    return new Response(JSON.stringify(toolInput), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-activity error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
