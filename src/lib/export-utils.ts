import type { Module, ExamQuestion, Activity, SyllabusTemplate } from "@/types/course";
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

  // Build per-answer response conditions with individual feedback refs
  const respconditions = q.options.map((_, i) => {
    const isCorrect = i === q.correctIndex;
    return `
        <respcondition continue="No">
          <conditionvar>
            <varequal respident="response1">${responseLabels[i]}</varequal>
          </conditionvar>
          <setvar action="Set" varname="SCORE">${isCorrect ? "1" : "0"}</setvar>
          <displayfeedback feedbacktype="Response" linkrefid="${isCorrect ? "correct_fb" : `wrong_fb_${i}`}"/>
        </respcondition>`;
  }).join("");

  // Build per-answer feedback blocks
  const correctFeedback = `
      <itemfeedback ident="correct_fb">
        <material>
          <mattext texttype="text/html">&lt;p&gt;&lt;strong&gt;Correct!&lt;/strong&gt; ${escapeXml(q.explanation)}&lt;/p&gt;</mattext>
        </material>
      </itemfeedback>`;

  let wrongIdx = 0;
  const wrongFeedbacks = q.options.map((opt, i) => {
    if (i === q.correctIndex) return "";
    const specificFeedback = q.wrongExplanations[wrongIdx] || q.explanation;
    wrongIdx++;
    return `
      <itemfeedback ident="wrong_fb_${i}">
        <material>
          <mattext texttype="text/html">&lt;p&gt;&lt;strong&gt;Incorrect.&lt;/strong&gt; You chose &amp;quot;${escapeXml(opt)}&amp;quot; — ${escapeXml(specificFeedback)} The correct answer is ${String.fromCharCode(65 + q.correctIndex)}: ${escapeXml(q.options[q.correctIndex])}.&lt;/p&gt;</mattext>
        </material>
      </itemfeedback>`;
  }).filter(Boolean).join("");

  // General feedback shown after submission
  const generalFeedback = `
      <itemfeedback ident="general_fb">
        <material>
          <mattext texttype="text/html">&lt;p&gt;${escapeXml(q.explanation)}${q.examTrap && q.examTrapNote ? ` &lt;br/&gt;&lt;em&gt;⚠️ Exam Trap: ${escapeXml(q.examTrapNote)}&lt;/em&gt;` : ""}&lt;/p&gt;</mattext>
        </material>
      </itemfeedback>`;

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
${respconditions}
      </resprocessing>
${correctFeedback}
${wrongFeedbacks}
${generalFeedback}
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

// ─── Canvas Discussion Topic (HTML for paste) ────────────────────

export function formatDiscussionHtml(module: Module): string {
  const lines: string[] = [];
  lines.push(`<h2>${escapeHtml(module.title)}</h2>`);
  lines.push(`<p><strong>Week ${module.weekNumber}</strong> | Source: ${escapeHtml(module.sourceTag)} | ${escapeHtml(module.estimatedTime || "")}</p>`);

  if (module.conceptExplanation) {
    lines.push(`<h3>Overview</h3>`);
    lines.push(`<p>${escapeHtml(module.conceptExplanation)}</p>`);
  }

  if (module.realWorldScenario) {
    lines.push(`<h3>Real-World Scenario</h3>`);
    lines.push(`<p>${escapeHtml(module.realWorldScenario)}</p>`);
  }

  if (module.discussionPrompt) {
    lines.push(`<hr/>`);
    lines.push(`<h3>Discussion Prompt</h3>`);
    lines.push(`<p>${escapeHtml(module.discussionPrompt)}</p>`);
    lines.push(`<p><em>Reply to at least two classmates with substantive responses that reference the course material.</em></p>`);
  }

  if (module.examAlerts.length > 0) {
    lines.push(`<h3>⚠️ Exam Alerts</h3><ul>`);
    module.examAlerts.forEach((a) => {
      lines.push(`<li><strong>[${escapeHtml(a.type)}]</strong> ${escapeHtml(a.text)}</li>`);
    });
    lines.push(`</ul>`);
  }

  return lines.join("\n");
}

export function formatDiscussionsAsHtml(modules: Module[]): string {
  return modules.map((m) => formatDiscussionHtml(m)).join("\n<hr style='border:2px solid #ccc;margin:2em 0;'/>\n");
}

// ─── Canvas Assignment (HTML for paste) ──────────────────────────

export function formatAssignmentHtml(activity: Activity): string {
  const lines: string[] = [];
  lines.push(`<h2>${escapeHtml(activity.title)}</h2>`);
  lines.push(`<p><strong>Type:</strong> ${escapeHtml(activity.type)}${activity.weekNumber ? ` | <strong>Week ${activity.weekNumber}</strong>` : ""}${activity.topic ? ` | <strong>Topic:</strong> ${escapeHtml(activity.topic)}` : ""}</p>`);

  lines.push(`<h3>Instructions</h3>`);
  lines.push(`<p>${escapeHtml(activity.description).replace(/\n/g, "<br/>")}</p>`);

  if (activity.debriefPrompts.length > 0) {
    lines.push(`<h3>Debrief / Reflection Questions</h3><ol>`);
    activity.debriefPrompts.forEach((p) => {
      lines.push(`<li>${escapeHtml(p)}</li>`);
    });
    lines.push(`</ol>`);
  }

  if (activity.tags.length > 0) {
    lines.push(`<p><em>Tags: ${escapeHtml(activity.tags.join(", "))}</em></p>`);
  }

  return lines.join("\n");
}

export function formatAssignmentsAsHtml(activities: Activity[]): string {
  return activities.map((a) => formatAssignmentHtml(a)).join("\n<hr style='border:2px solid #ccc;margin:2em 0;'/>\n");
}

// ─── Copy HTML to clipboard (rich text) ──────────────────────────

export async function copyHtmlToClipboard(html: string): Promise<boolean> {
  try {
    const blob = new Blob([html], { type: "text/html" });
    const plainBlob = new Blob([html.replace(/<[^>]*>/g, "")], { type: "text/plain" });
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": blob,
        "text/plain": plainBlob,
      }),
    ]);
    return true;
  } catch {
    // Fallback to plain text copy
    return copyToClipboard(html.replace(/<[^>]*>/g, ""));
  }
}

// ─── Syllabus Export ─────────────────────────────────────────────

import type { SyllabusTemplate } from "@/types/course";

export function formatSyllabusAsText(s: SyllabusTemplate): string {
  const lines: string[] = [];

  lines.push(`${s.courseCode} — ${s.courseTitle}`);
  lines.push(`${s.semester}`);
  lines.push("=".repeat(60));
  lines.push("");

  lines.push("COURSE INFORMATION");
  lines.push(`Instructor: ${s.instructorName}, ${s.instructorCredentials}`);
  lines.push(`Schedule: ${s.meetingDays}, ${s.meetingTime}`);
  lines.push(`Location: ${s.location}`);
  lines.push(`Dates: ${s.dateRange}`);
  lines.push(`Textbook: ${s.textbook}`);
  lines.push(`Platform: ${s.platform}`);
  lines.push("");
  if (s.contactInfo) { lines.push(`Contact: ${s.contactInfo}`); lines.push(""); }

  lines.push("COURSE OBJECTIVES");
  s.courseObjectives.forEach((obj, i) => lines.push(`  ${i + 1}. ${obj}`));
  lines.push("");

  if (s.readingRequirement) { lines.push("READING REQUIREMENT"); lines.push(s.readingRequirement); lines.push(""); }
  if (s.courseFlow) { lines.push("COURSE FLOW"); lines.push(s.courseFlow); lines.push(""); }

  lines.push("WEEKLY SCHEDULE");
  lines.push("-".repeat(60));
  const colW = [6, 12, 40, 40, 30];
  lines.push(
    "Week".padEnd(colW[0]) + "Day".padEnd(colW[1]) + "Unit / Topic".padEnd(colW[2]) + "Exam Alignment".padEnd(colW[3]) + "Assignment/Quiz"
  );
  lines.push("-".repeat(60));
  s.weeklySchedule.forEach((e) => {
    lines.push(
      String(e.week).padEnd(colW[0]) + e.day.padEnd(colW[1]) + e.unitTopic.substring(0, 80)
    );
    if (e.examAlignment) lines.push("      Alignment: " + e.examAlignment);
    if (e.assignmentQuiz) lines.push("      Assignment: " + e.assignmentQuiz);
  });
  lines.push("");

  lines.push("GRADING BREAKDOWN");
  s.gradingCategories.forEach((c) => lines.push(`  ${c.category}: ${c.points} pts`));
  lines.push(`  Total: ${s.totalPoints} pts`);
  lines.push("");

  lines.push("GRADE SCALE");
  s.gradeScale.forEach((g) => lines.push(`  ${g.letter}: ${g.range}`));
  lines.push("");

  lines.push("INSTRUCTOR EXPECTATIONS & POLICIES");
  s.instructorPolicies.forEach((p) => lines.push(`  • ${p}`));
  lines.push("");

  lines.push("INSTITUTIONAL POLICIES");
  s.institutionalPolicies.forEach((p) => {
    lines.push(`  ${p.title}`);
    lines.push(`    ${p.content}`);
    lines.push("");
  });

  return lines.join("\n");
}

export function generateSyllabusPdf(s: SyllabusTemplate) {
  const text = formatSyllabusAsText(s);
  generatePdf(`${s.courseCode} Syllabus — ${s.semester}`, text);
}
