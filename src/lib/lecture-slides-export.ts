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

const ACCENT_COLORS = ["#1B6B6B", "#B8860B", "#1B2A4A", "#8B1A1A", "#4A1B6B"];

function detectSlideType(heading: string): Slide["type"] {
  const h = heading.toLowerCase().trim();
  if (h.includes("learning objectives") || h === "objectives") return "objectives";
  if (h.includes("key terms")) return "terms";
  if (h.includes("exam alert") || h.includes("exam alerts") || h.includes("key numbers")) return "alerts";
  if (h.includes("discussion")) return "discussion";
  return "content";
}

function isIntroBlock(content: string): boolean {
  return /^#\s+RE\s+103/m.test(content) || (content.includes("Instructor:") && content.includes("Duration:"));
}

function splitLongSlides(slides: Slide[]): Slide[] {
  const result: Slide[] = [];
  for (const slide of slides) {
    const wordCount = slide.content.split(/\s+/).length;
    if (wordCount <= 600) {
      result.push(slide);
      continue;
    }
    const paragraphs = slide.content.split(/\n\n/);
    let chunk: string[] = [];
    let chunkWords = 0;
    let partIndex = 0;

    for (const para of paragraphs) {
      const paraWords = para.split(/\s+/).length;
      if (chunkWords + paraWords > 600 && chunk.length > 0) {
        result.push({
          ...slide,
          title: partIndex === 0 ? slide.title : `${slide.title} (continued)`,
          content: chunk.join("\n\n").trim(),
        });
        chunk = [para];
        chunkWords = paraWords;
        partIndex++;
      } else {
        chunk.push(para);
        chunkWords += paraWords;
      }
    }
    if (chunk.length > 0) {
      result.push({
        ...slide,
        title: partIndex === 0 ? slide.title : `${slide.title} (continued)`,
        content: chunk.join("\n\n").trim(),
      });
    }
  }
  return result;
}

function parseLectureToSlides(lecture: LectureInput): Slide[] {
  const lines = lecture.content.split("\n");
  const slides: Slide[] = [];
  let currentTitle = "";
  let currentContent: string[] = [];

  const flush = () => {
    const raw = currentContent.join("\n").trim();
    if ((currentTitle || raw.length > 0) && !isIntroBlock(raw)) {
      const type = currentTitle ? detectSlideType(currentTitle) : "content";
      slides.push({
        title: currentTitle,
        subtitle: lecture.topics.join(" · "),
        content: raw,
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

  return splitLongSlides(slides);
}

function extractNrsRefs(content: string): string[] {
  const matches = content.match(/NRS\s+\d+[\w.]*/g) || [];
  const nac = content.match(/NAC\s+\d+[\w.]*/g) || [];
  return [...new Set([...matches, ...nac])].slice(0, 5);
}

function extractNrsBadge(text: string): string {
  const ref = text.match(/(?:NRS|NAC)\s+\d+[\w.]*/);
  return ref ? ref[0] : "";
}

function mdToHtml(text: string): string {
  // Apply bold/italic FIRST
  let html = text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^###\s+(.+)$/gm, '<div style="font-family:Georgia,serif;font-size:20px;font-weight:bold;color:#1B2A4A;margin:14px 0 6px;">$1</div>');

  // Exam trap highlights
  html = html.replace(/⚠️\s*Exam Trap[:\s]*(.*)/gi,
    '<div style="background:#FFF5F5;border-left:4px solid #C0392B;padding:10px 14px;margin:8px 0;border-radius:4px;color:#C0392B;font-weight:bold;-webkit-print-color-adjust:exact;print-color-adjust:exact;">⚠️ Exam Trap: $1</div>');

  // Real-world example boxes
  html = html.replace(/🏠\s*Real[- ]World Example[:\s]*([\s\S]*?)(?=\n\n|\n(?:[-*•]|#{2,3}|⚠️|🏠)|$)/gi,
    '<div style="background:#FFFDE7;border-left:4px solid #B8860B;padding:10px 14px;margin:8px 0;border-radius:4px;-webkit-print-color-adjust:exact;print-color-adjust:exact;">🏠 <strong>Real-World Example:</strong> $1</div>');

  const lines = html.split("\n");
  const result: string[] = [];
  let inList = false;

  for (const line of lines) {
    // Roman numeral or letter section headers
    if (/^[IVX]+\.\s/.test(line) || /^[A-Z]\.\s/.test(line)) {
      if (inList) { result.push("</ul>"); inList = false; }
      result.push(`<div style="font-family:Georgia,serif;font-size:15px;font-weight:bold;color:#1B6B6B;margin:12px 0 6px;-webkit-print-color-adjust:exact;print-color-adjust:exact;">${line}</div>`);
      continue;
    }

    // Blockquote exam trap boxes
    const blockquoteMatch = line.match(/^>\s*(.*)/);
    if (blockquoteMatch) {
      if (inList) { result.push("</ul>"); inList = false; }
      result.push(`<div style="background:#FFF5F5;border-left:4px solid #C0392B;padding:8px 12px;margin:8px 0;border-radius:4px;color:#C0392B;font-weight:bold;-webkit-print-color-adjust:exact;print-color-adjust:exact;">${blockquoteMatch[1]}</div>`);
      continue;
    }

    // Numbered section headers (standalone, not inside lists)
    const numberedMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (numberedMatch && !inList) {
      result.push(`<div style="font-family:Georgia,serif;font-size:18px;font-weight:bold;color:#1B6B6B;margin:16px 0 6px;-webkit-print-color-adjust:exact;print-color-adjust:exact;">${numberedMatch[1]}. ${numberedMatch[2]}</div>`);
      continue;
    }

    // Real-World / Nevada Example lines
    if (/Real[- ]World|Nevada Example/i.test(line) && !line.startsWith("<div")) {
      if (inList) { result.push("</ul>"); inList = false; }
      result.push(`<div style="background:#FFFDE7;border-left:4px solid #B8860B;padding:8px 12px;margin:8px 0;border-radius:4px;-webkit-print-color-adjust:exact;print-color-adjust:exact;">${line}</div>`);
      continue;
    }

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

  const titleSlideHtml = `
    <div class="slide title-slide" style="background:#1B6B6B;color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:60px;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
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
        const cleaned = item.replace(/^\s*[-*•]\s*/, "").replace(/^\d+\.\s*/, "").trim();
        const processedHtml = mdToHtml(cleaned);
        // Extract first sentence as title
        const sentenceMatch = cleaned.replace(/\*\*/g, "").match(/^([^.!?]+[.!?]?)/);
        const title = sentenceMatch ? sentenceMatch[1].trim() : cleaned.slice(0, 60);
        const body = cleaned.slice(title.length).trim();
        return `<div style="background:#fff;border:1px solid #e0e0e0;border-top:3px solid ${color};border-radius:4px;padding:14px;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
          <div style="font-size:13px;font-weight:bold;color:${color};margin-bottom:6px;">${title}</div>
          ${body ? `<div style="font-size:12px;color:#1B2A4A;">${mdToHtml(body)}</div>` : ""}
        </div>`;
      }).join("");
      bodyHtml = `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:10px 0;">${cards}</div>`;

    } else if (slide.type === "objectives") {
      const items = slide.content.split(/\n(?=\d+\.)/).filter(s => s.trim());
      const cards = items.map((item, j) => {
        const cleaned = item.replace(/^\d+\.\s*/, "").replace(/\*\*/g, "").trim();
        const words = cleaned.split(/\s+/);
        const titleText = words.slice(0, 5).join(" ");
        const fullText = cleaned;
        return `<div style="background:#fff;border:1px solid #e0e0e0;border-top:3px solid #1B6B6B;border-radius:4px;padding:20px;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
          <div style="font-size:14px;font-weight:bold;color:#1B6B6B;margin-bottom:8px;">${titleText}...</div>
          <div style="font-size:13px;color:#1B2A4A;">${mdToHtml(fullText)}</div>
        </div>`;
      }).join("");
      bodyHtml = `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px;padding:10px 0;">${cards}</div>`;

    } else if (slide.type === "terms") {
      const items = slide.content.split(/\n(?=[-*•])/).filter(s => s.trim());
      const cards = items.map(item => {
        const cleaned = item.replace(/^\s*[-*•]\s*/, "").trim();
        const colonIdx = cleaned.indexOf(":");
        const termName = colonIdx > 0 ? cleaned.slice(0, colonIdx).replace(/\*\*/g, "").trim() : cleaned.replace(/\*\*/g, "").trim();
        const termDef = colonIdx > 0 ? cleaned.slice(colonIdx + 1).replace(/\*\*/g, "").trim() : "";
        const nrsBadge = extractNrsBadge(termDef);
        const defWithoutNrs = nrsBadge ? termDef.replace(nrsBadge, "").replace(/[()]/g, "").trim() : termDef;
        return `<div style="background:#fff;border:1px solid #e0e0e0;border-radius:4px;padding:16px;position:relative;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;">
            <span style="font-weight:bold;color:#1B6B6B;font-size:14px;">${termName}</span>
            ${nrsBadge ? `<span style="background:#e0e0e0;border-radius:12px;padding:2px 8px;font-size:11px;color:#555;white-space:nowrap;-webkit-print-color-adjust:exact;print-color-adjust:exact;">${nrsBadge}</span>` : ""}
          </div>
          ${defWithoutNrs ? `<div style="font-size:12px;color:#1B2A4A;">${mdToHtml(defWithoutNrs)}</div>` : ""}
        </div>`;
      }).join("");
      bodyHtml = `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">${cards}</div>`;

    } else {
      bodyHtml = `<div style="border-left:4px solid #1B6B6B;padding-left:18px;-webkit-print-color-adjust:exact;print-color-adjust:exact;">${mdToHtml(slide.content)}</div>`;
    }

    return `
    <div class="slide" style="display:flex;flex-direction:column;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
      <div class="slide-header" style="background:${accent};padding:18px 30px;display:flex;align-items:baseline;gap:12px;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
        <div style="font-family:Georgia,serif;font-size:26px;font-weight:bold;color:#fff;">${slide.title}</div>
        <div style="font-size:14px;color:rgba(255,255,255,0.65);font-style:italic;">${slide.subtitle}</div>
      </div>
      <div style="flex:1;overflow:hidden;max-height:620px;padding:24px 30px;font-size:14px;color:#1B2A4A;line-height:1.55;">
        ${bodyHtml}
      </div>
      <div style="background:#f0f0f0;padding:8px 30px;display:flex;justify-content:space-between;font-size:11px;color:#666;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
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
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
  body { font-family: system-ui, -apple-system, sans-serif; background: #e0e0e0; }
  .slide {
    width: ${slideWidth}px;
    height: ${slideHeight}px;
    background: #fff;
    margin: 20px auto;
    box-shadow: 0 2px 12px rgba(0,0,0,0.15);
    overflow: hidden;
  }
  .title-slide {
    background: #1B6B6B !important;
    color: #fff !important;
  }
  strong { font-weight: 700; }
  @media print {
    @page { size: landscape; margin: 0; }
    body { margin: 0; background: #fff; }
    .slide { margin: 0; box-shadow: none; page-break-after: always; }
    .slide:last-child { page-break-after: auto; }
    .no-print { display: none !important; }
  }
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
