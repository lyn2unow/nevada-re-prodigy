import type { Module, ExamQuestion, Activity } from "@/types/course";
import JSZip from "jszip";

// ─── Module formatting ───────────────────────────────────────────

export function formatModuleAsText(module: Module): string {
  const lines: string[] = [];
  lines.push(`# ${module.title}`);
  lines.push(`Week ${module.weekNumber} | Source: ${module.sourceTag} | ${module.estimatedTime || "No time estimate"}`);
  lines.push("");

  if (module.keyTerms.length > 0) {
    lines.push("## Key Terms");
    module.keyTerms.forEach((kt) => {
      lines.push(`- **${kt.term}**: ${kt.definition} (${kt.source})`);
    });
    lines.push("");
  }

  if (module.conceptExplanation) {
    lines.push("## Concept Explanation");
    lines.push(module.conceptExplanation);
    lines.push("");
  }

  if (module.nevadaLegalRefs) {
    lines.push("## Nevada Legal References");
    lines.push(module.nevadaLegalRefs);
    lines.push("");
  }

  if (module.realWorldScenario) {
    lines.push("## Real-World Scenario");
    lines.push(module.realWorldScenario);
    lines.push("");
  }

  if (module.commonMistakes) {
    lines.push("## Common Mistakes");
    lines.push(module.commonMistakes);
    lines.push("");
  }

  if (module.examKeyPoints) {
    lines.push("## Exam Key Points");
    lines.push(module.examKeyPoints);
    lines.push("");
  }

  if (module.examAlerts.length > 0) {
    lines.push("## Exam Alerts");
    module.examAlerts.forEach((a) => {
      lines.push(`- ⚠️ [${a.type}] ${a.text}`);
    });
    lines.push("");
  }

  if (module.knowledgeChecks.length > 0) {
    lines.push("## Knowledge Check Questions");
    module.knowledgeChecks.forEach((kc, i) => {
      lines.push(`${i + 1}. ${kc.question}`);
      kc.options.forEach((opt, j) => {
        const marker = j === kc.correctIndex ? "✓" : " ";
        lines.push(`   ${String.fromCharCode(65 + j)}. [${marker}] ${opt}`);
      });
      lines.push(`   Explanation: ${kc.explanation}`);
      lines.push("");
    });
  }

  if (module.discussionPrompt) {
    lines.push("## Discussion Prompt");
    lines.push(module.discussionPrompt);
    lines.push("");
  }

  if (module.assignmentSuggestion) {
    lines.push("## Assignment Suggestion");
    lines.push(module.assignmentSuggestion);
    lines.push("");
  }

  return lines.join("\n");
}

// ─── Exam question formatting ────────────────────────────────────

export function formatExamQuestionAsText(q: ExamQuestion, index?: number): string {
  const lines: string[] = [];
  const prefix = index !== undefined ? `${index + 1}. ` : "";
  lines.push(`${prefix}${q.question}`);
  lines.push(`   Topic: ${q.topic} | Difficulty: ${q.difficulty} | Source: ${q.source}`);
  if (q.examTrap) lines.push(`   ⚠️ EXAM TRAP: ${q.examTrapNote || "Flagged as common trap"}`);
  lines.push("");

  q.options.forEach((opt, i) => {
    const marker = i === q.correctIndex ? "✓" : " ";
    lines.push(`   ${String.fromCharCode(65 + i)}. [${marker}] ${opt}`);
  });
  lines.push("");
  lines.push(`   Correct: ${String.fromCharCode(65 + q.correctIndex)} — ${q.explanation}`);

  let wrongIdx = 0;
  q.options.forEach((_, i) => {
    if (i !== q.correctIndex) {
      if (q.wrongExplanations[wrongIdx]) {
        lines.push(`   Why ${String.fromCharCode(65 + i)} is wrong: ${q.wrongExplanations[wrongIdx]}`);
      }
      wrongIdx++;
    }
  });

  if (q.tags.length > 0) {
    lines.push(`   Tags: ${q.tags.join(", ")}`);
  }
  lines.push("");
  return lines.join("\n");
}

export function formatExamQuestionsAsText(questions: ExamQuestion[]): string {
  const lines: string[] = [];
  lines.push("# Exam Prep Question Bank");
  lines.push(`Total: ${questions.length} questions`);
  lines.push("");
  questions.forEach((q, i) => {
    lines.push(formatExamQuestionAsText(q, i));
  });
  return lines.join("\n");
}

// ─── Activity formatting ─────────────────────────────────────────

export function formatActivityAsText(activity: Activity): string {
  const lines: string[] = [];
  lines.push(`# ${activity.title}`);
  lines.push(`Type: ${activity.type}${activity.weekNumber ? ` | Week ${activity.weekNumber}` : ""}${activity.topic ? ` | Topic: ${activity.topic}` : ""}`);
  lines.push("");

  lines.push("## Description");
  lines.push(activity.description);
  lines.push("");

  if (activity.instructorNotes) {
    lines.push("## Instructor Notes");
    lines.push(activity.instructorNotes);
    lines.push("");
  }

  if (activity.debriefPrompts.length > 0) {
    lines.push("## Debrief Prompts");
    activity.debriefPrompts.forEach((p, i) => {
      lines.push(`${i + 1}. ${p}`);
    });
    lines.push("");
  }

  if (activity.tags.length > 0) {
    lines.push(`Tags: ${activity.tags.join(", ")}`);
  }

  return lines.join("\n");
}

// ─── Copy to clipboard ──────────────────────────────────────────

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      document.body.removeChild(textarea);
      return true;
    } catch {
      document.body.removeChild(textarea);
      return false;
    }
  }
}

// ─── PDF generation (pure HTML→print) ────────────────────────────

export function generatePdf(title: string, content: string) {
  const htmlContent = contentToHtml(title, content);
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  printWindow.document.write(htmlContent);
  printWindow.document.close();

  // Wait for content to render, then trigger print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
    }, 300);
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function contentToHtml(title: string, markdown: string): string {
  // Escape all user content first to prevent XSS
  const safeTitle = escapeHtml(title);
  const safeMarkdown = escapeHtml(markdown);

  // Apply markdown formatting on escaped content
  let html = safeMarkdown
    // Headers
    .replace(/^## (.+)$/gm, '<h2 style="color:#1a365d;margin-top:1.5em;margin-bottom:0.5em;font-size:1.1em;border-bottom:1px solid #e2e8f0;padding-bottom:4px;">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="color:#1a365d;margin-bottom:0.3em;font-size:1.4em;">$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // List items
    .replace(/^- (.+)$/gm, '<li style="margin-bottom:4px;">$1</li>')
    // Numbered list items (simple)
    .replace(/^(\d+)\. (.+)$/gm, '<li style="margin-bottom:4px;">$2</li>')
    // Paragraphs (non-empty lines that aren't already wrapped)
    .replace(/^(?!&lt;[hl])((?!&lt;li).+)$/gm, '<p style="margin:0.4em 0;line-height:1.6;">$1</p>')
    // Empty lines
    .replace(/^\s*$/gm, "");

  // Wrap consecutive li elements in ul
  html = html.replace(/(<li[^>]*>.*?<\/li>\s*)+/g, (match) => {
    return `<ul style="margin:0.5em 0;padding-left:1.5em;">${match}</ul>`;
  });

  return `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline';">
  <title>${safeTitle}</title>
  <style>
    @media print {
      body { margin: 0.75in; }
      @page { margin: 0.75in; }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #1a202c;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 { page-break-after: avoid; }
    h2 { page-break-after: avoid; }
  </style>
</head>
<body>${html}</body>
</html>`;
}

// ─── QTI 1.2 Export (Canvas-compatible ZIP) ──────────────────────

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateQuestionItemXml(q: ExamQuestion, index: number): string {
  const ident = `q_${q.id}`;
  const responseLabels = q.options.map((_, i) => `resp_${i}`);
  const correctResp = responseLabels[q.correctIndex];
  const wrongResps = responseLabels.filter((_, i) => i !== q.correctIndex);

  const feedbackText = escapeXml(q.explanation);

  const responseLabelsXml = q.options
    .map(
      (opt, i) =>
        `          <response_label ident="${responseLabels[i]}">
            <material>
              <mattext texttype="text/plain">${escapeXml(opt)}</mattext>
            </material>
          </response_label>`
    )
    .join("\n");

  // Incorrect condition uses <or> listing each wrong ident explicitly
  const wrongVarequals = wrongResps
    .map((r) => `              <varequal respident="response1">${r}</varequal>`)
    .join("\n");

  const respconditionXml = `
        <respcondition continue="No">
          <conditionvar>
            <varequal respident="response1">${correctResp}</varequal>
          </conditionvar>
          <setvar action="Set" varname="SCORE">1</setvar>
          <displayfeedback feedbacktype="Response" linkrefid="correct_fb"/>
        </respcondition>
        <respcondition continue="No">
          <conditionvar>
            <or>
${wrongVarequals}
            </or>
          </conditionvar>
          <setvar action="Set" varname="SCORE">0</setvar>
          <displayfeedback feedbacktype="Response" linkrefid="incorrect_fb"/>
        </respcondition>`;

  return `
    <item ident="${ident}" title="${escapeXml(`Question ${index + 1}: ${q.topic}`)}">
      <itemmetadata>
        <qtimetadata>
          <qtimetadatafield>
            <fieldlabel>question_type</fieldlabel>
            <fieldentry>multiple_choice_question</fieldentry>
          </qtimetadatafield>
          <qtimetadatafield>
            <fieldlabel>points_possible</fieldlabel>
            <fieldentry>1.0</fieldentry>
          </qtimetadatafield>
        </qtimetadata>
      </itemmetadata>
      <presentation>
        <material>
          <mattext texttype="text/html">&lt;p&gt;${escapeXml(q.question)}&lt;/p&gt;</mattext>
        </material>
        <response_lid ident="response1" rcardinality="Single">
          <render_choice>
${responseLabelsXml}
          </render_choice>
        </response_lid>
      </presentation>
      <resprocessing>
        <outcomes>
          <decvar maxvalue="1" minvalue="0" varname="SCORE" vartype="Decimal"/>
        </outcomes>
${respconditionXml}
      </resprocessing>
      <itemfeedback ident="correct_fb">
        <material>
          <mattext texttype="text/html">&lt;p&gt;${escapeXml(feedbackText)}&lt;/p&gt;</mattext>
        </material>
      </itemfeedback>
      <itemfeedback ident="incorrect_fb">
        <material>
          <mattext texttype="text/html">&lt;p&gt;Incorrect. ${escapeXml(feedbackText)}&lt;/p&gt;</mattext>
        </material>
      </itemfeedback>
    </item>`;
}

function generateAssessmentXml(title: string, questions: ExamQuestion[]): string {
  const assessmentIdent = `assessment_${Date.now()}`;
  const items = questions.map((q, i) => generateQuestionItemXml(q, i)).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<questestinterop xmlns="http://www.imsglobal.org/xsd/ims_qtiasiv1p2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsglobal.org/xsd/ims_qtiasiv1p2 http://www.imsglobal.org/xsd/ims_qtiasiv1p2p1.xsd">
  <assessment ident="${assessmentIdent}" title="${escapeXml(title)}">
    <qtimetadata>
      <qtimetadatafield>
        <fieldlabel>cc_maxattempts</fieldlabel>
        <fieldentry>1</fieldentry>
      </qtimetadatafield>
    </qtimetadata>
    <section ident="root_section">
${items}
    </section>
  </assessment>
</questestinterop>`;
}

function generateManifestXml(assessmentFile: string, title: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="manifest_${Date.now()}"
  xmlns="http://www.imsglobal.org/xsd/imsccv1p1/imscp_v1p1"
  xmlns:lom="http://ltsc.ieee.org/xsd/imsccv1p1/LOM/resource"
  xmlns:imsmd="http://www.imsglobal.org/xsd/imsmd_v1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imsccv1p1/imscp_v1p1 http://www.imsglobal.org/xsd/imscp_v1p1.xsd http://ltsc.ieee.org/xsd/imsccv1p1/LOM/resource http://www.imsglobal.org/profile/cc/ccv1p1/LOM/ccv1p1_lomresource_v1p0.xsd http://www.imsglobal.org/xsd/imsmd_v1p2 http://www.imsglobal.org/xsd/imsmd_v1p2p2.xsd">
  <metadata>
    <schema>IMS Content</schema>
    <schemaversion>1.1.3</schemaversion>
    <lom:lom>
      <lom:general>
        <lom:title>
          <lom:string>${escapeXml(title)}</lom:string>
        </lom:title>
      </lom:general>
    </lom:lom>
  </metadata>
  <organizations/>
  <resources>
    <resource identifier="resource_quiz" type="imsqti_xmlv1p2" href="${assessmentFile}">
      <file href="${assessmentFile}"/>
    </resource>
  </resources>
</manifest>`;
}

export async function generateQtiZip(title: string, questions: ExamQuestion[]): Promise<void> {
  const zip = new JSZip();

  const assessmentFileName = "assessment.xml";
  const assessmentXml = generateAssessmentXml(title, questions);
  const manifestXml = generateManifestXml(assessmentFileName, title);

  zip.file(assessmentFileName, assessmentXml);
  zip.file("imsmanifest.xml", manifestXml);

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.replace(/[^a-zA-Z0-9]/g, "_")}_QTI.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
