type LectureInput = {
  title: string;
  content: string;
  topics: string[];
  week_label: string | null;
  duration_minutes: number | null;
};

type Slide = {
  title: string;
  subtitle: string;
  content: string;
  type: "title" | "objectives" | "terms" | "content" | "alerts" | "discussion";
};

const ACCENT_COLORS = ["#1B6B6B", "#8B1A1A", "#B8860B", "#1B2A4A", "#4A1B6B"];

function detectSlideType(heading: string): Slide["type"] {
  const h = heading.toLowerCase().trim();
  if (h.includes("learning objectives") || h === "objectives") return "objectives";
  if (h.includes("key terms")) return "terms";
  if (h.includes("exam alert") || h.includes("exam alerts") || h.includes("key numbers")) return "alerts";
  if (h.includes("discussion")) return "discussion";
  return "content";
}

function parseLectureToSlides(lecture: LectureInput): Slide[] {
  const lines = lecture.content.split("\n");
  const slides: Slide[] = [];
  let currentTitle = "";
  let currentContent: string[] = [];

  const flush = () => {
    if (currentTitle || currentContent.length > 0) {
      const type = currentTitle ? detectSlideType(currentTitle) : "content";
      slides.push({
        title: currentTitle,
        subtitle: lecture.topics.join(" · "),
        content: currentContent.join("\n").trim(),
        type,
      });
    }
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flush();
      currentTitle = line.replace(/^##\s*/, "").trim();
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }
  flush();

  return slides;
}

function extractNrsRefs(content: string): string[] {
  const matches = content.match(/NRS\s+\d+[\w.]*/g) || [];
  const nac = content.match(/NAC\s+\d+[\w.]*/g) || [];
  return [...new Set([...matches, ...nac])].slice(0, 5);
}

function mdToHtml(text: string): string {
  let html = text
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Subheadings (###)
    .replace(/^###\s+(.+)$/gm, '<div style="font-family:Georgia,serif;font-size:20px;font-weight:bold;color:#1B2A4A;margin:14px 0 6px;">$1</div>');

  // Exam trap highlights
  html = html.replace(/⚠️\s*Exam Trap[:\s]*(.*)/gi,
    '<div style="color:#C0392B;font-weight:bold;margin:6px 0;">⚠️ Exam Trap: $1</div>');

  // Real-world example boxes
  html = html.replace(/🏠\s*Real[- ]World Example[:\s]*([\s\S]*?)(?=\n\n|\n(?:[-*•]|#{2,3}|⚠️|🏠)|$)/gi,
    '<div style="background:#FFFDE7;border-left:4px solid #B8860B;padding:10px 14px;margin:8px 0;border-radius:4px;">🏠 <strong>Real-World Example:</strong> $1</div>');

  // Bullet points
  const lines = html.split("\n");
  const result: string[] = [];
  let inList = false;

  for (const line of lines) {
    const bulletMatch = line.match(/^\s*[-*•]\s+(.*)/);
    if (bulletMatch) {
      if (!inList) { result.push("<ul style='margin:6px 0 6px 20px;'>"); inList = true; }
      result.push(`<li style="margin:3px 0;">${bulletMatch[1]}</li>`);
    } else {
      if (inList) { result.push("</ul>"); inList = false; }
      if (line.trim()) {
        result.push(`<p style="margin:4px 0;">${line}</p>`);
      }
    }
  }
  if (inList) result.push("</ul>");

  return result.join("\n");
}

function buildSlidesHtml(lecture: LectureInput, slides: Slide[]): string {
  const nrsRefs = extractNrsRefs(lecture.content);
  const footerRight = nrsRefs.length > 0 ? nrsRefs.join(", ") : "";
  const footerLeft = `RE 103 · TMCC · ${lecture.title}`;

  const slideWidth = 1122;
  const slideHeight = 794;

  // Title slide
  const titleSlideHtml = `
    <div class="slide" style="background:#1B6B6B;color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:60px;">
      <div style="font-size:14px;letter-spacing:2px;text-transform:uppercase;opacity:0.8;margin-bottom:40px;">RE 103 · Principles of Real Estate</div>
      <div style="font-family:Georgia,serif;font-size:42px;font-weight:bold;line-height:1.2;max-width:900px;">${lecture.title}</div>
      ${lecture.week_label ? `<div style="font-size:18px;margin-top:16px;opacity:0.85;">${lecture.week_label}</div>` : ""}
      <div style="font-size:16px;margin-top:24px;opacity:0.75;">Instructor: TMCC Faculty${lecture.duration_minutes ? ` | Duration: ${lecture.duration_minutes} Minutes` : ""}</div>
    </div>`;

  const contentSlides = slides.map((slide, i) => {
    const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
    const slideNum = i + 2;

    let bodyHtml: string;

    if (slide.type === "alerts") {
      const items = slide.content.split(/\n(?=[-*•]|\d+\.)/).filter(s => s.trim());
      const cards = items.map((item, j) => {
        const color = ACCENT_COLORS[j % ACCENT_COLORS.length];
        return `<div style="background:#fff;border-top:4px solid ${color};border-radius:6px;padding:14px;box-shadow:0 1px 4px rgba(0,0,0,0.08);">
          <div style="font-size:13px;color:#1B2A4A;">${mdToHtml(item.replace(/^\s*[-*•]\s*/, "").trim())}</div>
        </div>`;
      }).join("");
      bodyHtml = `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:10px 0;">${cards}</div>`;
    } else if (slide.type === "objectives") {
      const items = slide.content.split(/\n(?=[-*•]|\d+\.)/).filter(s => s.trim());
      const cards = items.map((item, j) => {
        const color = ACCENT_COLORS[j % ACCENT_COLORS.length];
        return `<div style="background:#f8f9fa;border-left:4px solid ${color};border-radius:4px;padding:12px 14px;">
          <div style="font-size:14px;color:#1B2A4A;">${mdToHtml(item.replace(/^\s*[-*•]\s*/, "").replace(/^\d+\.\s*/, "").trim())}</div>
        </div>`;
      }).join("");
      bodyHtml = `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px;padding:10px 0;">${cards}</div>`;
    } else if (slide.type === "terms") {
      const items = slide.content.split(/\n(?=[-*•])/).filter(s => s.trim());
      const cards = items.map(item => {
        const cleaned = item.replace(/^\s*[-*•]\s*/, "").trim();
        const colonIdx = cleaned.indexOf(":");
        const termName = colonIdx > 0 ? cleaned.slice(0, colonIdx).replace(/\*\*/g, "") : cleaned;
        const termDef = colonIdx > 0 ? cleaned.slice(colonIdx + 1).trim() : "";
        return `<div style="background:#f8f9fa;border-radius:4px;padding:10px 14px;margin:4px 0;">
          <span style="font-weight:bold;color:#1B6B6B;">${termName}</span>${termDef ? `: <span style="color:#1B2A4A;">${termDef}</span>` : ""}
        </div>`;
      }).join("");
      bodyHtml = `<div style="display:flex;flex-direction:column;gap:6px;">${cards}</div>`;
    } else {
      bodyHtml = `<div style="border-left:4px solid #1B6B6B;padding-left:18px;">${mdToHtml(slide.content)}</div>`;
    }

    return `
    <div class="slide" style="display:flex;flex-direction:column;">
      <div style="background:#1B6B6B;padding:18px 30px;display:flex;align-items:baseline;gap:12px;">
        <div style="font-family:Georgia,serif;font-size:26px;font-weight:bold;color:#fff;">${slide.title}</div>
        <div style="font-size:14px;color:rgba(255,255,255,0.65);font-style:italic;">${slide.subtitle}</div>
      </div>
      <div style="flex:1;overflow:hidden;padding:24px 30px;font-size:14px;color:#1B2A4A;line-height:1.55;">
        ${bodyHtml}
      </div>
      <div style="background:#f0f0f0;padding:8px 30px;display:flex;justify-content:space-between;font-size:11px;color:#666;">
        <span>${footerLeft}${footerRight ? " | " + footerRight : ""}</span>
        <span>${slideNum}</span>
      </div>
    </div>`;
  }).join("");

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${lecture.title} — RE 103 Slides</title>
<style>
  @media print {
    @page { size: landscape; margin: 0; }
    body { margin: 0; }
    .slide { page-break-after: always; }
    .slide:last-child { page-break-after: auto; }
    .no-print { display: none !important; }
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; background: #e0e0e0; }
  .slide {
    width: ${slideWidth}px;
    height: ${slideHeight}px;
    background: #fff;
    margin: 20px auto;
    box-shadow: 0 2px 12px rgba(0,0,0,0.15);
    overflow: hidden;
  }
  @media print {
    body { background: #fff; }
    .slide { margin: 0; box-shadow: none; }
  }
  strong { font-weight: 700; }
</style>
</head>
<body>
${titleSlideHtml}
${contentSlides}
</body>
</html>`;
}

export function exportLectureAsSlides(lecture: LectureInput): void {
  const slides = parseLectureToSlides(lecture);
  const html = buildSlidesHtml(lecture, slides);
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 800);
}
