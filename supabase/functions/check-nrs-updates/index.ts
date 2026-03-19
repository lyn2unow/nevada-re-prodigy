import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const sections: string[] = body.sections;

    if (!Array.isArray(sections) || sections.length === 0) {
      return new Response(
        JSON.stringify({ error: "sections (non-empty array) is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) {
      throw new Error("PERPLEXITY_API_KEY is not configured");
    }

    const userPrompt = `Check the following Nevada real estate statutes and regulations for any amendments, legislative changes, or updates enacted in the last 24 months (since early 2024). For each section, report: (1) whether any change was found, (2) a one-sentence summary of the change if found, (3) the bill number or session year if available, and (4) a source URL if available.

Sections to check:
${sections.join("\n")}

Respond in JSON only. Format:
[
  {
    "section": "NRS 645.252",
    "status": "changed" | "no_change" | "unknown",
    "summary": "...",
    "billNumber": "...",
    "sourceUrl": "...",
    "checkedAt": "${new Date().toISOString()}"
  }
]`;

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: "You are a legal research assistant specializing in Nevada real estate law. Respond with valid JSON only, no markdown fences." },
          { role: "user", content: userPrompt },
        ],
        search_recency_filter: "year",
        return_citations: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Perplexity API error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: `Perplexity API error (${response.status})` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "";

    // Extract JSON array from response
    let results;
    try {
      // Try direct parse first
      results = JSON.parse(content);
    } catch {
      // Try extracting JSON from markdown fences
      const match = content.match(/\[[\s\S]*\]/);
      if (match) {
        results = JSON.parse(match[0]);
      } else {
        throw new Error("Could not parse JSON from Perplexity response");
      }
    }

    return new Response(
      JSON.stringify({ results, citations: data.citations ?? [] }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("check-nrs-updates error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
