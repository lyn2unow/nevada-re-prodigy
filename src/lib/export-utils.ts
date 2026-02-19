import type { Module, ExamQuestion, Activity } from "@/types/course";

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

function contentToHtml(title: string, markdown: string): string {
  // Simple markdown-to-HTML conversion for our structured content
  let html = markdown
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
    .replace(/^(?!<[hl])((?!<li).+)$/gm, '<p style="margin:0.4em 0;line-height:1.6;">$1</p>')
    // Empty lines
    .replace(/^\s*$/gm, "");

  // Wrap consecutive li elements in ul
  html = html.replace(/(<li[^>]*>.*?<\/li>\s*)+/g, (match) => {
    return `<ul style="margin:0.5em 0;padding-left:1.5em;">${match}</ul>`;
  });

  return `<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
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
