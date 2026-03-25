// CE Shop Nevada Exam Prep Study Sheets — 8 modules, ~40 exam questions, 3 activities
import type { Module, ExamQuestion, Activity } from "@/types/course";

export function getCEShopModules(): Module[] {
  return [
    {
      id: "ce-mod-agency",
      weekNumber: 2,
      title: "Agency Relationships (CE Shop)",
      order: 10,
      keyTerms: [
        { id: "ce-kt-a1", term: "Consent to Act", definition: "Form 525 (Duties Owed by a Nevada Real Estate Licensee) must be presented to every prospective client/customer at the first meaningful contact, before any confidential information is disclosed.", source: "CE Shop" },
        { id: "ce-kt-a2", term: "Brokerage Agreement Disclosure", definition: "Form 524 confirms the brokerage relationship after the client decides to enter a formal agreement. It discloses the nature of the agency relationship and must be signed before or at the time of signing a brokerage agreement.", source: "CE Shop" },
        { id: "ce-kt-a3", term: "Assigned Agency", definition: "A broker may assign different licensees within the same brokerage to represent the buyer and seller separately in the same transaction. Each assigned agent owes full fiduciary duties to their respective client.", source: "CE Shop" },
        { id: "ce-kt-a4", term: "Dual Agency", definition: "When one licensee represents both the buyer and seller in the same transaction. Requires informed written consent from both parties. The licensee becomes a neutral facilitator and cannot advocate for either party.", source: "CE Shop" },
        { id: "ce-kt-a5", term: "Confidentiality Duration", definition: "A licensee's duty of confidentiality survives the termination of the agency relationship and continues for 1 year after termination.", source: "CE Shop" },
      ],
      conceptExplanation: "Nevada operates under a statutory agency framework defined in NRS 645.252–645.254. Agency relationships are created by law, not common law. The key forms are Form 525 (Duties Owed — presented at first contact) and Form 524 (Brokerage Agreement Disclosure — signed when entering a brokerage agreement). Licensees owe duties of loyalty, obedience, disclosure, confidentiality, reasonable care, and accounting to clients. Customers receive honesty, reasonable care, and disclosure of known material defects. Dual agency requires written consent and converts the agent to a neutral facilitator. Assigned agency allows the broker to assign separate licensees to each party, preserving full fiduciary duties. Confidentiality survives the relationship for 1 year.",
      nevadaLegalRefs: "NRS 645.252 (Duties owed to client); NRS 645.253 (Duties owed to all parties); NRS 645.254 (Disclosure of agency); NRS 645.252(1)(f) (Confidentiality—1 year); NAC 645.637 (Form 525); NAC 645.640 (Form 524)",
      realWorldScenario: "A licensee meets a prospective buyer at an open house. Before discussing the buyer's budget or motivation, the licensee presents Form 525 explaining the duties owed. The buyer decides to work with the licensee and signs Form 524 establishing a buyer-broker agreement. Later, the buyer wants to purchase a property listed by another agent in the same brokerage. The broker assigns different licensees to each party (assigned agency) so both receive full representation.",
      commonMistakes: "1. Confusing Form 524 and Form 525 — 525 comes FIRST (duties owed), 524 comes when entering brokerage agreement\n2. Believing dual agency allows advocacy — dual agents are neutral facilitators\n3. Forgetting confidentiality lasts 1 year after termination\n4. Not presenting Form 525 at first meaningful contact\n5. Confusing assigned agency with dual agency — assigned agency preserves full fiduciary duties",
      examKeyPoints: "• Form 525: Duties Owed — presented at FIRST meaningful contact\n• Form 524: Brokerage Agreement Disclosure — at time of brokerage agreement\n• Confidentiality survives 1 year after relationship ends\n• Dual agency = neutral facilitator, requires written consent from both parties\n• Assigned agency = separate licensees, full fiduciary duties preserved\n• Duties to clients: loyalty, obedience, disclosure, confidentiality, reasonable care, accounting\n• Duties to all parties: honesty, reasonable care, disclose known material defects",
      examAlerts: [
        { id: "ce-ea-a1", text: "Form 525 comes BEFORE Form 524. 525 = Duties Owed (first contact), 524 = Brokerage Agreement Disclosure.", type: "exam-trap" },
        { id: "ce-ea-a2", text: "Confidentiality duty survives for exactly 1 YEAR after the agency relationship terminates.", type: "high-probability" },
        { id: "ce-ea-a3", text: "Assigned agency preserves FULL fiduciary duties; dual agency does NOT.", type: "exam-alert" },
      ],
      knowledgeChecks: [
        { id: "ce-kc-a1", question: "Which form must be presented at the first meaningful contact with a prospective client?", options: ["Form 524", "Form 525", "Form 530", "Form 547"], correctIndex: 1, explanation: "Form 525 (Duties Owed by a Nevada Real Estate Licensee) must be presented at first meaningful contact, before any confidential information is shared." },
        { id: "ce-kc-a2", question: "How long does the duty of confidentiality last after the agency relationship ends?", options: ["6 months", "1 year", "2 years", "Indefinitely"], correctIndex: 1, explanation: "Under NRS 645.252(1)(f), the duty of confidentiality continues for 1 year after termination of the agency relationship." },
      ],
      discussionPrompt: "In what situations might assigned agency be preferable to dual agency from the consumer's perspective? What are the practical implications for agents within the same brokerage?",
      assignmentSuggestion: "Create a flowchart showing the sequence of forms and disclosures required from first contact through closing in a Nevada real estate transaction.",
      estimatedTime: "75 minutes",
      sourceTag: "CE Shop",
      correctsTextbook: false,
      federalVsNevada: "nevada",
    },
    {
      id: "ce-mod-contracts",
      weekNumber: 5,
      title: "Contracts & Agreements (CE Shop)",
      order: 10,
      keyTerms: [
        { id: "ce-kt-c1", term: "Exclusive Right-to-Sell", definition: "A listing agreement where the broker earns a commission regardless of who sells the property — even if the seller finds the buyer independently. Most protective for the broker.", source: "CE Shop" },
        { id: "ce-kt-c2", term: "Exclusive Agency", definition: "A listing agreement where the broker earns a commission unless the seller finds a buyer independently without the broker's assistance. The seller retains the right to sell without paying commission.", source: "CE Shop" },
        { id: "ce-kt-c3", term: "Net Listing", definition: "A listing where the seller sets a minimum net amount and the broker keeps anything above that as commission. Legal in Nevada but discouraged due to conflict of interest.", source: "CE Shop" },
        { id: "ce-kt-c4", term: "Earnest Money Deposit", definition: "Good-faith deposit from the buyer. Must be deposited into the broker's trust account by the next business day after acceptance of the offer, unless otherwise agreed in writing.", source: "CE Shop" },
        { id: "ce-kt-c5", term: "Advance Fees", definition: "Fees collected before services are rendered. Must be deposited in a trust account and may only be withdrawn as earned. Broker must provide an accounting.", source: "CE Shop" },
      ],
      conceptExplanation: "Nevada real estate contracts are governed by NRS 645 and general contract law. Brokerage agreements must be in writing and include specific terms: property description, commission/compensation, expiration date, duties, and signatures. The three main listing types are exclusive right-to-sell (broker always paid), exclusive agency (broker paid unless owner sells independently), and open listing (non-exclusive). Net listings are legal but discouraged. Earnest money must be deposited by the next business day after offer acceptance. Closing statements must accurately reflect all financial aspects of the transaction. Advance fees require trust account deposit and accounting.",
      nevadaLegalRefs: "NRS 645.320 (Written agreements required); NRS 645.630 (Trust accounts); NRS 645.635 (Earnest money deposit timing); NAC 645.610 (Listing agreement requirements); NAC 645.627 (Advance fees)",
      realWorldScenario: "A seller signs an exclusive right-to-sell listing agreement with Broker A for 6 months. During the listing period, the seller's neighbor expresses interest in buying. Even though the seller found the buyer without Broker A's help, Broker A is entitled to the commission because of the exclusive right-to-sell agreement. If the seller had signed an exclusive agency agreement instead, the seller could sell to the neighbor without paying Broker A's commission.",
      commonMistakes: "1. Confusing exclusive right-to-sell with exclusive agency — the key difference is owner's right to sell independently\n2. Not depositing earnest money by next business day after acceptance\n3. Forgetting that net listings, while legal, are discouraged\n4. Not providing accounting for advance fees\n5. Missing required elements in brokerage agreements (expiration date, property description)",
      examKeyPoints: "• Exclusive right-to-sell: broker paid NO MATTER WHO sells\n• Exclusive agency: broker paid UNLESS owner sells independently\n• Net listings: LEGAL in Nevada but discouraged\n• Earnest money: deposit by NEXT BUSINESS DAY after acceptance\n• Advance fees: must go to trust account, accounting required\n• Listing agreements must include: property description, compensation, expiration date, duties, signatures\n• Closing statements must accurately reflect all financial aspects",
      examAlerts: [
        { id: "ce-ea-c1", text: "Net listings are LEGAL in Nevada (unlike some states) but are DISCOURAGED.", type: "exam-trap" },
        { id: "ce-ea-c2", text: "Earnest money must be deposited by the NEXT BUSINESS DAY after offer acceptance.", type: "high-probability" },
        { id: "ce-ea-c3", text: "Know the difference: Exclusive right-to-sell (broker always paid) vs Exclusive agency (not paid if owner sells).", type: "exam-alert" },
      ],
      knowledgeChecks: [
        { id: "ce-kc-c1", question: "Under which listing type can the seller sell independently without paying the broker?", options: ["Exclusive right-to-sell", "Exclusive agency", "Net listing", "None of the above"], correctIndex: 1, explanation: "Under an exclusive agency listing, the broker earns a commission unless the seller finds a buyer independently without the broker's help." },
        { id: "ce-kc-c2", question: "When must earnest money be deposited into the broker's trust account?", options: ["Within 3 business days", "By the next business day after acceptance", "Within 5 calendar days", "At closing"], correctIndex: 1, explanation: "Earnest money must be deposited into the broker's trust account by the next business day after acceptance of the offer." },
      ],
      discussionPrompt: "Why are net listings discouraged even though they are legal in Nevada? What potential conflicts of interest arise?",
      assignmentSuggestion: "Draft a comparison chart of all listing agreement types, noting who pays commission under various selling scenarios.",
      estimatedTime: "75 minutes",
      sourceTag: "CE Shop",
      correctsTextbook: false,
      federalVsNevada: "nevada",
    },
    {
      id: "ce-mod-disclosures",
      weekNumber: 3,
      title: "Disclosure Requirements (CE Shop)",
      order: 11,
      keyTerms: [
        { id: "ce-kt-d1", term: "Residential Disclosure Guide", definition: "Must be provided to the buyer within 10 days of the date of the purchase agreement. Contains information about common issues, inspections, and buyer rights.", source: "CE Shop" },
        { id: "ce-kt-d2", term: "Seller's Real Property Disclosure", definition: "The seller's written disclosure of known property conditions. Must be delivered to the buyer, who then has a right to rescind based on disclosed defects.", source: "CE Shop" },
        { id: "ce-kt-d3", term: "CIC Resale Package", definition: "Common-Interest Community resale package containing HOA documents, financials, rules, and assessments. Must be provided to the buyer, who has 5 days to rescind after receipt.", source: "CE Shop" },
        { id: "ce-kt-d4", term: "Treble Damages", definition: "If a seller willfully fails to provide required disclosures, the buyer may be entitled to treble (3x) damages for any harm suffered.", source: "CE Shop" },
        { id: "ce-kt-d5", term: "Licensee as Principal", definition: "When a licensee buys or sells property for their own account, they must disclose their license status in writing to all parties before entering into any agreement.", source: "CE Shop" },
      ],
      conceptExplanation: "Nevada has extensive disclosure requirements designed to protect consumers. The Residential Disclosure Guide must be delivered within 10 days of the purchase agreement. The Seller's Real Property Disclosure Form details known material defects. For CIC properties, a resale package must be provided with a 5-day rescission period. If new defects are discovered after initial disclosure, the seller must update the disclosure and the buyer gets an additional 4-business-day rescission period. Willful failure to disclose can result in treble (3x) damages. When a licensee acts as a principal (buying/selling for themselves), they must disclose their license status in writing.",
      nevadaLegalRefs: "NRS 113.130 (Seller disclosure); NRS 113.150 (Treble damages); NRS 116.4109 (CIC resale package); NRS 645.252 (Licensee disclosure duties); NAC 645.605 (Licensee as principal)",
      realWorldScenario: "A seller completes the Seller's Real Property Disclosure indicating no plumbing issues. Two weeks later, a pipe bursts. The seller must update the disclosure form. The buyer, upon receiving the updated disclosure, has 4 business days to rescind the purchase agreement. If the seller knew about the plumbing issue and willfully failed to disclose it initially, the buyer could pursue treble damages.",
      commonMistakes: "1. Confusing the 10-day delivery rule (Residential Disclosure Guide) with other timelines\n2. Forgetting the 4-business-day rescission for NEW defects discovered after initial disclosure\n3. Not disclosing licensee status when buying/selling for own account\n4. Confusing CIC 5-day rescission with other rescission periods\n5. Not understanding treble damages for willful non-disclosure",
      examKeyPoints: "• Residential Disclosure Guide: delivered within 10 DAYS of purchase agreement\n• New defects discovered: 4 BUSINESS DAYS rescission period for buyer\n• CIC resale package: 5-day rescission period\n• Willful failure to disclose: TREBLE (3x) damages\n• Licensee as principal: must disclose license status IN WRITING\n• Seller's Real Property Disclosure: known material defects",
      examAlerts: [
        { id: "ce-ea-d1", text: "Residential Disclosure Guide = 10 DAYS. New defect rescission = 4 BUSINESS DAYS. CIC rescission = 5 DAYS. Don't mix them up.", type: "exam-trap" },
        { id: "ce-ea-d2", text: "Treble damages (3x) apply for WILLFUL failure to disclose — not mere negligence.", type: "high-probability" },
      ],
      knowledgeChecks: [
        { id: "ce-kc-d1", question: "Within how many days must the Residential Disclosure Guide be provided to the buyer?", options: ["5 days", "7 days", "10 days", "15 days"], correctIndex: 2, explanation: "The Residential Disclosure Guide must be provided within 10 days of the date of the purchase agreement." },
        { id: "ce-kc-d2", question: "What damages can a buyer seek if a seller willfully fails to provide required disclosures?", options: ["Actual damages only", "Double damages", "Treble (3x) damages", "Punitive damages"], correctIndex: 2, explanation: "Under NRS 113.150, a buyer may seek treble (three times) damages for a seller's willful failure to provide required disclosures." },
      ],
      discussionPrompt: "How do Nevada's disclosure timelines compare to other states? Why does Nevada impose treble damages for willful non-disclosure?",
      assignmentSuggestion: "Create a timeline chart mapping all disclosure deadlines and rescission periods in a typical Nevada residential transaction.",
      estimatedTime: "60 minutes",
      sourceTag: "CE Shop",
      correctsTextbook: false,
      federalVsNevada: "nevada",
    },
    {
      id: "ce-mod-commission",
      weekNumber: 1,
      title: "Duties & Powers of the Real Estate Commission (CE Shop)",
      order: 10,
      keyTerms: [
        { id: "ce-kt-cm1", term: "Nevada Real Estate Division (NRED)", definition: "The state agency within the Department of Business and Industry that administers and enforces real estate license law in Nevada.", source: "CE Shop" },
        { id: "ce-kt-cm2", term: "Real Estate Commission (REC)", definition: "A five-member body appointed by the Governor. Comprises 3 real estate professionals and 2 public members. Makes rules, holds hearings, and sets policy for the real estate industry.", source: "CE Shop" },
        { id: "ce-kt-cm3", term: "Recovery Fund", definition: "A fund maintained by NRED to compensate persons who suffer actual damages from licensee conduct. Maximum recovery: $25,000 per transaction, $100,000 per licensee.", source: "CE Shop" },
        { id: "ce-kt-cm4", term: "Administrative Fine Cap", definition: "The Commission may impose administrative fines of up to $10,000 per violation for breaches of NRS 645.", source: "CE Shop" },
      ],
      conceptExplanation: "The Nevada Real Estate Division (NRED) operates under the Department of Business and Industry and enforces NRS 645. The Real Estate Commission (REC) is a 5-member body (3 industry + 2 public) appointed by the Governor. The Commission has authority to adopt regulations (NAC 645), conduct investigations, hold hearings, impose sanctions (license suspension/revocation, fines up to $10,000), and administer the Recovery Fund. The Recovery Fund compensates consumers harmed by licensee misconduct, capped at $25,000 per transaction and $100,000 per licensee. Investigations can be initiated by complaint or by the Division itself. Hearings follow administrative procedure requirements.",
      nevadaLegalRefs: "NRS 645.050 (NRED creation); NRS 645.100 (REC composition); NRS 645.630–645.660 (Trust accounts/Recovery Fund); NRS 645.685 (Administrative fines); NRS 645.633 (Recovery Fund caps)",
      realWorldScenario: "A consumer files a complaint with NRED alleging that a licensee mishandled earnest money. NRED investigates and refers the matter to the REC for a hearing. The Commission finds the licensee violated trust account rules and imposes a $5,000 fine plus 6-month license suspension. The consumer also files a Recovery Fund claim and receives $18,000 in actual damages (below the $25,000 per-transaction cap).",
      commonMistakes: "1. Confusing NRED (the division/agency) with the REC (the commission/board)\n2. Forgetting the REC has 5 members (3 industry + 2 public)\n3. Mixing up Recovery Fund caps: $25,000/transaction and $100,000/licensee\n4. Not knowing the $10,000 maximum administrative fine\n5. Thinking only consumer complaints trigger investigations — NRED can self-initiate",
      examKeyPoints: "• NRED = Division (administers/enforces); REC = Commission (5 members, makes policy)\n• REC composition: 3 real estate professionals + 2 public members\n• Administrative fines: up to $10,000 per violation\n• Recovery Fund: $25,000 per transaction, $100,000 per licensee\n• Investigations: initiated by complaint OR by NRED\n• Sanctions: fines, suspension, revocation, education requirements",
      examAlerts: [
        { id: "ce-ea-cm1", text: "Recovery Fund caps: $25,000 per TRANSACTION, $100,000 per LICENSEE. These are favorite exam numbers.", type: "high-probability" },
        { id: "ce-ea-cm2", text: "REC = 5 members (3 industry + 2 public). Don't confuse with other state boards.", type: "exam-alert" },
        { id: "ce-ea-cm3", text: "Maximum administrative fine is $10,000 per violation — a commonly tested figure.", type: "exam-trap" },
      ],
      knowledgeChecks: [
        { id: "ce-kc-cm1", question: "How many members serve on the Nevada Real Estate Commission?", options: ["3", "5", "7", "9"], correctIndex: 1, explanation: "The REC consists of 5 members appointed by the Governor: 3 real estate professionals and 2 public members." },
        { id: "ce-kc-cm2", question: "What is the maximum Recovery Fund payout per transaction?", options: ["$10,000", "$25,000", "$50,000", "$100,000"], correctIndex: 1, explanation: "The Recovery Fund is capped at $25,000 per transaction and $100,000 per licensee." },
      ],
      discussionPrompt: "Why does the REC include public members? How does this structure balance industry self-regulation with consumer protection?",
      assignmentSuggestion: "Research a recent NRED disciplinary action and summarize the violation, investigation process, and sanctions imposed.",
      estimatedTime: "60 minutes",
      sourceTag: "CE Shop",
      correctsTextbook: false,
      federalVsNevada: "nevada",
    },
    {
      id: "ce-mod-practice",
      weekNumber: 1,
      title: "License Practice & Responsibilities (CE Shop)",
      order: 10,
      keyTerms: [
        { id: "ce-kt-p1", term: "Trust Account", definition: "A separate bank account where a broker deposits client funds (earnest money, security deposits, etc.). Must be maintained at a Nevada depository. Commingling is prohibited except for up to $150 of broker's own funds to cover bank charges.", source: "CE Shop" },
        { id: "ce-kt-p2", term: "Broker Supervision", definition: "The broker-salesperson relationship requires that all licensee activities be conducted under the supervision of the employing broker. The broker is responsible for the acts of their licensees.", source: "CE Shop" },
        { id: "ce-kt-p3", term: "BPO (Broker's Price Opinion)", definition: "A broker's estimate of property value, less formal than an appraisal. Nevada requires BPOs to include specific disclosures and follow prescribed standards. Cannot be called an 'appraisal.'", source: "CE Shop" },
        { id: "ce-kt-p4", term: "Commingling Exception", definition: "Brokers may keep up to $150 of their own funds in a trust account to cover bank service charges. Any amount beyond this constitutes illegal commingling.", source: "CE Shop" },
        { id: "ce-kt-p5", term: "Advertising Requirements", definition: "All advertising must include the licensed name of the brokerage. Licensees cannot advertise solely in their own name. Blind ads (without brokerage identification) are prohibited.", source: "CE Shop" },
      ],
      conceptExplanation: "Licensed practice in Nevada requires adherence to trust fund rules, advertising standards, and broker supervision requirements. Trust accounts must be at Nevada depositories, balanced monthly, and cannot contain broker funds beyond the $150 commingling exception. All licensee activities require broker supervision — the broker is vicariously liable. Advertising must always identify the brokerage; blind ads are prohibited. Activities requiring a license include negotiating sales/leases, listing property, collecting rent, and performing BPOs. BPOs must follow specific standards and cannot be labeled as appraisals.",
      nevadaLegalRefs: "NRS 645.310 (Activities requiring license); NRS 645.630 (Trust accounts); NRS 645.635 (Commingling); NRS 645.315 (Broker supervision); NAC 645.605 (Advertising); NRS 645.2526 (BPOs)",
      realWorldScenario: "A salesperson creates a social media ad featuring a property listing. The ad includes the salesperson's name and phone number but omits the brokerage name. This is a violation — all advertising must include the licensed brokerage name. The broker receives a complaint and could face disciplinary action for failure to supervise.",
      commonMistakes: "1. Exceeding the $150 commingling exception — even $151 is a violation\n2. Running ads without the brokerage name (blind ads)\n3. Calling a BPO an 'appraisal'\n4. Thinking salespersons can operate independently without broker supervision\n5. Not balancing trust accounts monthly",
      examKeyPoints: "• Trust account: Nevada depository, balanced MONTHLY\n• Commingling exception: $150 maximum of broker's own funds\n• All advertising must include BROKERAGE NAME — no blind ads\n• Broker is responsible for licensee acts (vicarious liability)\n• BPO ≠ appraisal — never call it an appraisal\n• Activities requiring a license: negotiate sales/leases, list property, collect rent, BPOs",
      examAlerts: [
        { id: "ce-ea-p1", text: "$150 commingling exception — this exact dollar amount is a favorite exam question.", type: "high-probability" },
        { id: "ce-ea-p2", text: "ALL advertising must include the brokerage name. Blind ads = violation.", type: "exam-alert" },
        { id: "ce-ea-p3", text: "Trust accounts must be balanced MONTHLY — not quarterly, not annually.", type: "exam-trap" },
      ],
      knowledgeChecks: [
        { id: "ce-kc-p1", question: "How much of a broker's own funds may be kept in a trust account?", options: ["$0", "$100", "$150", "$500"], correctIndex: 2, explanation: "A broker may keep up to $150 of their own funds in the trust account to cover bank service charges. This is the only commingling exception." },
        { id: "ce-kc-p2", question: "What must all real estate advertising include?", options: ["The salesperson's license number", "The brokerage name", "The MLS number", "The listing price"], correctIndex: 1, explanation: "All advertising must include the licensed name of the brokerage. Blind ads (without brokerage identification) are prohibited." },
      ],
      discussionPrompt: "Why does Nevada allow a $150 commingling exception? What practical problems does this solve for brokers?",
      assignmentSuggestion: "Audit three sample real estate ads and identify any compliance issues with Nevada advertising requirements.",
      estimatedTime: "75 minutes",
      sourceTag: "CE Shop",
      correctsTextbook: false,
      federalVsNevada: "nevada",
    },
    {
      id: "ce-mod-licensing",
      weekNumber: 1,
      title: "Licensing Requirements (CE Shop)",
      order: 11,
      keyTerms: [
        { id: "ce-kt-l1", term: "Salesperson Education", definition: "Nevada requires 120 hours of pre-licensing education for a salesperson license: 90 hours of approved courses plus 30 hours of additional education.", source: "CE Shop" },
        { id: "ce-kt-l2", term: "Broker Education", definition: "Nevada requires 64 semester hours of college credit plus 2 years of full-time experience as a salesperson (or equivalent) to qualify for a broker license.", source: "CE Shop" },
        { id: "ce-kt-l3", term: "Continuing Education", definition: "Licensees must complete 36 hours of CE every renewal period (4 years for salespersons, 4 years for brokers). Includes mandatory topics: ethics, agency, contracts, Nevada law updates.", source: "CE Shop" },
        { id: "ce-kt-l4", term: "Exam Validity", definition: "A passing exam score is valid for 12 months. If the candidate does not obtain a license within 12 months of passing, they must retake the exam.", source: "CE Shop" },
        { id: "ce-kt-l5", term: "License Reciprocity", definition: "Nevada offers reciprocity agreements with certain states, allowing licensees to obtain a Nevada license with a waiver of some education/exam requirements, though the state portion is typically still required.", source: "CE Shop" },
      ],
      conceptExplanation: "Nevada licensing is governed by NRS 645. Salesperson candidates need 120 hours of pre-licensing education (90 + 30), must pass the state exam, and apply within 12 months of passing. Broker candidates need 64 college semester hours plus 2 years of salesperson experience. All licensees must complete 36 hours of continuing education per renewal period, including mandatory topics. License status changes include active, inactive, and cancelled. Inactive licensees cannot practice but maintain their license. Reciprocity agreements exist with some states but typically require the Nevada state exam portion.",
      nevadaLegalRefs: "NRS 645.343 (Salesperson qualifications); NRS 645.330 (Broker qualifications); NRS 645.575 (CE requirements); NRS 645.380 (Exam validity—12 months); NAC 645.448 (Reciprocity)",
      realWorldScenario: "A candidate completes 120 hours of pre-licensing education and passes the Nevada exam in January. They get busy and don't apply for their license until the following February — 13 months later. Their passing score has expired (12-month validity), and they must retake the exam before applying.",
      commonMistakes: "1. Confusing 120 hours (salesperson education) with broker requirements\n2. Forgetting the 12-month exam validity window\n3. Thinking 36 hours CE is annual — it's per renewal period\n4. Assuming reciprocity waives the state exam — it typically doesn't\n5. Not knowing the difference between inactive and cancelled status",
      examKeyPoints: "• Salesperson: 120 hours pre-licensing education\n• Broker: 64 semester hours college + 2 years experience\n• CE: 36 hours per renewal period\n• Exam validity: 12 MONTHS from passing\n• Reciprocity: typically still requires Nevada state exam\n• License statuses: active, inactive, cancelled",
      examAlerts: [
        { id: "ce-ea-l1", text: "120 hours for salesperson. 36 hours CE per renewal. 12-month exam validity. Memorize these numbers.", type: "high-probability" },
        { id: "ce-ea-l2", text: "Exam score expires after 12 MONTHS — not 6 months, not 2 years.", type: "exam-trap" },
      ],
      knowledgeChecks: [
        { id: "ce-kc-l1", question: "How many hours of pre-licensing education does Nevada require for a salesperson?", options: ["60 hours", "90 hours", "120 hours", "150 hours"], correctIndex: 2, explanation: "Nevada requires 120 hours of pre-licensing education for a salesperson license." },
        { id: "ce-kc-l2", question: "How long is a passing exam score valid?", options: ["6 months", "12 months", "18 months", "24 months"], correctIndex: 1, explanation: "A passing exam score is valid for 12 months. If a license is not obtained within that period, the exam must be retaken." },
      ],
      discussionPrompt: "What is the rationale behind requiring 36 hours of continuing education? How does this protect consumers?",
      assignmentSuggestion: "Create a licensing timeline from education through first renewal, including all deadlines and hour requirements.",
      estimatedTime: "60 minutes",
      sourceTag: "CE Shop",
      correctsTextbook: false,
      federalVsNevada: "nevada",
    },
    {
      id: "ce-mod-records",
      weekNumber: 6,
      title: "Record Keeping Requirements (CE Shop)",
      order: 10,
      keyTerms: [
        { id: "ce-kt-r1", term: "5-Year Retention", definition: "Brokers must retain all transaction records for a minimum of 5 years from the date of closing or the date the listing expires/is terminated (whichever is later).", source: "CE Shop" },
        { id: "ce-kt-r2", term: "Trust Account Records", definition: "Detailed records of all trust account transactions including deposits, disbursements, and reconciliations. Must be balanced monthly and available for NRED audit.", source: "CE Shop" },
        { id: "ce-kt-r3", term: "Monthly Trust Account Balancing", definition: "Brokers must reconcile their trust account records with bank statements on a monthly basis. Discrepancies must be resolved promptly.", source: "CE Shop" },
        { id: "ce-kt-r4", term: "Confidential Information", definition: "Records containing confidential client information must be protected and stored securely. Access should be limited to authorized personnel.", source: "CE Shop" },
      ],
      conceptExplanation: "Nevada requires brokers to maintain comprehensive records of all real estate transactions. The primary retention period is 5 years from closing or listing expiration/termination. Records include contracts, correspondence, closing statements, trust account ledgers, and advertising copies. Trust accounts require monthly balancing with bank statement reconciliation. NRED may audit records at any time. Confidential client information must be secured with limited access. Failure to maintain proper records is grounds for disciplinary action including fines and license suspension.",
      nevadaLegalRefs: "NRS 645.630 (Record keeping requirements); NRS 645.633 (Trust account records); NAC 645.637 (5-year retention); NAC 645.640 (Monthly reconciliation)",
      realWorldScenario: "NRED conducts a random audit of a brokerage and requests trust account records from a transaction that closed 4 years ago. The broker produces the records, which show monthly reconciliations. However, the broker discarded records from a transaction that closed 6 years ago. Since this is beyond the 5-year requirement, no violation occurred for the destroyed records.",
      commonMistakes: "1. Thinking retention is 3 years or 7 years — it's 5 years\n2. Balancing trust accounts quarterly instead of monthly\n3. Not retaining copies of advertising materials\n4. Failing to secure confidential client information\n5. Not knowing that NRED can audit at any time (no notice required for trust accounts)",
      examKeyPoints: "• Record retention: 5 YEARS minimum\n• Trust accounts: balanced MONTHLY\n• NRED: can audit at any time\n• Records include: contracts, closing statements, trust ledgers, advertising, correspondence\n• Confidential info: must be secured with limited access\n• Failure to maintain records: grounds for disciplinary action",
      examAlerts: [
        { id: "ce-ea-r1", text: "5-year record retention — the #1 tested number for record keeping.", type: "high-probability" },
        { id: "ce-ea-r2", text: "Trust accounts must be balanced MONTHLY, not quarterly or annually.", type: "exam-trap" },
      ],
      knowledgeChecks: [
        { id: "ce-kc-r1", question: "How long must a broker retain transaction records?", options: ["3 years", "5 years", "7 years", "10 years"], correctIndex: 1, explanation: "Brokers must retain all transaction records for a minimum of 5 years from closing or listing expiration/termination." },
        { id: "ce-kc-r2", question: "How often must a broker's trust account be balanced?", options: ["Weekly", "Monthly", "Quarterly", "Annually"], correctIndex: 1, explanation: "Trust accounts must be reconciled with bank statements on a monthly basis." },
      ],
      discussionPrompt: "What technological solutions can brokers use to ensure compliance with the 5-year record retention requirement? How has digital storage changed record keeping practices?",
      assignmentSuggestion: "Create a record keeping compliance checklist for a new brokerage, including all required documents and retention schedules.",
      estimatedTime: "45 minutes",
      sourceTag: "CE Shop",
      correctsTextbook: false,
      federalVsNevada: "nevada",
    },
    {
      id: "ce-mod-special",
      weekNumber: 6,
      title: "Special Topics in Nevada Real Estate (CE Shop)",
      order: 10,
      keyTerms: [
        { id: "ce-kt-s1", term: "Subdivision (35+ Lots)", definition: "In Nevada, a subdivision of 35 or more lots requires registration with NRED and a public offering statement. Developers must provide buyers with the statement before signing a purchase agreement.", source: "CE Shop" },
        { id: "ce-kt-s2", term: "Timeshare Rescission", definition: "Purchasers of timeshare interests in Nevada have a 5-calendar-day right of rescission from the date of signing the purchase agreement. The rescission right cannot be waived.", source: "CE Shop" },
        { id: "ce-kt-s3", term: "Prior Appropriation", definition: "Nevada follows the prior appropriation doctrine for water rights ('first in time, first in right'). Water rights are separate from land ownership and must be put to beneficial use or they may be forfeited.", source: "CE Shop" },
        { id: "ce-kt-s4", term: "Solar Energy Rights", definition: "Nevada law protects access to solar energy. HOAs generally cannot prohibit solar installations, and easements for solar access may be established.", source: "CE Shop" },
        { id: "ce-kt-s5", term: "Environmental Hazards", definition: "Licensees must disclose known environmental hazards including lead-based paint (pre-1978), asbestos, radon, mold, and underground storage tanks. Federal and state laws apply.", source: "CE Shop" },
      ],
      conceptExplanation: "Nevada special topics cover areas unique to the state or requiring specific exam knowledge. Subdivisions of 35+ lots require NRED registration and a public offering statement. Timeshare purchases come with a 5-day rescission right that cannot be waived. Nevada's water rights follow prior appropriation ('first in time, first in right') — water rights are separate from land and require beneficial use. Solar energy access is protected by statute, limiting HOA restrictions on solar installations. Environmental issues include federal requirements (lead paint disclosure for pre-1978 homes, CERCLA) and state-specific concerns related to Nevada's desert environment.",
      nevadaLegalRefs: "NRS 119 (Subdivisions); NRS 119A (Timeshares—5-day rescission); NRS 533 (Water rights—prior appropriation); NRS 278.0208 (Solar access); NRS 40.770 (Environmental disclosures); 42 USC 4852d (Federal lead paint disclosure)",
      realWorldScenario: "A developer plans to build a 40-lot residential community outside Las Vegas. Since it exceeds 35 lots, they must register with NRED and prepare a public offering statement. A buyer purchases a lot and receives the offering statement. Separately, the buyer discovers the property has water rights attached from a prior owner who diverted water for agricultural use. Since Nevada follows prior appropriation, these rights are valuable and separate from the land itself — they could be transferred or sold independently.",
      commonMistakes: "1. Thinking the subdivision threshold is 25 or 50 lots — it's 35\n2. Confusing timeshare 5-day rescission with other rescission periods\n3. Assuming water rights automatically transfer with land — they are separate\n4. Not knowing that HOAs generally cannot prohibit solar installations\n5. Forgetting lead-based paint disclosure applies to pre-1978 homes only",
      examKeyPoints: "• Subdivision: 35+ lots requires NRED registration + public offering statement\n• Timeshare: 5 CALENDAR DAY rescission, CANNOT be waived\n• Water rights: prior appropriation ('first in time, first in right'), separate from land\n• Solar: HOAs generally cannot prohibit installations\n• Lead paint: pre-1978 homes only\n• Environmental: CERCLA, asbestos, radon, mold, underground storage tanks",
      examAlerts: [
        { id: "ce-ea-s1", text: "Subdivision threshold: 35 lots. Timeshare rescission: 5 days. Both are favorite exam numbers.", type: "high-probability" },
        { id: "ce-ea-s2", text: "Water rights are SEPARATE from land ownership in Nevada — prior appropriation doctrine.", type: "exam-alert" },
        { id: "ce-ea-s3", text: "Timeshare rescission CANNOT be waived — even if the buyer agrees to waive it.", type: "exam-trap" },
      ],
      knowledgeChecks: [
        { id: "ce-kc-s1", question: "At what threshold does a Nevada subdivision require NRED registration?", options: ["10 lots", "25 lots", "35 lots", "50 lots"], correctIndex: 2, explanation: "A subdivision of 35 or more lots requires registration with NRED and a public offering statement." },
        { id: "ce-kc-s2", question: "How many days does a timeshare purchaser have to rescind in Nevada?", options: ["3 days", "5 days", "7 days", "10 days"], correctIndex: 1, explanation: "Timeshare purchasers have a 5-calendar-day right of rescission from signing, which cannot be waived." },
      ],
      discussionPrompt: "How does Nevada's prior appropriation water rights system affect real estate transactions in rural vs. urban areas? Why are water rights becoming increasingly valuable?",
      assignmentSuggestion: "Research a recent Nevada subdivision development and identify all regulatory requirements that must be met before lots can be sold.",
      estimatedTime: "60 minutes",
      sourceTag: "CE Shop",
      correctsTextbook: false,
      federalVsNevada: "nevada",
    },
  ];
}

export function getCEShopExamQuestions(): ExamQuestion[] {
  return [
    // Agency (5 questions)
    { id: "ce-eq-a1", topic: "Agency", question: "Which form must a licensee present at the FIRST meaningful contact with a prospective client?", options: ["Form 524", "Form 525", "Form 530", "Form 547"], correctIndex: 1, explanation: "Form 525 (Duties Owed by a Nevada Real Estate Licensee) must be presented at first meaningful contact, before any confidential information is disclosed.", wrongExplanations: ["Form 524 is the Brokerage Agreement Disclosure, presented when entering a brokerage agreement — not at first contact.", "Form 530 does not exist in Nevada real estate licensing requirements.", "Form 547 does not exist in Nevada real estate licensing requirements."], difficulty: "basic", examTrap: true, examTrapNote: "525 before 524. Many candidates reverse these.", tags: ["agency", "forms", "disclosure"], source: "CE Shop" },
    { id: "ce-eq-a2", topic: "Agency", question: "How long does the duty of confidentiality last after an agency relationship ends in Nevada?", options: ["6 months", "1 year", "2 years", "Indefinitely"], correctIndex: 1, explanation: "Under NRS 645.252(1)(f), the duty of confidentiality survives for 1 year after the termination of the agency relationship.", wrongExplanations: ["Six months is too short — the statute specifies 1 year.", "Two years exceeds the statutory period of 1 year.", "Nevada law specifies a definite period of 1 year, not an indefinite obligation."], difficulty: "intermediate", examTrap: false, tags: ["agency", "confidentiality", "duties"], source: "CE Shop" },
    { id: "ce-eq-a3", topic: "Agency", question: "In assigned agency, what duties does each assigned agent owe to their respective client?", options: ["Limited duties only", "Full fiduciary duties", "Duties of a neutral facilitator", "Only honesty and disclosure"], correctIndex: 1, explanation: "In assigned agency, the broker assigns separate licensees to each party, and each assigned agent owes full fiduciary duties to their respective client.", wrongExplanations: ["Assigned agency preserves full fiduciary duties, not limited duties.", "A neutral facilitator role applies to dual agency, not assigned agency.", "Full fiduciary duties apply, not just honesty and disclosure."], difficulty: "intermediate", examTrap: true, examTrapNote: "Don't confuse with dual agency where the agent becomes a neutral facilitator.", tags: ["agency", "assigned-agency", "fiduciary"], source: "CE Shop" },
    { id: "ce-eq-a4", topic: "Agency", question: "What happens when a single licensee represents both buyer and seller in the same transaction?", options: ["Assigned agency is created", "Dual agency requires written consent from both parties", "The transaction is prohibited", "Only verbal consent is needed"], correctIndex: 1, explanation: "Dual agency occurs when one licensee represents both parties. It requires informed written consent from both parties, and the licensee becomes a neutral facilitator.", wrongExplanations: ["Assigned agency uses separate licensees — dual agency uses one licensee for both parties.", "Dual agency is permitted in Nevada with proper written consent.", "Written consent is required, not verbal consent."], difficulty: "basic", examTrap: false, tags: ["agency", "dual-agency", "consent"], source: "CE Shop" },
    { id: "ce-eq-a5", topic: "Agency", question: "Form 524 is presented at which point in the transaction?", options: ["At first meaningful contact", "When entering a brokerage agreement", "At closing", "After the inspection period"], correctIndex: 1, explanation: "Form 524 (Brokerage Agreement Disclosure) is presented when the client enters into a brokerage agreement with the licensee.", wrongExplanations: ["First meaningful contact is when Form 525 is presented, not Form 524.", "Form 524 is presented before closing, at the time of the brokerage agreement.", "The inspection period is unrelated to agency disclosure forms."], difficulty: "basic", examTrap: true, examTrapNote: "Remember: 525 first (duties owed), then 524 (brokerage agreement).", tags: ["agency", "forms", "disclosure"], source: "CE Shop" },

    // Contracts (5 questions)
    { id: "ce-eq-c1", topic: "Contracts", question: "Under which listing type does the broker earn a commission regardless of who sells the property?", options: ["Open listing", "Exclusive agency", "Exclusive right-to-sell", "Net listing"], correctIndex: 2, explanation: "Under an exclusive right-to-sell listing, the broker earns a commission no matter who sells the property — even if the seller finds the buyer independently.", wrongExplanations: ["An open listing is non-exclusive and only pays the broker who actually produces the buyer.", "Under exclusive agency, the seller can sell independently without paying the broker.", "A net listing sets a minimum price for the seller; it doesn't guarantee commission regardless of who sells."], difficulty: "basic", examTrap: false, tags: ["contracts", "listings", "commission"], source: "CE Shop" },
    { id: "ce-eq-c2", topic: "Contracts", question: "Are net listings legal in Nevada?", options: ["No, they are prohibited", "Yes, but they are discouraged", "Yes, and they are the preferred type", "Only for commercial properties"], correctIndex: 1, explanation: "Net listings are legal in Nevada but discouraged due to the inherent conflict of interest — the broker benefits from a higher sale price.", wrongExplanations: ["Net listings are not prohibited in Nevada, unlike some other states.", "Net listings are discouraged, not preferred, due to conflict of interest.", "The legality applies to all property types, not just commercial."], difficulty: "intermediate", examTrap: true, examTrapNote: "Unlike some states, Nevada allows net listings — but they're discouraged.", tags: ["contracts", "net-listing", "legal"], source: "CE Shop" },
    { id: "ce-eq-c3", topic: "Contracts", question: "When must earnest money be deposited into the broker's trust account?", options: ["Within 3 business days of receipt", "By the next business day after acceptance", "Within 5 calendar days", "At closing"], correctIndex: 1, explanation: "Earnest money must be deposited into the broker's trust account by the next business day after acceptance of the offer.", wrongExplanations: ["Three business days is too long — the rule is next business day after acceptance.", "Five calendar days exceeds the required timeline.", "Earnest money must be deposited well before closing."], difficulty: "basic", examTrap: false, tags: ["contracts", "earnest-money", "trust-account"], source: "CE Shop" },
    { id: "ce-eq-c4", topic: "Contracts", question: "What must be collected and handled according to specific trust account rules before services are rendered?", options: ["Commission", "Advance fees", "Referral fees", "Closing costs"], correctIndex: 1, explanation: "Advance fees must be deposited in a trust account before services are rendered, and the broker must provide an accounting of how they are used.", wrongExplanations: ["Commissions are earned at closing, not collected in advance as trust funds.", "Referral fees are not subject to advance fee trust account rules.", "Closing costs are handled through the closing/escrow process."], difficulty: "intermediate", examTrap: false, tags: ["contracts", "advance-fees", "trust-account"], source: "CE Shop" },
    { id: "ce-eq-c5", topic: "Contracts", question: "Under an exclusive agency listing, when does the broker NOT earn a commission?", options: ["When another broker sells the property", "When the seller sells independently", "When the listing expires", "When the price is reduced"], correctIndex: 1, explanation: "Under exclusive agency, the broker earns a commission unless the seller finds a buyer independently without the broker's assistance.", wrongExplanations: ["If another broker sells the property, the listing broker typically still earns a commission or splits it.", "Listing expiration doesn't determine commission — it's about who procures the buyer during the listing period.", "Price reductions don't affect the commission obligation."], difficulty: "basic", examTrap: false, tags: ["contracts", "exclusive-agency", "commission"], source: "CE Shop" },

    // Disclosures (5 questions)
    { id: "ce-eq-d1", topic: "Disclosures", question: "Within how many days of the purchase agreement must the Residential Disclosure Guide be provided to the buyer?", options: ["5 days", "7 days", "10 days", "14 days"], correctIndex: 2, explanation: "The Residential Disclosure Guide must be provided to the buyer within 10 days of the date of the purchase agreement.", wrongExplanations: ["Five days is the CIC rescission period, not the disclosure guide timeline.", "Seven days is not the correct timeline for the Residential Disclosure Guide.", "Fourteen days exceeds the required 10-day delivery period."], difficulty: "basic", examTrap: true, examTrapNote: "Don't confuse with CIC 5-day rescission or 4-business-day new defect rescission.", tags: ["disclosures", "residential-guide", "timeline"], source: "CE Shop" },
    { id: "ce-eq-d2", topic: "Disclosures", question: "What damages can a buyer seek for a seller's WILLFUL failure to provide required disclosures?", options: ["Actual damages only", "Double damages", "Treble (3x) damages", "No damages — only rescission"], correctIndex: 2, explanation: "Under NRS 113.150, a buyer may seek treble (three times) damages for a seller's willful failure to provide required disclosures.", wrongExplanations: ["Actual damages alone understate the remedy available for willful non-disclosure.", "Double damages are not the correct multiplier — it's treble (3x).", "Damages are available in addition to potential rescission rights."], difficulty: "intermediate", examTrap: false, tags: ["disclosures", "treble-damages", "penalties"], source: "CE Shop" },
    { id: "ce-eq-d3", topic: "Disclosures", question: "If new defects are discovered after the initial seller disclosure, how many business days does the buyer have to rescind?", options: ["3 business days", "4 business days", "5 business days", "7 business days"], correctIndex: 1, explanation: "When new defects are discovered after initial disclosure, the seller must update the disclosure and the buyer receives a 4-business-day rescission period.", wrongExplanations: ["Three business days is not the correct period for new defect rescission.", "Five days is the timeshare rescission period (calendar days), not new defect rescission.", "Seven business days exceeds the statutory rescission period for new defects."], difficulty: "advanced", examTrap: true, examTrapNote: "4 BUSINESS days for new defects — different from the 5 CALENDAR day timeshare rescission.", tags: ["disclosures", "rescission", "defects"], source: "CE Shop" },
    { id: "ce-eq-d4", topic: "Disclosures", question: "How many days does a buyer have to rescind after receiving a CIC resale package?", options: ["3 days", "5 days", "7 days", "10 days"], correctIndex: 1, explanation: "After receiving the CIC (Common-Interest Community) resale package, the buyer has 5 days to rescind the purchase agreement.", wrongExplanations: ["Three days is too short for CIC rescission.", "Seven days exceeds the statutory CIC rescission period.", "Ten days is the Residential Disclosure Guide delivery timeline, not CIC rescission."], difficulty: "intermediate", examTrap: false, tags: ["disclosures", "CIC", "rescission"], source: "CE Shop" },
    { id: "ce-eq-d5", topic: "Disclosures", question: "When a licensee purchases property for their own account, what must they disclose?", options: ["Nothing — disclosure is voluntary", "Their license status in writing", "Only their commission amount", "Their license status verbally"], correctIndex: 1, explanation: "When a licensee acts as a principal (buying or selling for their own account), they must disclose their license status in writing to all parties before entering any agreement.", wrongExplanations: ["Disclosure is mandatory, not voluntary, when a licensee is a principal.", "License status must be disclosed, not just commission.", "Written disclosure is required — verbal is insufficient."], difficulty: "basic", examTrap: false, tags: ["disclosures", "licensee-principal", "ethics"], source: "CE Shop" },

    // Commission (5 questions)
    { id: "ce-eq-cm1", topic: "Commission Powers", question: "How many members serve on the Nevada Real Estate Commission?", options: ["3", "5", "7", "9"], correctIndex: 1, explanation: "The REC has 5 members appointed by the Governor: 3 real estate professionals and 2 public members.", wrongExplanations: ["Three is the number of industry members, not the total.", "Seven exceeds the actual commission size.", "Nine is much larger than the actual 5-member commission."], difficulty: "basic", examTrap: false, tags: ["commission", "REC", "structure"], source: "CE Shop" },
    { id: "ce-eq-cm2", topic: "Commission Powers", question: "What is the maximum administrative fine the Commission can impose per violation?", options: ["$5,000", "$10,000", "$25,000", "$50,000"], correctIndex: 1, explanation: "The Commission may impose administrative fines of up to $10,000 per violation of NRS 645.", wrongExplanations: ["$5,000 is below the actual maximum.", "$25,000 is the Recovery Fund cap per transaction, not the fine cap.", "$50,000 exceeds the statutory maximum fine."], difficulty: "intermediate", examTrap: true, examTrapNote: "Don't confuse: $10,000 = fine cap; $25,000 = Recovery Fund per transaction; $100,000 = Recovery Fund per licensee.", tags: ["commission", "fines", "sanctions"], source: "CE Shop" },
    { id: "ce-eq-cm3", topic: "Commission Powers", question: "What is the maximum Recovery Fund payout per LICENSEE?", options: ["$25,000", "$50,000", "$75,000", "$100,000"], correctIndex: 3, explanation: "The Recovery Fund is capped at $25,000 per transaction and $100,000 per licensee.", wrongExplanations: ["$25,000 is the per-transaction cap, not the per-licensee cap.", "$50,000 is not one of the Recovery Fund caps.", "$75,000 is not the correct cap — it's $100,000 per licensee."], difficulty: "intermediate", examTrap: true, examTrapNote: "Two caps to remember: $25,000/transaction and $100,000/licensee.", tags: ["commission", "recovery-fund", "caps"], source: "CE Shop" },
    { id: "ce-eq-cm4", topic: "Commission Powers", question: "The Real Estate Commission is composed of:", options: ["5 real estate professionals", "3 industry + 2 public members", "4 industry + 1 public member", "All public members"], correctIndex: 1, explanation: "The REC has 3 real estate professionals and 2 public members, totaling 5 members appointed by the Governor.", wrongExplanations: ["Not all 5 are real estate professionals — 2 are public members.", "The ratio is 3:2, not 4:1.", "The commission includes industry professionals, not all public members."], difficulty: "basic", examTrap: false, tags: ["commission", "REC", "composition"], source: "CE Shop" },
    { id: "ce-eq-cm5", topic: "Commission Powers", question: "Who can initiate an investigation of a licensee?", options: ["Only consumers via complaint", "Only NRED", "Both consumers and NRED", "Only the Attorney General"], correctIndex: 2, explanation: "Investigations can be initiated by consumer complaint OR by NRED on its own initiative.", wrongExplanations: ["Consumer complaints are one method, but NRED can also self-initiate.", "NRED can initiate, but consumers can also file complaints.", "The Attorney General is not the primary investigator — NRED handles real estate investigations."], difficulty: "intermediate", examTrap: false, tags: ["commission", "investigations", "enforcement"], source: "CE Shop" },

    // License Practice (5 questions)
    { id: "ce-eq-p1", topic: "License Practice", question: "How much of a broker's own funds may be kept in a trust account?", options: ["$0 — no commingling allowed", "$100", "$150", "$500"], correctIndex: 2, explanation: "Brokers may keep up to $150 of their own funds in the trust account to cover bank service charges. This is the sole commingling exception.", wrongExplanations: ["Zero is incorrect — a $150 exception exists for bank charges.", "$100 is below the actual $150 exception.", "$500 exceeds the statutory $150 limit."], difficulty: "basic", examTrap: true, examTrapNote: "The $150 exception is a favorite exam question — know this exact number.", tags: ["practice", "trust-account", "commingling"], source: "CE Shop" },
    { id: "ce-eq-p2", topic: "License Practice", question: "What must ALL real estate advertising include?", options: ["The salesperson's license number", "The licensed brokerage name", "The listing price", "The MLS number"], correctIndex: 1, explanation: "All advertising must include the licensed name of the brokerage. Blind ads (without brokerage identification) are prohibited.", wrongExplanations: ["The salesperson's license number is not required in advertising.", "The listing price is not a mandatory advertising element.", "The MLS number is not required in all advertising."], difficulty: "basic", examTrap: false, tags: ["practice", "advertising", "compliance"], source: "CE Shop" },
    { id: "ce-eq-p3", topic: "License Practice", question: "A BPO (Broker's Price Opinion) may NOT be called:", options: ["A market analysis", "A price estimate", "An appraisal", "A property evaluation"], correctIndex: 2, explanation: "A BPO may never be called an 'appraisal' — that term is reserved for licensed appraisers. BPOs follow different standards.", wrongExplanations: ["Market analysis is an acceptable term.", "Price estimate is acceptable terminology.", "Property evaluation is acceptable terminology."], difficulty: "intermediate", examTrap: true, examTrapNote: "BPO ≠ appraisal. Using the term 'appraisal' for a BPO is a violation.", tags: ["practice", "BPO", "appraisal"], source: "CE Shop" },
    { id: "ce-eq-p4", topic: "License Practice", question: "Who is responsible for the actions of licensees in a brokerage?", options: ["Each licensee individually", "The employing broker", "NRED", "The Real Estate Commission"], correctIndex: 1, explanation: "The employing broker is responsible for supervising and is vicariously liable for the acts of their licensees.", wrongExplanations: ["While licensees have personal liability, the broker has supervisory responsibility.", "NRED is the regulatory agency, not the supervisor of individual licensees.", "The REC sets policy but doesn't supervise individual brokerages."], difficulty: "basic", examTrap: false, tags: ["practice", "broker-supervision", "liability"], source: "CE Shop" },
    { id: "ce-eq-p5", topic: "License Practice", question: "How often must a broker's trust account be balanced?", options: ["Weekly", "Monthly", "Quarterly", "Annually"], correctIndex: 1, explanation: "Trust accounts must be reconciled with bank statements on a monthly basis.", wrongExplanations: ["Weekly balancing is not required by statute.", "Quarterly is too infrequent — monthly is required.", "Annual balancing is far too infrequent — monthly is required."], difficulty: "basic", examTrap: false, tags: ["practice", "trust-account", "reconciliation"], source: "CE Shop" },

    // Licensing Requirements (5 questions)
    { id: "ce-eq-l1", topic: "Licensing", question: "How many hours of pre-licensing education does Nevada require for a salesperson?", options: ["60 hours", "90 hours", "120 hours", "150 hours"], correctIndex: 2, explanation: "Nevada requires 120 hours of pre-licensing education for a salesperson license.", wrongExplanations: ["60 hours is significantly less than the requirement.", "90 hours is part of the 120-hour requirement but not the total.", "150 hours exceeds the actual requirement."], difficulty: "basic", examTrap: false, tags: ["licensing", "education", "salesperson"], source: "CE Shop" },
    { id: "ce-eq-l2", topic: "Licensing", question: "How many hours of continuing education are required per renewal period?", options: ["12 hours", "24 hours", "36 hours", "48 hours"], correctIndex: 2, explanation: "Licensees must complete 36 hours of continuing education per renewal period.", wrongExplanations: ["12 hours is far below the requirement.", "24 hours is below the 36-hour requirement.", "48 hours exceeds the actual requirement."], difficulty: "basic", examTrap: false, tags: ["licensing", "CE", "renewal"], source: "CE Shop" },
    { id: "ce-eq-l3", topic: "Licensing", question: "How long is a passing exam score valid for license application purposes?", options: ["6 months", "12 months", "18 months", "24 months"], correctIndex: 1, explanation: "A passing exam score is valid for 12 months. If a license is not obtained within that period, the exam must be retaken.", wrongExplanations: ["6 months is shorter than the actual validity period.", "18 months exceeds the 12-month validity window.", "24 months is double the actual validity period."], difficulty: "intermediate", examTrap: true, examTrapNote: "12 months — not 6, not 18, not 24.", tags: ["licensing", "exam", "validity"], source: "CE Shop" },
    { id: "ce-eq-l4", topic: "Licensing", question: "What is required for a broker license in addition to education?", options: ["1 year of salesperson experience", "2 years of salesperson experience", "5 years of salesperson experience", "No experience required"], correctIndex: 1, explanation: "Nevada requires 2 years of full-time experience as a salesperson (or equivalent) plus 64 semester hours of college credit for a broker license.", wrongExplanations: ["1 year is insufficient — 2 years is required.", "5 years exceeds the actual requirement.", "Experience is required — it's not waived."], difficulty: "intermediate", examTrap: false, tags: ["licensing", "broker", "experience"], source: "CE Shop" },
    { id: "ce-eq-l5", topic: "Licensing", question: "Under Nevada reciprocity agreements, what is typically still required?", options: ["Full pre-licensing education", "The Nevada state exam", "A new background check only", "Nothing — full waiver"], correctIndex: 1, explanation: "Reciprocity agreements typically still require the Nevada state exam portion, even when education requirements may be waived.", wrongExplanations: ["Full pre-licensing education may be partially or fully waived under reciprocity.", "More than just a background check is required — the state exam is needed.", "Full waivers are not typical — the state exam is usually required."], difficulty: "intermediate", examTrap: false, tags: ["licensing", "reciprocity", "exam"], source: "CE Shop" },

    // Record Keeping (5 questions)
    { id: "ce-eq-r1", topic: "Record Keeping", question: "How long must a broker retain transaction records?", options: ["3 years", "5 years", "7 years", "10 years"], correctIndex: 1, explanation: "Brokers must retain all transaction records for a minimum of 5 years from closing or listing expiration/termination.", wrongExplanations: ["3 years is too short — the requirement is 5 years.", "7 years exceeds the Nevada requirement (though some brokers choose longer).", "10 years far exceeds the statutory minimum."], difficulty: "basic", examTrap: false, tags: ["records", "retention", "compliance"], source: "CE Shop" },
    { id: "ce-eq-r2", topic: "Record Keeping", question: "How often must a broker reconcile trust account records with bank statements?", options: ["Weekly", "Monthly", "Quarterly", "Semi-annually"], correctIndex: 1, explanation: "Trust account records must be reconciled with bank statements on a monthly basis.", wrongExplanations: ["Weekly is more frequent than required.", "Quarterly is too infrequent — monthly is the standard.", "Semi-annually is far too infrequent."], difficulty: "basic", examTrap: false, tags: ["records", "trust-account", "reconciliation"], source: "CE Shop" },
    { id: "ce-eq-r3", topic: "Record Keeping", question: "Can NRED audit a broker's records without advance notice?", options: ["No — 30 days notice required", "No — 10 days notice required", "Yes — NRED can audit at any time", "Only with a court order"], correctIndex: 2, explanation: "NRED may audit broker records at any time. No advance notice is required, particularly for trust account records.", wrongExplanations: ["No advance notice is required for trust account audits.", "10 days notice is not required.", "A court order is not needed — NRED has regulatory authority."], difficulty: "intermediate", examTrap: false, tags: ["records", "NRED", "audit"], source: "CE Shop" },
    { id: "ce-eq-r4", topic: "Record Keeping", question: "Which of the following must be included in broker records?", options: ["Only purchase agreements", "Only closing statements", "All transaction documents including advertising", "Only trust account ledgers"], correctIndex: 2, explanation: "Broker records must include all transaction documents: contracts, correspondence, closing statements, trust account ledgers, and copies of advertising.", wrongExplanations: ["Records are not limited to purchase agreements.", "Closing statements alone are insufficient.", "Trust account ledgers are part of the requirement, but not the only records needed."], difficulty: "intermediate", examTrap: false, tags: ["records", "documentation", "compliance"], source: "CE Shop" },
    { id: "ce-eq-r5", topic: "Record Keeping", question: "What must a broker do with records containing confidential client information?", options: ["Share them with all office staff", "Secure them with limited access", "Destroy them after closing", "Post them publicly for transparency"], correctIndex: 1, explanation: "Records containing confidential client information must be protected and stored securely with access limited to authorized personnel.", wrongExplanations: ["Sharing with all staff violates confidentiality requirements.", "Records must be retained for 5 years, not destroyed at closing.", "Public posting would violate confidentiality obligations."], difficulty: "basic", examTrap: false, tags: ["records", "confidentiality", "security"], source: "CE Shop" },

    // Special Topics (5 questions)
    { id: "ce-eq-s1", topic: "Special Topics", question: "At what number of lots does a Nevada subdivision require NRED registration?", options: ["10 lots", "25 lots", "35 lots", "50 lots"], correctIndex: 2, explanation: "A subdivision of 35 or more lots requires registration with NRED and a public offering statement.", wrongExplanations: ["10 lots is well below the threshold.", "25 lots is below the 35-lot threshold.", "50 lots exceeds the actual threshold of 35."], difficulty: "basic", examTrap: true, examTrapNote: "35 lots — not 25, not 50.", tags: ["special", "subdivision", "NRED"], source: "CE Shop" },
    { id: "ce-eq-s2", topic: "Special Topics", question: "How many calendar days does a timeshare purchaser have to rescind?", options: ["3 days", "5 days", "7 days", "10 days"], correctIndex: 1, explanation: "Timeshare purchasers have a 5-calendar-day right of rescission that cannot be waived.", wrongExplanations: ["3 days is too short — the correct period is 5 calendar days.", "7 days exceeds the statutory 5-day period.", "10 days is the Residential Disclosure Guide timeline, not timeshare rescission."], difficulty: "basic", examTrap: false, tags: ["special", "timeshare", "rescission"], source: "CE Shop" },
    { id: "ce-eq-s3", topic: "Special Topics", question: "Nevada follows which water rights doctrine?", options: ["Riparian rights", "Prior appropriation", "Hybrid riparian/appropriation", "Federal water rights"], correctIndex: 1, explanation: "Nevada follows the prior appropriation doctrine ('first in time, first in right'). Water rights are separate from land ownership.", wrongExplanations: ["Riparian rights are used in eastern states, not Nevada.", "Nevada uses pure prior appropriation, not a hybrid system.", "Water rights in Nevada are governed by state law, not federal."], difficulty: "intermediate", examTrap: false, tags: ["special", "water-rights", "prior-appropriation"], source: "CE Shop" },
    { id: "ce-eq-s4", topic: "Special Topics", question: "Can an HOA prohibit a homeowner from installing solar panels in Nevada?", options: ["Yes — HOAs have full authority", "Generally no — Nevada law protects solar access", "Only for aesthetic reasons", "Only in gated communities"], correctIndex: 1, explanation: "Nevada law generally protects access to solar energy, and HOAs cannot prohibit solar installations, though reasonable aesthetic guidelines may be imposed.", wrongExplanations: ["HOAs do not have full authority to prohibit solar in Nevada.", "The protection extends beyond aesthetic considerations.", "The law applies to all communities, not just gated ones."], difficulty: "intermediate", examTrap: false, tags: ["special", "solar", "HOA"], source: "CE Shop" },
    { id: "ce-eq-s5", topic: "Special Topics", question: "Can a timeshare purchaser waive their right of rescission in Nevada?", options: ["Yes, if in writing", "Yes, if both parties agree", "No — the rescission right cannot be waived", "Only after 3 days"], correctIndex: 2, explanation: "The 5-day timeshare rescission right cannot be waived under any circumstances, even with written agreement.", wrongExplanations: ["Written waiver is not permitted for timeshare rescission.", "Mutual agreement cannot override the statutory rescission right.", "The full 5-day period applies — partial waiver is not allowed."], difficulty: "advanced", examTrap: true, examTrapNote: "Even if the buyer 'agrees' to waive rescission, the right stands. This is a common exam trap.", tags: ["special", "timeshare", "rescission", "waiver"], source: "CE Shop" },

    // Nevada Real Estate Commission: Duties & Powers
    {
      id: "ce-shop-comm-001",
      topic: "Nevada Real Estate Commission: Duties & Powers",
      question: "Once Nevada's Real Estate Commission investigates a complaint of a Nevada Revised Statute violation and finds evidence sufficient to warrant action, which of these statements about the commission's actions is true?",
      options: [
        "The commission will arrest the licensee.",
        "The commission will automatically revoke the accused's license.",
        "The commission will hold a hearing and allow the licensee to answer the charges.",
        "The commission will notify the state attorney to press criminal charges."
      ],
      correctIndex: 2,
      explanation: "After investigation, the commission's administrator will serve the licensee with a formal complaint and set a hearing date. The licensee may then answer the charges within 30 days.",
      wrongExplanations: [
        "The commission has no arrest powers — that is a law enforcement function entirely outside its jurisdiction.",
        "Automatic revocation without a hearing would violate due process. The licensee always has the right to answer charges.",
        "The commission can refer criminal matters to the courts, but a formal hearing always comes first."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["commission", "hearing", "disciplinary process", "complaint", "NRS 645"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-comm-003",
      topic: "Nevada Real Estate Commission: Duties & Powers",
      question: "Who's entitled to reimbursement from the Nevada Real Estate Education, Research, and Recovery Fund?",
      options: [
        "A broker affected by his licensee employee's wrongdoing",
        "A commission member affected by a member of the public's wrongdoing",
        "A licensee affected by her affiliated broker's wrongdoing",
        "An aggrieved consumer affected by a licensee's wrongdoing"
      ],
      correctIndex: 3,
      explanation: "The Recovery Fund pays consumers where a judgment awarding damages has been made against a licensee for wrongdoing associated with misrepresentation, fraud, or deceit in real estate activities. It protects the public — not licensees or brokers.",
      wrongExplanations: [
        "The fund exists to protect consumers, not brokers. A broker harmed by their licensee must pursue civil remedies.",
        "Commission members are not beneficiaries of the fund. It exists to protect members of the public.",
        "The fund protects consumers from licensee misconduct — not licensees from broker misconduct."
      ],
      difficulty: "basic",
      examTrap: false,
      tags: ["recovery fund", "ERRF", "consumers", "reimbursement", "NRS 645.842"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-comm-004",
      topic: "Nevada Real Estate Commission: Duties & Powers",
      question: "Licensee Jim was investigated by the Nevada Real Estate Commission based on a former client's complaint. Evidence at the hearing proved that Jim failed to exercise reasonable skill and care, and failed to obtain written consent from each party, allowing him to act for more than one party in the transaction. Along with an administrative fine, the commission imposed an additional sanction. Which of these is the commission most likely to require of Jim?",
      options: [
        "Additional CE hours in courses covering agency and ethics",
        "A letter of apology to the former client",
        "Re-qualification for a salesperson license",
        "Supervision by a commission member for a six-month period"
      ],
      correctIndex: 0,
      explanation: "When the commission imposes additional education as a sanction, it targets the specific areas of real estate law the licensee violated. Since Jim violated agency duties and failed to obtain dual agency consent, CE hours in agency and ethics are the logical sanction.",
      wrongExplanations: [
        "A letter of apology is not a recognized commission sanction under NRS 645.",
        "Re-qualification for a salesperson license is not a standard commission sanction — the commission suspends, revokes, or fines.",
        "Supervision by a commission member is not a standard sanction. The commission may require broker supervision, but not by a commissioner personally."
      ],
      difficulty: "intermediate",
      examTrap: false,
      tags: ["commission", "sanctions", "CE hours", "agency", "dual agency consent", "NRS 645"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-comm-005",
      topic: "Nevada Real Estate Commission: Duties & Powers",
      question: "The commission suspended Nevada licensee Sheila's real estate license after an investigation and hearing. What does this mean for Sheila?",
      options: [
        "Her license is void. She's not allowed to practice real estate anymore and can't reactivate her license.",
        "She may perform all her normal licensed activities, but she's on probation.",
        "She must complete real estate-related community service to have the suspension removed and may not earn compensation until she does so.",
        "She's not allowed to practice real estate during the term of the suspension, but after that time, she can continue performing licensed activities."
      ],
      correctIndex: 3,
      explanation: "License suspension means the licensee may not perform real estate activities during the suspension term. The license remains valid and reactivates when the suspension ends. Suspension is temporary — revocation is permanent.",
      wrongExplanations: [
        "A void or revoked license is permanent cancellation. Suspension is temporary — the license reactivates after the suspension period ends.",
        "During suspension the licensee cannot perform any licensed activities at all — they are not merely on probation.",
        "Community service is not a standard commission sanction. The suspension simply prohibits practice for a defined period."
      ],
      difficulty: "basic",
      examTrap: true,
      tags: ["suspension", "revocation", "license status", "commission", "sanctions"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-comm-006",
      topic: "Nevada Real Estate Commission: Duties & Powers",
      question: "Nevada's Real Estate Commission has the power to ______.",
      options: [
        "Conduct investigations and disciplinary hearings",
        "Create licensing course materials",
        "Provide internships to new licensees",
        "Require licensees to maintain separate escrow accounts in commission-maintained financial institutions"
      ],
      correctIndex: 0,
      explanation: "The commission conducts investigations and disciplinary hearings. It does not create course materials, provide internships, or control which financial institutions licensees use for escrow.",
      wrongExplanations: [
        "Creating licensing course materials is the role of approved education providers, not the commission.",
        "Providing internships is not a function or power of the Nevada Real Estate Commission under NRS 645.",
        "The commission does not maintain financial institutions or dictate which specific institutions licensees must use for escrow."
      ],
      difficulty: "basic",
      examTrap: false,
      tags: ["commission powers", "investigations", "disciplinary hearings", "NRS 645"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-comm-007",
      topic: "Nevada Real Estate Commission: Duties & Powers",
      question: "A fine has been levied against Nevada licensee Cara as a result of a disciplinary hearing. What entity has the power to enact that kind of sanction?",
      options: [
        "Cara's broker",
        "Cara's local city planning board",
        "Nevada's Real Estate Commission",
        "The law enforcement branch for her brokerage's city"
      ],
      correctIndex: 2,
      explanation: "Nevada's Real Estate Commission has the power to enact sanctions against licensees for misconduct, including fines, license suspensions, and revocations. No other entity listed has this authority.",
      wrongExplanations: [
        "A broker can terminate a licensee's affiliation but has no authority to levy administrative fines.",
        "City planning boards have jurisdiction over land use and zoning — not real estate licensee discipline.",
        "Law enforcement handles criminal matters. Administrative fines against licensees are the exclusive domain of the Nevada Real Estate Commission."
      ],
      difficulty: "basic",
      examTrap: false,
      tags: ["commission", "sanctions", "fines", "authority", "NRS 645"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-comm-008",
      topic: "Nevada Real Estate Commission: Duties & Powers",
      question: "Nevada's Real Estate Commission investigated a complaint against licensee Laverne and determined that her case may warrant administrative action. The administrator set a hearing and sent a formal complaint to Laverne. From the date the administrator files the formal complaint, how long does the commission have to hold the hearing?",
      options: [
        "10 days",
        "30 days",
        "60 days",
        "90 days"
      ],
      correctIndex: 3,
      explanation: "Hearings must be held within 90 days after the administrator files the official complaint. The hearing can only proceed within five years of the alleged act (or discovery of facts relating to misrepresentation).",
      wrongExplanations: [
        "10 days is the notice the licensee must receive before a hearing — not the window in which the hearing must be held.",
        "30 days is the time the licensee has to answer charges after receiving the formal complaint — not the hearing deadline.",
        "60 days is a common distractor. The correct window under NRS 645 is 90 days from the filing of the formal complaint."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["hearing timeline", "90 days", "formal complaint", "commission", "NRS 645"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-comm-009",
      topic: "Nevada Real Estate Commission: Duties & Powers",
      question: "Whom does the Nevada Real Estate Education, Research and Recovery Fund exist to protect?",
      options: [
        "Consumers",
        "Licensees",
        "Nevada's Real Estate Commission",
        "The brokers who employ and supervise licensees"
      ],
      correctIndex: 0,
      explanation: "The Recovery Fund pays consumers for damages awarded by a court in a judgment against licensees for real estate activities involving misrepresentation, fraud, or deceit. It protects the public — not industry participants.",
      wrongExplanations: [
        "The fund does not protect licensees. Licensees harmed by others must pursue separate civil or criminal remedies.",
        "The commission administers the fund but is not a beneficiary of it.",
        "Brokers are not the protected class under the Recovery Fund. It exists solely for aggrieved members of the public."
      ],
      difficulty: "basic",
      examTrap: false,
      tags: ["recovery fund", "ERRF", "consumers", "NRS 645.842"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-comm-010",
      topic: "Nevada Real Estate Commission: Duties & Powers",
      question: "Jessica is a Nevada licensee found guilty of misrepresentation. The judgment awarded three complainants $30,000 each in damages. Jessica has no money and all three make petitions to the Nevada Real Estate Education, Research, and Recovery Fund. What is the maximum the fund will pay out to Jessica's complainants?",
      options: [
        "$100,000 — This is the maximum per-licensee payout.",
        "$25,000 — This is the maximum payout per court case.",
        "$75,000 — With a per judgment maximum of $25,000, each claimant can get $25,000.",
        "$90,000 — With a maximum payout of $100,000 per licensee, all claimants can get their full $30,000."
      ],
      correctIndex: 2,
      explanation: "The maximum per-licensee lifetime payout is $100,000, but the maximum per judgment is $25,000. Each of the three claimants is capped at $25,000, for a total fund payout of $75,000 — not the full $30,000 each they were awarded.",
      wrongExplanations: [
        "$100,000 is the per-licensee lifetime cap, not the amount paid here. The $25,000 per-judgment cap limits each individual claimant.",
        "$25,000 is the per-judgment cap per claimant — but with three claimants each entitled to $25,000, the correct total is $75,000.",
        "$90,000 would require each claimant to receive their full $30,000, but the $25,000 per-judgment cap applies regardless of the award amount."
      ],
      difficulty: "advanced",
      examTrap: true,
      tags: ["recovery fund", "ERRF", "$25,000", "$100,000", "per judgment cap", "NRS 645.842"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-agency-001",
      topic: "Agency Law & Fiduciary Duties",
      question: "Nevada licensee Roberta is representing Donna in the sale of her condo. Roberta's co-worker, Daniel, represents a buyer interested in purchasing Donna's condo. Their broker, Frank, does allow licensees to practice dual agency. What's true about this situation?",
      options: [
        "Either Donna or the buyer must find an agent from a different brokerage since assigned agency isn't an option at a brokerage that allows dual agency.",
        "Frank, the broker, must assign either Roberta or Daniel to the transaction as a dual agent. Each client must sign a Consent to Act form.",
        "Their broker may allow them to work with their clients as assigned agents in the transaction. The Consent to Act form isn't required.",
        "Their broker will be a dual agent for this transaction. They'll need each client to sign a Consent to Act form."
      ],
      correctIndex: 2,
      explanation: "Broker Frank can officially assign licensees Roberta and Daniel to their respective clients, making them assigned agents — not dual agents. Since Frank is the only dual agent in this situation, the Consent to Act form isn't required.",
      wrongExplanations: [
        "Assigned agency is absolutely available at a brokerage that permits dual agency. The broker assigns individual licensees to each party, avoiding the dual agency conflict.",
        "The broker doesn't have to collapse both agents into one dual agent. He can assign each licensee to their own client, which is the preferred approach.",
        "If the broker were personally acting as dual agent, the Consent to Act form would be required. But here the broker assigns separate agents, so it isn't."
      ],
      difficulty: "advanced",
      examTrap: true,
      tags: ["assigned agency", "dual agency", "Consent to Act", "broker", "NRS 645.252"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-agency-002",
      topic: "Agency Law & Fiduciary Duties",
      question: "In Nevada, real estate agency is defined as _____.",
      options: [
        "A business that represents one group of people when dealing with another group of people",
        "A relationship between a client and an agent arising out of a brokerage agreement, whereby the agent is engaged to perform certain acts on behalf of the client",
        "The capacity of individuals to act independently and to make their own free choices",
        "The system of rules regulating the actions of an industry's members, which may be enforced by the imposition of penalties"
      ],
      correctIndex: 1,
      explanation: "Nevada defines agency as a relationship between a client and an agent arising out of a brokerage agreement, whereby the agent is engaged to perform certain acts on behalf of the client. This is the statutory definition under NRS 645.",
      wrongExplanations: [
        "This describes a general business, not the legal definition of agency under Nevada real estate law.",
        "This describes personal autonomy — unrelated to the legal definition of agency.",
        "This describes a regulatory framework, not an agency relationship."
      ],
      difficulty: "basic",
      examTrap: false,
      tags: ["agency definition", "brokerage agreement", "NRS 645", "statutory agency"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-agency-003",
      topic: "Agency Law & Fiduciary Duties",
      question: "Theresa is a Nevada licensee who's ready to begin an agency relationship with a client. How and when must she provide agency relationship disclosures?",
      options: [
        "On the proper form after the brokerage agreement is signed but no later than when the client signs a purchase agreement",
        "On the proper form as soon as practical but no later than when the client signs the brokerage agreement",
        "Verbally at first contact using a division-approved script",
        "Verbally or in writing prior to the client entering into a purchase agreement"
      ],
      correctIndex: 1,
      explanation: "Theresa must make the initial agency relationship disclosure on the Duties Owed by a Nevada Real Estate Licensee form as soon as practical, but no later than when the client signs the first document.",
      wrongExplanations: [
        "The disclosure must occur before or at the brokerage agreement — not after it is already signed.",
        "Verbal disclosure using a division-approved script is not the required method. The Duties Owed form must be used.",
        "The disclosure must occur on the proper written form — verbal disclosure alone does not satisfy Nevada's statutory requirement."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["Duties Owed form", "agency disclosure", "timing", "NRS 645.252"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-agency-004",
      topic: "Agency Law & Fiduciary Duties",
      question: "Karen is hosting an open house for a home she's listed in Carson City. Don walks in and decides he wants to make an offer, but he doesn't have an agent. He asks Karen to represent him. Which of the following must Karen do next?",
      options: [
        "End her agency relationship with her seller client so she can represent Don instead.",
        "Explain to Don that such an arrangement is illegal in Nevada.",
        "Inform her seller client in writing that she'll be representing the buyer, as well.",
        "Obtain written consent from both her seller and Don to represent both of them in the transaction."
      ],
      correctIndex: 3,
      explanation: "Dual agency is permitted in Nevada, but the agent must first obtain written consent from all parties on the Consent to Act form before proceeding.",
      wrongExplanations: [
        "Karen does not need to end her existing agency relationship. Dual agency is legal in Nevada with proper written consent.",
        "Dual agency is not illegal in Nevada. It is permitted provided all parties sign the Consent to Act form.",
        "Informing the seller in writing is not sufficient on its own. Written consent from both parties on the Consent to Act form is required."
      ],
      difficulty: "intermediate",
      examTrap: false,
      tags: ["dual agency", "Consent to Act", "open house", "NRS 645.252"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-agency-005",
      topic: "Agency Law & Fiduciary Duties",
      question: "According to Nevada's statutory duties, which of the following is true about the duty of confidentiality?",
      options: [
        "Confidential information can't be disclosed, even with the client's permission.",
        "It applies to all transaction parties.",
        "It ends when the agency agreement terminates.",
        "It lasts for one year after the termination of the brokerage agreement."
      ],
      correctIndex: 3,
      explanation: "Nevada's statutory duty of confidentiality applies to clients and lasts for one year after the termination of the brokerage agreement, unless the licensee is subject to a court order or given permission by the client.",
      wrongExplanations: [
        "Confidential information can be disclosed if the client gives permission or a court orders it. It is not an absolute prohibition.",
        "The duty of confidentiality applies only to clients — not to all transaction parties.",
        "Confidentiality does not end at termination. Nevada specifies it continues for one year after the brokerage agreement ends."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["confidentiality", "1 year", "statutory duties", "NRS 645.252", "brokerage termination"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-agency-006",
      topic: "Agency Law & Fiduciary Duties",
      question: "In Nevada, would failure to conduct an independent inspection of a property's condition be a breach of the licensee's statutory duties?",
      options: [
        "Maybe. If the licensee's client does not perform an inspection, the licensee is statutorily required to perform an independent investigation into a property's condition.",
        "No. Nevada licensees owe no duties related to a property's condition or an inspection thereof.",
        "No. Provided that the licensee had no knowledge of the defect and there were no signs of the defect that could have been found with reasonable care and diligence, licensees owe no further duty to conduct investigations into a property's condition.",
        "Yes. Licensees are required to conduct independent investigations into a property's condition to fulfill their statutory duties."
      ],
      correctIndex: 2,
      explanation: "While Nevada licensees must use reasonable care and diligence to investigate any observable material defects, they are not statutorily obligated to conduct an independent property condition investigation for every property.",
      wrongExplanations: [
        "A licensee's duty is not triggered simply because the client skips an inspection. The duty is to use reasonable care with observable defects — not to independently inspect every property.",
        "Nevada licensees do owe duties related to observable property conditions. They must use reasonable care and diligence with any visible defects.",
        "Licensees are not blanket-required to independently investigate every property's condition — only to use reasonable care with observable defects."
      ],
      difficulty: "advanced",
      examTrap: true,
      tags: ["reasonable care", "property inspection", "statutory duties", "observable defects", "NRS 645.252"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-agency-007",
      topic: "Agency Law & Fiduciary Duties",
      question: "Dual agency is legal in Nevada, but the agent must _____.",
      options: [
        "Act as a general agent for at least one of the parties",
        "Assign a sub-agent to one of the principals",
        "Have all parties sign the Consent to Act form",
        "Provide the Dual Agency Disclosure pamphlet to all transaction parties"
      ],
      correctIndex: 2,
      explanation: "Dual agency is permitted in Nevada, but the agent must first obtain written consent from all parties using the Consent to Act form.",
      wrongExplanations: [
        "Acting as a general agent for one party is not a requirement for dual agency. The key requirement is written consent from all parties.",
        "Assigning a sub-agent is not required or relevant to dual agency. The Consent to Act form is the required step.",
        "There is no 'Dual Agency Disclosure pamphlet' requirement in Nevada. The correct form is the Consent to Act form."
      ],
      difficulty: "basic",
      examTrap: true,
      tags: ["dual agency", "Consent to Act", "NRS 645.252"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-agency-008",
      topic: "Agency Law & Fiduciary Duties",
      question: "Which of these duties does a Nevada licensee owe ONLY to clients in a real estate transaction?",
      options: [
        "Compliance with all laws and regulations",
        "Confidentiality",
        "Disclosure of each source of compensation to the licensee",
        "Reasonable skill and care"
      ],
      correctIndex: 1,
      explanation: "Confidentiality is a duty owed only to clients. Reasonable skill and care, compliance with all laws, and disclosure of compensation sources are duties owed to all parties — including customers.",
      wrongExplanations: [
        "Compliance with all laws and regulations is a duty owed to all parties, not just clients.",
        "Disclosure of each source of compensation is owed to all transaction parties, not exclusively to clients.",
        "Reasonable skill and care is owed to all transaction parties, not exclusively to clients."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["confidentiality", "duties owed", "clients vs customers", "NRS 645.252"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-agency-009",
      topic: "Agency Law & Fiduciary Duties",
      question: "Which of the following describes the Authorization to Negotiate Directly with Seller form?",
      options: [
        "Allows seller clients to waive the agent's duty to present all offers made to and by the client, opening the client up to outside negotiators.",
        "Allows the agent to represent more than one party to a transaction.",
        "Allows the buyer client's agent to present offers directly to a seller client.",
        "Grants a broker's permission for a third-party law professional to participate in the negotiation process."
      ],
      correctIndex: 2,
      explanation: "The Authorization to Negotiate Directly with Seller form allows a seller client and their broker to authorize the buyer's agent to negotiate directly with the seller, after the seller has waived their agent's duty to present all offers using the Waiver Form.",
      wrongExplanations: [
        "That describes the Waiver Form — not the Authorization to Negotiate Directly with Seller form. These two forms work together but serve distinct purposes.",
        "Representing more than one party requires the Consent to Act form, not this form.",
        "This form is not about third-party legal professionals. It authorizes the buyer's agent to negotiate directly with the seller."
      ],
      difficulty: "advanced",
      examTrap: true,
      tags: ["Authorization to Negotiate", "Waiver Form", "direct negotiation", "seller", "NRS 645"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-agency-010",
      topic: "Agency Law & Fiduciary Duties",
      question: "What's the purpose of the confirmation of agency relationships required of Nevada licensees?",
      options: [
        "It clarifies and confirms all agency relationships at the time principals to a transaction enter into an agreement.",
        "It confirms the cooperation agreement between agents that allows the brokers to share compensation.",
        "It educates the consumer prior to entering into an agency relationship.",
        "It provides the licensee's associated broker with acknowledgment of any dual agency relationships."
      ],
      correctIndex: 0,
      explanation: "Nevada licensees must obtain client signatures on a written confirmation of agency relationships at the time the principals enter into a contract. This clarifies the existing agency relationships for all parties.",
      wrongExplanations: [
        "Compensation sharing between brokers is handled through cooperative agreements — not the agency confirmation.",
        "Consumer education happens earlier through the Duties Owed form. The confirmation occurs at the time of contract.",
        "The confirmation is for all parties to the transaction — not specifically for the broker's acknowledgment of dual agency."
      ],
      difficulty: "intermediate",
      examTrap: false,
      tags: ["confirmation of agency", "purchase agreement", "NRS 645"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-agency-011",
      topic: "Agency Law & Fiduciary Duties",
      question: "Nevada licensee Abigail is working with a very hands-on seller, Sandra. They've agreed that Sandra will accept and reply to offers herself, rather than having them go through Abigail. What two forms does Abigail need to ensure get filled out and signed for this to be functional and legal under Nevada Agency law?",
      options: [
        "A brokerage agreement and an Authorization to Negotiate Directly with Seller form",
        "A brokerage agreement and a Waiver Form",
        "An Authorization to Negotiate Directly with Seller form and a Release From All Duties form",
        "A Waiver Form and an Authorization to Negotiate Directly with Seller form"
      ],
      correctIndex: 3,
      explanation: "Both the Waiver Form and the Authorization to Negotiate Directly with Seller form must be used together. Without both, a buyer's agent does not have the seller's broker's permission to present offers or negotiate directly with the seller.",
      wrongExplanations: [
        "A brokerage agreement alone doesn't authorize direct negotiation. The Waiver Form and Authorization form are both required.",
        "A brokerage agreement and Waiver Form alone are insufficient. The Authorization to Negotiate Directly with Seller form is also required.",
        "There is no 'Release From All Duties' form in Nevada agency law. The correct pairing is the Waiver Form and Authorization to Negotiate Directly with Seller form."
      ],
      difficulty: "advanced",
      examTrap: true,
      tags: ["Waiver Form", "Authorization to Negotiate", "direct negotiation", "seller", "NRS 645"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-agency-012",
      topic: "Agency Law & Fiduciary Duties",
      question: "Bevin doesn't represent either party in a real estate transaction, but it is her best friend's first home purchase, and she'd like to assist in handling the paperwork. She suggests this to her broker who informs her that Nevada doesn't recognize this type of agency. What is Bevin attempting?",
      options: [
        "Assigned agency",
        "Dual agency",
        "Sub-agency",
        "Transactional agency"
      ],
      correctIndex: 3,
      explanation: "Under transactional agency, a licensee facilitates paperwork but doesn't act in a fiduciary capacity. This is also called a non-agent arrangement, and it is not recognized as a valid form of agency in Nevada.",
      wrongExplanations: [
        "Assigned agency is where a broker assigns individual licensees to represent each party in a dual agency situation — Bevin isn't representing anyone.",
        "Dual agency involves representing both parties with fiduciary duties to each. Bevin is attempting to represent neither party.",
        "Sub-agency involves a licensee working under another broker to assist their client. That is not what Bevin is describing."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["transactional agency", "non-agent", "Nevada agency types", "NRS 645"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-agency-013",
      topic: "Agency Law & Fiduciary Duties",
      question: "Which of these steps is required by Nevada law when a licensee is representing a client in a real estate transaction?",
      options: [
        "Confirmation of inspection reports by the buyer's agent at least three days prior to closing",
        "Confirmation of the agency relationship when the client signs the purchase agreement",
        "Confirmation of the duties the agent has provided to the client at the time closing occurs",
        "Confirmation of the licensee's association with a broker when a consumer requests information on a listing"
      ],
      correctIndex: 1,
      explanation: "Agency relationships must be confirmed in writing when the parties sign the purchase agreement. This is a statutory requirement under Nevada law.",
      wrongExplanations: [
        "There is no statutory requirement to confirm inspection reports three days before closing.",
        "Confirming duties at closing is not the timing requirement. Confirmation of agency must occur when the purchase agreement is signed.",
        "While licensees must be associated with a broker, confirming that association when a consumer requests listing information is not the specific agency confirmation requirement."
      ],
      difficulty: "intermediate",
      examTrap: false,
      tags: ["confirmation of agency", "purchase agreement", "NRS 645"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-agency-014",
      topic: "Agency Law & Fiduciary Duties",
      question: "Under what circumstance would Nevada licensee Doug utilize the Authorization to Negotiate Directly with Seller form?",
      options: [
        "In conjunction with the Waiver Form, which waives Doug's duty to present all offers to a seller client, the authorization form allows the buyer's agent to present the offers instead",
        "When Doug has a sub-agent assisting him with agency duties that will include offer presentation or negotiation",
        "When Doug is performing only transactional broker duties, rather than representational agency duties",
        "When Doug is representing multiple parties in the same transaction"
      ],
      correctIndex: 0,
      explanation: "The Authorization to Negotiate Directly with Seller form is used in conjunction with the Waiver Form to authorize a buyer's agent to negotiate directly with the seller, after the seller has waived their agent's duty to present all offers.",
      wrongExplanations: [
        "Sub-agents assisting with offer presentation do not require this form.",
        "Transactional broker duties are not recognized in Nevada. This form is not related to that concept.",
        "Representing multiple parties requires the Consent to Act form — not the Authorization to Negotiate Directly with Seller form."
      ],
      difficulty: "advanced",
      examTrap: true,
      tags: ["Authorization to Negotiate", "Waiver Form", "buyer's agent", "seller", "NRS 645"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-agency-015",
      topic: "Agency Law & Fiduciary Duties",
      question: "Which of the following describes Nevada's Waiver Form?",
      options: [
        "Allows seller clients to waive the agent's duty to present all offers made to and by the client.",
        "Allows the agent to represent more than one party to a transaction, waiving the duty of undivided loyalty to a single party.",
        "Allows the buyer client's agent to present offers directly to a seller client, where the seller client waives any future pursuit of implied agency.",
        "Permits the agent to act outside of the terms of the brokerage agreement, waiving the duty of fulfilling the agreement's terms."
      ],
      correctIndex: 0,
      explanation: "Nevada licensees are statutorily obligated to submit all offers to or by the client as soon as practicable. Seller clients can waive this specific duty by signing the prescribed Waiver Form provided by the Real Estate Division.",
      wrongExplanations: [
        "Representing more than one party requires the Consent to Act form — not the Waiver Form.",
        "The Waiver Form allows the seller to waive the duty of offer presentation. The implied agency characterization is incorrect.",
        "The Waiver Form does not permit the agent to act outside their brokerage agreement."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["Waiver Form", "present all offers", "statutory duty", "NRS 645"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-agency-016",
      topic: "Agency Law & Fiduciary Duties",
      question: "What agency duty a licensee owes to clients may a client choose to waive?",
      options: [
        "All of them",
        "None of them",
        "The duty to disclose facts to the buyer that would be to the seller's disadvantage",
        "The duty to present all offers to and from the client"
      ],
      correctIndex: 3,
      explanation: "Only one duty may be waived in Nevada — the duty to present all offers — and only if the client signs the prescribed Waiver Form provided by the Real Estate Division.",
      wrongExplanations: [
        "Clients cannot waive all duties. Most statutory duties are non-waiverable in Nevada.",
        "One duty can be waived — the duty to present all offers — via the Waiver Form.",
        "The duty of disclosure cannot be waived by clients. Disclosure of material facts is a non-waiverable statutory duty."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["Waiver Form", "waiveable duties", "present all offers", "NRS 645.252"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-agency-017",
      topic: "Agency Law & Fiduciary Duties",
      question: "In Nevada, how is the legal requirement for licensees to have their clients confirm their agency relationships accomplished?",
      options: [
        "By a clause in the purchase agreement; the parties' signature on the contract confirms the relationship",
        "By notarizing the brokerage agreement",
        "By provision of the Consent to Act form",
        "By provision of the Duties Owed by a Nevada Real Estate Licensee form"
      ],
      correctIndex: 0,
      explanation: "The step of confirming agency relationships occurs when the parties sign the standard purchase contract. A clause in the purchase agreement serves as the written confirmation.",
      wrongExplanations: [
        "Notarizing the brokerage agreement is not required and is not the method of confirming agency relationships.",
        "The Consent to Act form is used for dual agency consent — not for confirming an existing agency relationship at the time of contract.",
        "The Duties Owed form is provided at the beginning of the relationship — not at the contract stage for confirmation."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["confirmation of agency", "purchase agreement", "NRS 645"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-agency-018",
      topic: "Agency Law & Fiduciary Duties",
      question: "Which of these activities is NOT part of the statutory duty that a client may waive by using the Waiver Form?",
      options: [
        "Answering the client's questions regarding offers and counter-offers",
        "Assisting the client in preparing, communicating, and negotiating offers and counter-offers",
        "Conveying and accepting delivery of offers and counter-offers",
        "Maintaining the client's confidential information related to the client's motivation to sell or purchase"
      ],
      correctIndex: 3,
      explanation: "If a client chooses to waive the agent's statutory duty to present all offers, it includes certain activities related to that duty — but the duty of confidentiality always remains and cannot be waived.",
      wrongExplanations: [
        "Answering questions about offers and counter-offers is part of the offer-presentation duty and is included in what can be waived.",
        "Assisting with preparing and negotiating offers is part of the offer-presentation duty and is included in what can be waived.",
        "Conveying and accepting delivery of offers is part of the offer-presentation duty and is included in what can be waived."
      ],
      difficulty: "advanced",
      examTrap: true,
      tags: ["Waiver Form", "confidentiality", "offer presentation", "non-waiverable", "NRS 645.252"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-agency-019",
      topic: "Agency Law & Fiduciary Duties",
      question: "Which of these is NOT a duty real estate agents owe to clients in Nevada?",
      options: [
        "Account to the client for all money the agent receives from the client",
        "Advise the client to seek advice from appropriate professionals when a matter is outside the scope of a real estate license",
        "Present all offers to and from the client as soon as practicable",
        "Seek the highest possible price and terms for the subject property"
      ],
      correctIndex: 3,
      explanation: "Licensees must seek a price and terms as stated in the brokerage agreement or a price acceptable to the client — but not necessarily the highest possible price. That is an overstatement of the duty.",
      wrongExplanations: [
        "Accounting for all money received is a statutory duty owed to clients under NRS 645.252.",
        "Advising clients to seek professional advice outside the scope of a real estate license is a statutory duty.",
        "Presenting all offers as soon as practicable is a statutory duty — though it can be waived by the client using the Waiver Form."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["duties owed", "highest price", "brokerage agreement", "NRS 645.252"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-agency-020",
      topic: "Agency Law & Fiduciary Duties",
      question: "In Nevada, which of the following duties does the seller's agent owe the buyer in a transaction?",
      options: [
        "Accounting for money and property received in a timely manner",
        "Being loyal",
        "Dealing honestly and without fraud or deceit",
        "Keeping confidential information confidential"
      ],
      correctIndex: 2,
      explanation: "Nevada licensees are expected to deal with all transaction parties — including unrepresented buyers — in a manner that is not deceitful, fraudulent, or dishonest. Loyalty and confidentiality are owed only to clients.",
      wrongExplanations: [
        "Accounting for money and property is a duty owed to clients — not to all transaction parties.",
        "Loyalty is a fiduciary duty owed exclusively to clients. The seller's agent owes loyalty to the seller, not the buyer.",
        "Confidentiality is owed only to clients. The seller's agent does not owe the buyer confidentiality."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["duties owed", "customers", "honesty", "fraud", "NRS 645.252"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-disc-001",
      topic: "Property Disclosures (NRS 113, NRS 645)",
      question: "Under what conditions is the Seller's Real Property Disclosure form NOT required in Nevada?",
      options: [
        "The property is new construction and has never been occupied.",
        "The property is owned by the buying or selling broker in the transaction.",
        "The seller has never lived on the property.",
        "The seller has occupied the property for less than a year."
      ],
      correctIndex: 0,
      explanation: "The Seller's Real Property Disclosure form isn't required for new construction, foreclosures, or sales between co-owners, spouses, or close relatives.",
      wrongExplanations: [
        "A broker owning the property does not exempt the transaction from the SRPD requirement. Exemptions are specific: new construction, foreclosures, and transfers between co-owners, spouses, or close relatives.",
        "Whether the seller lived on the property is irrelevant to the SRPD requirement. The exemptions are tied to property type and relationship between parties — not occupancy history.",
        "Length of occupancy does not determine whether the SRPD is required. There is no one-year threshold in Nevada law."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["SRPD", "exemptions", "new construction", "foreclosure", "NRS 113.130"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-disc-002",
      topic: "Property Disclosures (NRS 113, NRS 645)",
      question: "In which of these situations does a Nevada licensee have a disclosable ownership interest in the property?",
      options: [
        "Carson represents both the buyer and the seller in a transaction.",
        "Kennedy is representing his LLC in the purchase of a commercial building.",
        "Rebecca is listing her neighbor's vacation home.",
        "Roger is listing a property that he sold to the current owner eight years ago."
      ],
      correctIndex: 1,
      explanation: "Kennedy is part of the LLC that's purchasing a commercial building, so he must disclose this ownership interest to all parties to the transaction.",
      wrongExplanations: [
        "Representing both parties is a dual agency situation requiring a Consent to Act form — not a licensee-as-principal disclosure. Carson has no ownership interest.",
        "Listing a neighbor's home does not create an ownership interest. Rebecca has no financial stake in the property.",
        "Having previously sold a property to the current owner does not create a current ownership interest requiring disclosure."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["licensee as principal", "ownership interest", "LLC", "disclosure", "NRS 645.252"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-disc-003",
      topic: "Property Disclosures (NRS 113, NRS 645)",
      question: "Nancy is meeting with her buyer client, Jordan. She has a copy of the Nevada Residential Disclosure Guide on her iPad. Which of the following is she required to do?",
      options: [
        "Provide a hard copy of the guide to her client.",
        "Provide a hard copy of the guide to the sellers her buyer client works with.",
        "Show the guide to her client, and tell him where he can download it.",
        "Sign the guide digitally and provide a copy to her client."
      ],
      correctIndex: 0,
      explanation: "Nevada licensees must provide the Residential Disclosure Guide to all buyer and seller clients, have them sign it to acknowledge receipt, and retain a copy of the acknowledgement page in the transaction file.",
      wrongExplanations: [
        "The guide must be provided to Nancy's own client — Jordan — not to the sellers. Each agent provides the guide to their own client.",
        "Simply showing the guide on an iPad and directing the client to download it does not satisfy the requirement. A copy must be provided and signed.",
        "Digital signing alone is insufficient without providing the client a copy. The client must sign to acknowledge receipt and the agent retains that acknowledgement."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["Residential Disclosure Guide", "buyer client", "hard copy", "signature", "NRS 113"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-disc-004",
      topic: "Property Disclosures (NRS 113, NRS 645)",
      question: "The purpose of the Consent to Act Disclosure form is to ______.",
      options: [
        "To disclose a personal interest in a transaction",
        "To disclose that the licensee will represent both parties in a transaction",
        "To get consent from the seller to access the property",
        "To inform all parties of the duties a Nevada licensee owes to them"
      ],
      correctIndex: 1,
      explanation: "The Consent to Act Disclosure informs all parties that the licensee will represent both parties in the transaction and obtains written consent from each party to proceed with dual agency.",
      wrongExplanations: [
        "Disclosing a personal ownership interest in a transaction requires a licensee-as-principal disclosure — not the Consent to Act form.",
        "Property access consent is handled through lockbox agreements or showing instructions — not the Consent to Act form.",
        "Informing parties of the duties a Nevada licensee owes them is the purpose of the Duties Owed by a Nevada Real Estate Licensee form — not the Consent to Act form."
      ],
      difficulty: "basic",
      examTrap: true,
      tags: ["Consent to Act", "dual agency", "disclosure", "NRS 645.252"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-disc-005",
      topic: "Property Disclosures (NRS 113, NRS 645)",
      question: "Which of the following would you need to disclose about a listed property in Reno?",
      options: [
        "It was previously listed with another brokerage.",
        "You owned the property in the 1990s.",
        "Your stepfather is the property owner.",
        "You viewed the property as a potential buyer three months ago, but decided against it."
      ],
      correctIndex: 2,
      explanation: "If a licensee has an ownership interest in a property, or a family or organizational connection to the property owner, this must be disclosed to all parties to the transaction. A stepfather relationship is a disclosable family connection.",
      wrongExplanations: [
        "Prior listing history with another brokerage is not a licensee-as-principal disclosure requirement. It has no bearing on the licensee's personal interest in the property.",
        "Past ownership from decades ago does not create a current disclosable interest. The disclosure requirement applies to current ownership or family/organizational connections.",
        "Viewing a property as a potential buyer without purchasing it does not create a disclosable ownership or family interest in the property."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["licensee as principal", "family connection", "disclosure", "NRS 645.252"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-disc-006",
      topic: "Property Disclosures (NRS 113, NRS 645)",
      question: "Connie is representing Mary, who is selling her Nevada condo. Gerald represents Luke and Cody, who are purchasing Mary's condo. Who's required to complete the Nevada Seller's Real Property Disclosure form?",
      options: [
        "Connie",
        "Gerald",
        "Luke and Cody",
        "Mary"
      ],
      correctIndex: 3,
      explanation: "The seller is responsible for completing the Seller's Real Property Disclosure form and providing it to the buyers. Licensees should never complete the form on behalf of the seller.",
      wrongExplanations: [
        "Connie is the listing agent — she must advise Mary of her duty to disclose, but she must never fill out the SRPD herself.",
        "Gerald is the buyer's agent and has no role in completing the SRPD. The form is the seller's responsibility.",
        "Luke and Cody are the buyers — they receive the SRPD, they do not complete it."
      ],
      difficulty: "basic",
      examTrap: false,
      tags: ["SRPD", "seller responsibility", "NRS 113.130"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-disc-007",
      topic: "Property Disclosures (NRS 113, NRS 645)",
      question: "You've listed a 35-acre ranch with a home and several outbuildings. It's been divided from the cattle ranch that's still in operation next door. You make sure to tell your seller that the ______ disclosure is required.",
      options: [
        "Farming and Ranching",
        "Hunting and Gaming",
        "Land Survey",
        "Open Range"
      ],
      correctIndex: 3,
      explanation: "When property is adjacent to open range where livestock are allowed to graze and roam unfenced, sellers must provide the Open Range disclosure. It informs buyers that the property may be subject to state and county rights-of-way that might interfere with their enjoyment of the property.",
      wrongExplanations: [
        "There is no 'Farming and Ranching' disclosure form in Nevada real estate law.",
        "There is no 'Hunting and Gaming' disclosure form in Nevada real estate law.",
        "A Land Survey is not a required disclosure for proximity to open range. The specific required form is the Open Range disclosure."
      ],
      difficulty: "intermediate",
      examTrap: false,
      tags: ["Open Range disclosure", "adjacent property", "rights-of-way", "NRS 113"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-disc-008",
      topic: "Property Disclosures (NRS 113, NRS 645)",
      question: "What is the purpose of the Nevada Residential Disclosure Guide?",
      options: [
        "To educate consumers on the disclosures they should receive, who'll provide them, and when.",
        "To educate real estate licensees on required disclosures, who'll provide them, and when.",
        "To provide proof that buyers have received the required disclosures.",
        "To provide proof that sellers have given buyers the required disclosures."
      ],
      correctIndex: 0,
      explanation: "The purpose of the Nevada Residential Disclosure Guide is to educate consumers on the disclosures they should receive, who will provide them, and when. Licensees must provide the guide to clients, have them sign it to acknowledge receipt, and retain a copy in the transaction file.",
      wrongExplanations: [
        "The guide is designed for consumers — not licensees. Licensees are expected to already know the disclosure requirements.",
        "While the signed acknowledgement page does serve as proof of receipt, that is not the primary purpose of the guide. Its purpose is consumer education.",
        "The guide is not a proof-of-delivery document for seller-provided disclosures. It educates consumers about what disclosures they should expect to receive."
      ],
      difficulty: "basic",
      examTrap: true,
      tags: ["Residential Disclosure Guide", "consumer education", "NRS 113"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-disc-009",
      topic: "Property Disclosures (NRS 113, NRS 645)",
      question: "According to Nevada law, when new condominium units are sold, the seller must provide ______ to the buyer.",
      options: [
        "A Consent to Act Disclosure",
        "A public offering statement and the Common-Interest Communities Disclosure",
        "A resale package and the Common-Interest Communities Disclosure",
        "The Common-Interest Communities Disclosure only"
      ],
      correctIndex: 1,
      explanation: "For new condominium developments, the seller must provide both a public offering statement and the Common-Interest Communities Disclosure to the buyer.",
      wrongExplanations: [
        "A Consent to Act Disclosure is for dual agency situations — it has nothing to do with condominium sales disclosures.",
        "A resale package is required for resale condominiums — not new construction. New condo sales require a public offering statement instead.",
        "The Common-Interest Communities Disclosure alone is not sufficient for new condo sales. A public offering statement is also required."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["CIC disclosure", "new construction", "public offering statement", "condominium", "NRS 116"],
      source: "CE Shop",
      weekNumber: 2
    },
    {
      id: "ce-shop-disc-010",
      topic: "Property Disclosures (NRS 113, NRS 645)",
      question: "Nevada consumers who want to make an offer on a resale condominium have ______ to cancel the contract.",
      options: [
        "Five calendar days from the date they receive the resale package",
        "One business day from the date of the contract",
        "One week from the date they receive the resale package",
        "Three business days from the date of the contract"
      ],
      correctIndex: 0,
      explanation: "For a resale condominium, Nevada buyers have five calendar days from the date they receive the resale package to cancel the contract.",
      wrongExplanations: [
        "One business day is too short and is not the correct timeframe under Nevada law for resale condo cancellation.",
        "One week is too long. The correct window is five calendar days — not seven.",
        "Three business days from the contract date is incorrect on both counts — the clock starts from receipt of the resale package, not the contract date, and the window is five calendar days."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["CIC disclosure", "resale package", "5 calendar days", "cancellation", "NRS 116"],
      source: "CE Shop",
      weekNumber: 2
    },
    // — Nevada Licensing Requirements (NRS 645, NAC 645) —
    {
      id: "ce-shop-lic-002",
      topic: "Nevada Licensing Requirements (NRS 645, NAC 645)",
      question: "Tony has passed the Nevada broker's licensing exam but chooses to work as a salesperson. He must be ______.",
      options: [
        "A broker",
        "A brokerage employee",
        "A broker-salesperson",
        "An associate broker"
      ],
      correctIndex: 2,
      explanation: "A broker-salesperson is someone who holds a broker's license but chooses to work under another broker as a salesperson. Broker-salespersons may work as either employees or independent contractors.",
      wrongExplanations: [
        "Tony has passed the broker's exam but is choosing to work under another broker — that makes him a broker-salesperson, not an independent broker.",
        "'Brokerage employee' is not a license type in Nevada. The correct license classification is broker-salesperson.",
        "'Associate broker' is not the Nevada terminology. Nevada uses 'broker-salesperson' to describe someone with broker qualifications working under another broker."
      ],
      difficulty: "basic",
      examTrap: true,
      tags: ["broker-salesperson", "license types", "NRS 645.009"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-lic-003",
      topic: "Nevada Licensing Requirements (NRS 645, NAC 645)",
      question: "Catherine is a real estate licensee who has two other licensees working under her supervision. What type of license does Catherine hold?",
      options: [
        "Broker",
        "Office manager",
        "Salesperson",
        "Supervisor"
      ],
      correctIndex: 0,
      explanation: "Only brokers can employ and supervise other licensees in Nevada. The ability to have licensees working under your supervision is exclusive to the broker license.",
      wrongExplanations: [
        "'Office manager' is not a license type in Nevada real estate law.",
        "A salesperson cannot employ or supervise other licensees. Salespersons must themselves be supervised by a broker.",
        "'Supervisor' is not a recognized license type in Nevada. Only a broker can supervise other licensees."
      ],
      difficulty: "basic",
      examTrap: false,
      tags: ["broker", "supervision", "license types", "NRS 645"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-lic-004",
      topic: "Nevada Licensing Requirements (NRS 645, NAC 645)",
      question: "As a Nevada salesperson, how many hours of post-licensing education must you complete the first year you have your license?",
      options: ["10", "15", "20", "30"],
      correctIndex: 3,
      explanation: "Nevada licensees are required to complete 30 hours of post-licensing education during the first year of licensing in order to qualify for renewal.",
      wrongExplanations: [
        "10 hours is insufficient. Nevada requires 30 hours of post-licensing education in the first year.",
        "15 hours is insufficient. The first-year post-licensing requirement is 30 hours.",
        "20 hours is insufficient. Nevada requires the full 30 hours of post-licensing education to qualify for first renewal."
      ],
      difficulty: "basic",
      examTrap: true,
      tags: ["post-licensing", "30 hours", "first year", "license maintenance", "NAC 645.4442"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-lic-005",
      topic: "Nevada Licensing Requirements (NRS 645, NAC 645)",
      question: "Nevada salesperson Christine has decided to leave her current broker. What happens to her license after she terminates her association?",
      options: [
        "Her current broker gives it to her, and she'll hand it to her new broker when she finds one. She has 10 days to associate with a new broker or her license is suspended.",
        "Her current broker is required to hold it until she associates with a new broker or inactivates it, at which point it must be forwarded to the new broker or to the division.",
        "She may not terminate her association with her current broker until she has affiliated with a new broker. Her license must be forwarded to the new broker within 10 days of the change.",
        "The division holds it until she associates with a new broker. She has 30 days to do so, or her license becomes inactive."
      ],
      correctIndex: 3,
      explanation: "When a licensee's association is terminated, the broker sends the license to the division. Christine then has 30 days to associate with a new broker — who will receive her license from the division — or her license becomes inactive.",
      wrongExplanations: [
        "The broker does not hand the license directly to the salesperson. It goes to the division. The 10-day figure is also incorrect — Christine has 30 days to associate with a new broker.",
        "The broker does not hold the license. Once the association is terminated, the broker sends it to the division.",
        "Christine can terminate her association without first finding a new broker. She has 30 days after termination to associate with a new broker before the license becomes inactive."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["license transfer", "30 days", "termination", "division", "NRS 645"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-lic-006",
      topic: "Nevada Licensing Requirements (NRS 645, NAC 645)",
      question: "Kaley is a licensed real estate salesperson. She recently engaged in some sloppy advertising preparation that led to a judgment of consumer fraud. What does Kaley owe to the Nevada Real Estate Division?",
      options: [
        "A phone call notifying it of the judgment",
        "A written apology",
        "Proof of passage of an ethics course",
        "Written notification"
      ],
      correctIndex: 3,
      explanation: "Licensees who are convicted of a real estate-related felony, fraud, misrepresentation, deceit, or a crime of moral turpitude must notify the division in writing within 10 days.",
      wrongExplanations: [
        "A phone call does not satisfy the notification requirement. Written notification to the division is required within 10 days.",
        "A written apology is not the required notification. The division requires formal written notification of the judgment.",
        "Proof of an ethics course is not the immediate requirement. The first obligation is written notification to the division within 10 days."
      ],
      difficulty: "intermediate",
      examTrap: false,
      tags: ["written notification", "fraud", "moral turpitude", "10 days", "NRS 645"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-lic-007",
      topic: "Nevada Licensing Requirements (NRS 645, NAC 645)",
      question: "Which of the following is a true statement about license status in Nevada?",
      options: [
        "A license can be voluntarily or involuntarily placed in inactive status, and the licensee can't practice real estate until her license is reactivated.",
        "If a license is inactive, the licensee can still practice real estate.",
        "Only licensees can change their own license status to inactive.",
        "Only the division can change a license status to inactive."
      ],
      correctIndex: 0,
      explanation: "Both individuals and the division can place a license in inactive status. Licensees cannot practice real estate unless their license is active — whether the inactivation was voluntary or involuntary.",
      wrongExplanations: [
        "An inactive license means the licensee cannot practice real estate under any circumstances.",
        "Both the licensee and the division can inactivate a license — it is not exclusive to the licensee.",
        "Both the licensee and the division can inactivate a license — it is not exclusive to the division."
      ],
      difficulty: "basic",
      examTrap: true,
      tags: ["inactive license", "license status", "division", "NRS 645.150"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-lic-008",
      topic: "Nevada Licensing Requirements (NRS 645, NAC 645)",
      question: "Paul's license has been inactive for more than two years. Which of the following is a step he must take to change his license from inactive to active?",
      options: [
        "Complete 15 hours of continuing education.",
        "Have his sponsoring broker request that his license be made active.",
        "Retake the pre-licensing final exam.",
        "Retake the state portion of the licensing exam."
      ],
      correctIndex: 3,
      explanation: "If a Nevada license has been inactive for more than two years, the licensee must retake the state portion of the licensing exam before the license can be reactivated.",
      wrongExplanations: [
        "15 hours of CE is not sufficient to reactivate a license that has been inactive for more than two years. The state exam must be retaken.",
        "A sponsoring broker cannot simply request reactivation of a license that has been inactive for more than two years. The state exam must be retaken first.",
        "Retaking the pre-licensing final exam is not the requirement. The state portion of the licensing exam specifically must be retaken."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["inactive license", "reactivation", "state exam", "two years", "NRS 645"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-lic-009",
      topic: "Nevada Licensing Requirements (NRS 645, NAC 645)",
      question: "Ruby is a real estate licensee. She and her partner are buying a bigger home and will rent out their current home after they move. What's true about this situation?",
      options: [
        "She doesn't need to notify the real estate division of any changes.",
        "She'll be issued a new license and must pay a fee.",
        "She'll need to obtain a property management permit to rent out her home.",
        "She'll need to submit a change of address form to the real estate division."
      ],
      correctIndex: 0,
      explanation: "Licensees must notify the real estate division when their name, business address, or business location changes — but the division does not require notification when only a personal home address changes.",
      wrongExplanations: [
        "A new license is not issued simply because a licensee moves to a new home. No fee or new license is required for a personal address change.",
        "A property management permit is not required for a licensee to rent out their own personal home.",
        "The division only requires notification of business address changes — not personal home address changes."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["address change", "notification", "division", "business address", "NRS 645"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-lic-010",
      topic: "Nevada Licensing Requirements (NRS 645, NAC 645)",
      question: "How old must an individual be to qualify for a Nevada salesperson license?",
      options: ["18", "19", "20", "21"],
      correctIndex: 0,
      explanation: "Nevada applicants for a salesperson license must be at least 18 years of age.",
      wrongExplanations: [
        "19 is not the minimum age. Nevada requires applicants to be at least 18.",
        "20 is not the minimum age. Nevada requires applicants to be at least 18.",
        "21 is not the minimum age. Nevada requires applicants to be at least 18."
      ],
      difficulty: "basic",
      examTrap: false,
      tags: ["age requirement", "18", "salesperson", "eligibility", "NRS 645.330"],
      source: "CE Shop",
      weekNumber: 1
    },
    {
      id: "ce-shop-contr-001",
      topic: "Contracts",
      question: "Kiki's client, Jonas, just signed their brokerage agreement this afternoon. When should Kiki deliver a copy of the completed document to Jonas?",
      options: [
        "She shouldn't; the only copy should remain at the brokerage office for safekeeping.",
        "She should only send a copy if Jonas requests one in writing.",
        "She should send it as soon as possible.",
        "She should send it when she has time; there's no deadline for her to deliver it."
      ],
      correctIndex: 2,
      explanation: "Copies of brokerage agreements should be sent to clients as soon as the document is signed or within a reasonable time thereafter.",
      wrongExplanations: [
        "Clients are entitled to copies of all documents they sign. Keeping the only copy at the brokerage is not acceptable practice.",
        "Licensees must proactively deliver copies — they cannot wait for the client to request one in writing.",
        "There is an implicit duty of promptness. Licensees should deliver copies as soon as possible, not at their convenience."
      ],
      difficulty: "basic",
      examTrap: false,
      tags: ["brokerage agreement", "document delivery", "copies", "NRS 645"],
      source: "CE Shop",
      weekNumber: 4
    },
    {
      id: "ce-shop-contr-002",
      topic: "Contracts",
      question: "Which type of brokerage agreement prohibits other licensees from interfering with the client-broker relationship?",
      options: [
        "Exclusive representation",
        "Limited agency",
        "Net listing",
        "Open brokerage"
      ],
      correctIndex: 0,
      explanation: "When a client signs an exclusive representation agreement with a broker, other licensees are prohibited from interfering with this relationship by approaching the client with representation offers.",
      wrongExplanations: [
        "Limited agency is not a type of brokerage agreement that addresses exclusivity or interference by other licensees.",
        "A net listing relates to how commission is calculated, not to exclusivity of representation.",
        "An open brokerage agreement allows multiple brokers to compete — it does not prohibit interference."
      ],
      difficulty: "basic",
      examTrap: false,
      tags: ["exclusive representation", "brokerage agreement", "interference", "NRS 645"],
      source: "CE Shop",
      weekNumber: 4
    },
    {
      id: "ce-shop-contr-003",
      topic: "Contracts",
      question: "Licensees who charge advance fees must provide the client with an accounting of how the money was used within _____ of collecting the fee.",
      options: [
        "30 days",
        "60 days",
        "Six months",
        "Three months"
      ],
      correctIndex: 3,
      explanation: "Advance fee agreements require that a client provide money up front for brokerage services. Any licensee who charges advance fees must provide the client with an accounting of how the money was used within three months of collecting the fee.",
      wrongExplanations: [
        "30 days is too short. The correct timeframe for advance fee accounting is three months.",
        "60 days is incorrect. Nevada requires the accounting within three months of collecting the advance fee.",
        "Six months is too long. The correct requirement is three months, not six."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["advance fees", "accounting", "three months", "NRS 645"],
      source: "CE Shop",
      weekNumber: 5
    },
    {
      id: "ce-shop-contr-004",
      topic: "Contracts",
      question: "When a listing agent accepts an earnest money deposit from a buyer, the funds must be ______.",
      options: [
        "Delivered to an escrow company within three business days",
        "Given to the licensee's broker promptly",
        "Held in a separate account under the buyer's name",
        "Submitted to the seller immediately"
      ],
      correctIndex: 1,
      explanation: "Licensees must promptly hand over to their broker any earnest money received from a buyer. The broker will hold it securely until the offer is accepted, and then deposit it in a trust fund or deliver it to an escrow company according to the instructions in the purchase agreement.",
      wrongExplanations: [
        "The funds go to the broker first, not directly to an escrow company. The broker decides how to handle them per the purchase agreement.",
        "Earnest money is not held in a separate account under the buyer's name. It goes to the licensee's broker promptly.",
        "Earnest money is not submitted to the seller immediately. It must be given to the licensee's broker promptly."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["earnest money", "broker", "trust fund", "deposit handling", "NRS 645"],
      source: "CE Shop",
      weekNumber: 5
    },
    {
      id: "ce-shop-contr-005",
      topic: "Contracts",
      question: "If an escrow company isn't used, Nevada requires licensees to provide their clients with a copy of the closing statement within ______ after closing.",
      options: [
        "10 days",
        "24 hours",
        "30 days",
        "Five business days"
      ],
      correctIndex: 0,
      explanation: "Licensees must provide their clients with a copy of their closing statement within 10 days after closing. In most cases, the escrow agent will perform this service, in which case the licensee doesn't need to do so.",
      wrongExplanations: [
        "24 hours is too short. The correct timeframe is 10 days after closing.",
        "30 days is too long. Nevada requires delivery within 10 days, not 30.",
        "Five business days is incorrect. The requirement is 10 calendar days after closing."
      ],
      difficulty: "intermediate",
      examTrap: true,
      tags: ["closing statement", "10 days", "escrow", "document delivery", "NRS 645"],
      source: "CE Shop",
      weekNumber: 6
    },
    {
      id: "ce-shop-contr-006",
      topic: "Contracts",
      question: "Which of the following is NOT true regarding performance of a contract in Nevada?",
      options: [
        "Impossibility of performance occurs when the property is destroyed or made the subject of eminent domain.",
        "In impossibility of performance situations, the parties are released from their contractual obligations.",
        "Only meeting the terms of the original contract qualifies for specific performance.",
        "Specific performance requirements can be satisfied through property or monetary damages."
      ],
      correctIndex: 3,
      explanation: "No other property or monetary damages equal specific performance — only meeting the terms of the original contract qualifies.",
      wrongExplanations: [
        "This statement is true. Impossibility of performance does occur when the property is destroyed or taken by eminent domain.",
        "This statement is true. When performance becomes impossible, the parties are released from their obligations.",
        "This statement is true. Specific performance means fulfilling the exact terms of the original contract."
      ],
      difficulty: "advanced",
      examTrap: true,
      tags: ["specific performance", "impossibility", "contract performance", "eminent domain"],
      source: "CE Shop",
      weekNumber: 6
    },
    {
      id: "ce-shop-contr-007",
      topic: "Contracts",
      question: "Which of these is NOT typically described in a listing agreement?",
      options: [
        "Methods of marketing the property, such as posting on the MLS and yard signage, that require owner permission for placement",
        "Tasks the agent will undertake for the seller, such as marketing the property and presenting offers",
        "The licensee's duties, such as disclosure of material facts and maintaining confidential information for the seller",
        "The seller's reason for selling and characteristics of the desired buyer for the property"
      ],
      correctIndex: 3,
      explanation: "The listing agreement details licensee and client duties, along with a description of the property and the list price, but it will not include the seller's reason for selling or a profile of the desired buyer.",
      wrongExplanations: [
        "Marketing methods requiring owner permission are typically described in a listing agreement.",
        "Agent tasks such as marketing and presenting offers are standard components of a listing agreement.",
        "Licensee duties including disclosure and confidentiality are standard listing agreement provisions."
      ],
      difficulty: "intermediate",
      examTrap: false,
      tags: ["listing agreement", "contents", "marketing", "duties"],
      source: "CE Shop",
      weekNumber: 4
    },
    {
      id: "ce-shop-contr-008",
      topic: "Contracts",
      question: "The commission may use any of the following measures to discipline non-compliant licensees, EXCEPT _____.",
      options: [
        "Administrative fines",
        "Denial of the renewal of a real estate license",
        "Jail time",
        "Suspension of a real estate license"
      ],
      correctIndex: 2,
      explanation: "The commission has several tools to discipline non-compliant licensees, including administrative fines, suspension, revocation, or denial of license renewal. Jail time is a criminal penalty imposed by courts, not the commission.",
      wrongExplanations: [
        "Administrative fines are within the commission's disciplinary authority.",
        "Denial of license renewal is a valid disciplinary measure available to the commission.",
        "Suspension of a real estate license is a standard disciplinary tool of the commission."
      ],
      difficulty: "basic",
      examTrap: false,
      tags: ["commission", "discipline", "administrative fines", "suspension", "jail"],
      source: "CE Shop",
      weekNumber: 4
    },
    {
      id: "ce-shop-contr-009",
      topic: "Contracts",
      question: "Real estate contracts must be enforceable, express, valid, and _____.",
      options: [
        "Bilateral",
        "Oral",
        "Unilateral",
        "Voidable"
      ],
      correctIndex: 0,
      explanation: "Real estate sales contracts must be enforceable, express, valid, bilateral, and executed or executory.",
      wrongExplanations: [
        "Oral contracts are generally not enforceable for real estate transactions under the Statute of Frauds.",
        "Unilateral contracts involve a promise by only one party. Real estate sales contracts are bilateral.",
        "Voidable contracts have defects that allow one party to void them — this is not a requirement of valid real estate contracts."
      ],
      difficulty: "basic",
      examTrap: false,
      tags: ["bilateral", "contract requirements", "enforceable", "express", "valid"],
      source: "CE Shop",
      weekNumber: 4
    },
    {
      id: "ce-shop-contr-010",
      topic: "Contracts",
      question: "Gloria went on vacation the day after her clients signed their closing statement. She came back seven days later and then sent the completed documents to all parties to the transaction. Would the commission consider her actions as violations of any regulations?",
      options: [
        "No, because there are no time limits on when closing statements must be sent to parties to a transaction.",
        "No, she didn't violate any regulations.",
        "Yes, she didn't deliver the completed closing statement within the appropriate amount of time.",
        "Yes, she went on a vacation within 48 hours of a transaction closing, rather than keeping herself available to her clients for questions."
      ],
      correctIndex: 1,
      explanation: "Gloria delivered a completed copy of the closing statement to all parties within 10 days after the transaction closed (she sent it on day 8), so she did not violate any regulations.",
      wrongExplanations: [
        "There is a time limit — 10 days — but Gloria met it by delivering on day 8.",
        "Gloria delivered the closing statement on day 8, which is within the 10-day requirement. She did not violate any regulations.",
        "There is no regulation requiring licensees to remain available for 48 hours after closing. The only requirement is delivering closing statements within 10 days."
      ],
      difficulty: "advanced",
      examTrap: true,
      tags: ["closing statement", "10 days", "vacation", "timing", "compliance"],
      source: "CE Shop",
      weekNumber: 6
    },
  ];
}

export function getCEShopActivities(): Activity[] {
  return [
    {
      id: "ce-act-contracts",
      title: "Listing Agreement Type Identification Drill",
      type: "contract-drill",
      description: "Students receive 10 real-world scenarios describing different seller-broker arrangements and must identify the correct listing type (exclusive right-to-sell, exclusive agency, open listing, or net listing) and explain the commission implications for each.",
      instructorNotes: "Focus on the key distinguishing factor: who pays commission when the seller finds the buyer independently. Use scenarios that test edge cases like expired listings, overlapping listings, and procuring cause disputes.",
      debriefPrompts: [
        "What is the single most important difference between exclusive right-to-sell and exclusive agency?",
        "Why are net listings discouraged even though they are legal in Nevada?",
        "In what scenario would a seller prefer an open listing over an exclusive agreement?",
      ],
      topic: "Contracts",
      weekNumber: 3,
      tags: ["contracts", "listings", "commission", "CE Shop"],
    },
    {
      id: "ce-act-trust",
      title: "Trust Fund Handling & Commingling Case Study",
      type: "case-study",
      description: "Analyze three scenarios involving broker trust account management: (1) A broker deposits $200 of personal funds to cover potential bank fees; (2) A salesperson holds earnest money over the weekend before depositing Tuesday; (3) A broker withdraws advance fees before services are rendered. Students identify the violations and cite the applicable NRS/NAC provisions.",
      instructorNotes: "Emphasize the $150 commingling exception, the next-business-day deposit rule for earnest money, and advance fee accounting requirements. Have students calculate the exact violation amounts where applicable.",
      debriefPrompts: [
        "Why does Nevada allow a $150 commingling exception? What problem does this solve?",
        "What are the potential disciplinary consequences for trust account violations?",
        "How should a broker handle a situation where they receive earnest money on a Friday afternoon?",
      ],
      topic: "Trust Accounts",
      weekNumber: 6,
      tags: ["trust-accounts", "commingling", "earnest-money", "CE Shop"],
    },
    {
      id: "ce-act-disclosures",
      title: "Disclosure Timeline Mapping Exercise",
      type: "other",
      description: "Students create a comprehensive timeline of all disclosure deadlines and rescission periods in a Nevada residential transaction. Map events from first contact (Form 525) through closing, including: Form 524, Residential Disclosure Guide (10 days), Seller's Disclosure, CIC resale package (5-day rescission), and new defect rescission (4 business days). Include key milestones and identify which deadlines are calendar days vs. business days.",
      instructorNotes: "Provide a blank timeline template. This exercise reinforces the differences between calendar days and business days, which is a common exam trap. Have students color-code deadlines by type (forms, disclosures, rescission periods).",
      debriefPrompts: [
        "Which deadlines use calendar days and which use business days? Why does this matter?",
        "What happens if a seller misses the 10-day Residential Disclosure Guide deadline?",
        "How do CIC disclosure requirements layer on top of standard residential disclosures?",
      ],
      topic: "Disclosures",
      weekNumber: 3,
      tags: ["disclosures", "timelines", "rescission", "forms", "CE Shop"],
    },
  ];
}
