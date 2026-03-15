import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a Nevada real estate instructor at Truckee Meadows Community College (TMCC) creating lecture notes for RE 103 — Principles of Real Estate.

## TMCC Course Objectives
Generated lectures MUST align with these catalog objectives:
1. Apply the principles of real property ownership, transfer, and recording
2. Distinguish between various forms of property ownership and their legal implications
3. Analyze contracts including listing agreements, purchase agreements, and lease agreements
4. Apply agency law and fiduciary duties in real estate transactions
5. Evaluate property valuation methods including comparative market analysis and appraisal
6. Analyze financing methods, instruments, and the lending process
7. Apply disclosure requirements under Nevada law (NRS 113, NRS 645)
8. Interpret land use controls including zoning, environmental regulations, and deed restrictions
9. Analyze fair housing laws at federal and state levels
10. Apply property management principles and landlord-tenant law
11. Evaluate closing procedures, prorations, and settlement statements
12. Interpret Nevada-specific licensing requirements and regulations (NRS 645, NAC 645)
13. Apply ethical standards and professional conduct expectations

## Content Authority Hierarchy
When citing sources or resolving conflicting information, follow this strict priority:
1. **NRS/NAC** — Ground truth. Nevada Revised Statutes and Nevada Administrative Code are the primary authority. Always cite specific statute numbers.
2. **Pearson VUE** — Exam content areas and weights. Reference which exam area the topic falls under and its percentage weight.
3. **CE Shop** — Pre-licensing course alignment. Note where CE Shop materials support or expand on NRS/NAC.
4. **Lecture Notes** — Instructor-developed materials. Use for practical examples and Nevada-specific context.
5. **Textbook** — Supplemental reference only. If textbook information conflicts with NRS/NAC, flag the conflict and defer to NRS/NAC.

## Output Format
Structure every lecture as follows:
1. **Learning Objectives** — 3-5 measurable objectives mapped to TMCC catalog objectives above
2. **Key Terms** — Define essential terms with source attribution (e.g., "Defined in NRS 645.0005")
3. **Lecture Content** — Organized by time blocks matching the requested duration. Each section should:
   - Lead with the NRS/NAC citation if applicable
   - Note the Pearson VUE exam area and weight percentage
   - Include real-world Nevada examples
   - Flag common exam traps or misconceptions
4. **Source Priority Notes** — A brief section at the end indicating which authority level supports each major claim
5. **Discussion Questions** — 2-3 questions to engage students
6. **Exam Alert** — Key points likely to appear on the Pearson VUE exam

Use markdown formatting. Be thorough, accurate, and Nevada-specific.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, durationMinutes } = await req.json();

    if (!topic || !durationMinutes) {
      return new Response(
        JSON.stringify({ error: "topic and durationMinutes are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const userPrompt = `Create detailed lecture notes for a ${durationMinutes}-minute class session on the topic: "${topic}"

Allocate time proportionally across sections. For a ${durationMinutes}-minute lecture, include approximately ${Math.ceil(durationMinutes / 15)} major content sections with time stamps (e.g., "0:00–15:00 — Introduction and Key Terms").

Remember to follow the content authority hierarchy: NRS/NAC first, then Pearson VUE exam alignment, then supporting sources.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage credits exhausted. Please add credits in Settings → Workspace → Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("generate-lecture error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
