// Textbook Content — Units 1-2: Real Estate Brokerage and Agency; Listing and Buyer Representation Agreements
// Source: Scheible, Nevada Real Estate textbook
import type { Module, ExamQuestion, Activity } from "@/types/course";

export function getTextbookModules(): Module[] {
  return [
    {
      id: "tb-mod-u1-1",
      weekNumber: 1,
      title: "Definition of Real Estate Broker (NRS 645.030)",
      order: 50,
      keyTerms: [
        { id: "tb-kt-u1-1-1", term: "Real Estate Broker", definition: "A person who helps someone else with a real estate transaction or business brokerage transaction for compensation or the expectation of compensation (NRS 645.030). A license is required to operate legally as a broker (NRS 645.230).", source: "Textbook" },
        { id: "tb-kt-u1-1-2", term: "Five Brokerage Activity Categories", definition: "1) Purchase, sale, lease, or option of real estate; 2) Advance fees related to business opportunities or real estate; 3) Property management; 4) Business brokerage; 5) Purchase, sale, or lease of public lands.", source: "Textbook" },
        { id: "tb-kt-u1-1-3", term: "Designated Broker", definition: "The natural person (officer, member, or manager) designated by a business entity to hold the broker's license. This person is ultimately responsible for all business activities and cannot act on their own behalf without a separate license.", source: "Textbook" },
        { id: "tb-kt-u1-1-4", term: "Broker Entity", definition: "A broker can be a natural person (sole proprietor) or a corporation, partnership, or LLC. Entities must file governing documents with the Nevada Real Estate Division.", source: "Textbook" },
        { id: "tb-kt-u1-1-5", term: "Jory v. Bennight", definition: "Nevada Supreme Court case (91 Nev. 763, 1975) holding that operating in corporate form does not insulate a broker from personal liability for professional defaults.", source: "Textbook" },
      ],
      conceptExplanation: "NRS 645.030 defines a real estate broker broadly as someone who acts for another in real estate transactions for compensation or the expectation of compensation. The definition covers five categories of activities. Only a broker can independently engage in brokerage activities—a salesperson must be associated with a broker or owner-developer. Salespersons may not accept compensation from anyone other than their employing broker, advertise without broker supervision, hold client funds, or pay referral fees to unlicensed persons. Business entities must designate a natural person as broker, and per Jory v. Bennight, corporate form does not shield from personal liability. Financial institutions (banks, S&Ls, credit unions) cannot hold a broker's license.",
      nevadaLegalRefs: "NRS 645.030 (broker defined); NRS 645.230 (license required); Jory v. Bennight, 91 Nev. 763 (1975) (personal liability not shielded by corporate form)",
      realWorldScenario: "An unlicensed person advertises property for another and collects a 'bonus' for helping find a buyer. This constitutes brokerage activity because there is compensation on behalf of another in a real estate transaction—a broker's license is required.",
      commonMistakes: "1. Thinking 'expectation of compensation' doesn't trigger licensing—it does\n2. Believing corporate structure shields from personal liability for professional defaults\n3. Not recognizing all five activity categories require a license\n4. Assuming financial institutions can hold broker licenses—they cannot",
      examKeyPoints: "• NRS 645.030 defines broker broadly—compensation OR expectation of compensation\n• Five categories of brokerage activities\n• Salesperson acts on behalf of broker, not independently\n• Designated broker = natural person with ultimate responsibility\n• Corporate form ≠ personal liability shield (Jory v. Bennight)\n• Financial institutions CANNOT hold a broker's license",
      examAlerts: [
        { id: "tb-ea-u1-1-1", text: "Even EXPECTATION of compensation triggers the broker-license requirement under NRS 645.030.", type: "exam-trap" },
        { id: "tb-ea-u1-1-2", text: "Financial institutions (banks, S&Ls, thrift companies, credit unions) CANNOT hold a broker's license.", type: "exam-alert" },
      ],
      knowledgeChecks: [
        { id: "tb-kc-u1-1-1", question: "Which of the following can hold a real estate broker's license in Nevada?", options: ["A bank", "A credit union", "A limited liability company", "A savings and loan association"], correctIndex: 2, explanation: "Business entities such as LLCs can hold broker licenses, but financial institutions (banks, S&Ls, credit unions) cannot." },
      ],
      discussionPrompt: "Why does Nevada prohibit financial institutions from holding broker licenses? What policy concerns does this address?",
      assignmentSuggestion: "List all five brokerage activity categories and provide a real-world example of each.",
      estimatedTime: "20 minutes",
      sourceTag: "Textbook",
      correctsTextbook: false,
      federalVsNevada: "nevada",
    },
    {
      id: "tb-mod-u1-2",
      weekNumber: 1,
      title: "Business Licenses & Place of Business",
      order: 51,
      keyTerms: [
        { id: "tb-kt-u1-2-1", term: "State Business License", definition: "Required for brokers and associated licensees functioning as independent contractors. Fee: $500 for corporations, $200 for all other businesses; must be renewed annually.", source: "Textbook" },
        { id: "tb-kt-u1-2-2", term: "Place of Business", definition: "Active brokers must maintain a definite place of business in Nevada, accessible to the public, with the broker's license prominently displayed and a sign visible from the nearest public sidewalk, street, or highway.", source: "Textbook" },
        { id: "tb-kt-u1-2-3", term: "Branch Office", definition: "Must be managed by a broker or broker-salesperson with at least 2 years active experience within the last 4 years. The main broker retains overall liability.", source: "Textbook" },
      ],
      conceptExplanation: "Nevada requires both state and local business licenses. The state license fee is $500 for corporations, $200 for other entities, renewed annually. Active brokers must maintain a definite, publicly accessible place of business in Nevada with signage visible from the street. Home offices may qualify if zoning allows and the space is separate and identifiable. A virtual-only office (VOW) likely fails the 'definite place of business' requirement. Branch offices must be managed by a broker or experienced broker-salesperson (2+ years active in last 4). The broker's license must be prominently displayed; the Division issues additional licenses for branch offices.",
      nevadaLegalRefs: "NRS 645 (Place of business requirements); NAC 645 (Branch office, signage, and license display regulations)",
      realWorldScenario: "Broker Kim operates from home, handling all clients remotely via laptop. She has no signage and no separate, publicly accessible space. She likely fails the place-of-business requirement—home offices must be clearly separate, accessible, and signed.",
      commonMistakes: "1. Assuming a virtual office satisfies the place-of-business requirement—it probably doesn't\n2. Forgetting that branch offices need a manager with 2+ years active experience\n3. Not displaying licenses prominently at all office locations",
      examKeyPoints: "• State business license: $500 corporations, $200 all others, annual renewal\n• Must maintain definite place of business in NV—accessible, signed, license displayed\n• Virtual-only office likely fails the requirement\n• Branch offices: managed by broker or broker-salesperson with 2+ years active experience in last 4 years\n• Broker retains overall liability even for branch offices",
      examAlerts: [
        { id: "tb-ea-u1-2-1", text: "A virtual office on the web (VOW) probably does NOT satisfy the 'definite place of business' requirement.", type: "exam-alert" },
      ],
      knowledgeChecks: [],
      discussionPrompt: "Should Nevada update its place-of-business requirements to accommodate virtual brokerages? What consumer protections might be lost?",
      assignmentSuggestion: "Research your local city/county business license requirements for a real estate brokerage.",
      estimatedTime: "15 minutes",
      sourceTag: "Textbook",
      correctsTextbook: false,
      federalVsNevada: "nevada",
    },
    {
      id: "tb-mod-u1-3",
      weekNumber: 1,
      title: "Broker Supervision & Legal Duties",
      order: 52,
      keyTerms: [
        { id: "tb-kt-u1-3-1", term: "Broker Supervision", definition: "A fundamental duty of a broker is to supervise associated licensees, employees, and business operations—regardless of whether licensees are independent contractors or employees.", source: "Textbook" },
        { id: "tb-kt-u1-3-2", term: "Vicarious Liability", definition: "A broker is vicariously liable for the conduct of all activities within the office. This does not relieve individual licensees of liability for their own conduct.", source: "Textbook" },
        { id: "tb-kt-u1-3-3", term: "Recordkeeping (5 Years)", definition: "A broker must keep complete real estate transaction and property management records within Nevada for at least five years. Associated licensees must submit paperwork within five calendar days after execution by all parties.", source: "Textbook" },
        { id: "tb-kt-u1-3-4", term: "Trust Account", definition: "Not required unless engaged in property management. If maintained: records of deposits required, no commingling, monthly reconciliation, annual reconciliation to Division, records kept 5 years.", source: "Textbook" },
        { id: "tb-kt-u1-3-5", term: "Duty to Monitor", definition: "Broker must monitor compliance with office policies. May use a broker-salesperson to assist but cannot relinquish overall responsibility. A salesperson CANNOT assist with monitoring.", source: "Textbook" },
      ],
      conceptExplanation: "The broker bears ultimate responsibility for all activities within the brokerage. The duty to supervise applies regardless of whether licensees are independent contractors or employees. A broker must establish policies, rules, procedures, and systems to review, oversee, and manage real estate transactions, documents, money handling, advertising, and legal compliance. The broker may use a broker-salesperson to assist with monitoring but cannot delegate overall responsibility—and may NOT use a salesperson for this purpose. Records must be kept for 5 years within Nevada, and paperwork must be submitted within 5 calendar days. Trust accounts are optional unless doing property management, but if maintained, must follow strict rules including monthly reconciliation and no commingling. Associated licensees may only receive compensation through their employing broker, though a gift of any value may be given directly to a client.",
      nevadaLegalRefs: "NAC 645.600 (Broker supervision duties); NAC 645.650 (Recordkeeping—5 years); NAC 645.655 (Division notification before moving records)",
      realWorldScenario: "A salesperson receives an earnest money deposit from a buyer on a Friday evening. She must promptly turn over the money to the broker—she cannot hold client funds. The broker must deposit it properly and maintain records.",
      commonMistakes: "1. Thinking IC status exempts broker from supervision duties—it doesn't\n2. Using a salesperson (instead of broker-salesperson) to assist with monitoring\n3. Keeping records for fewer than 5 years\n4. Allowing salespersons to hold client funds\n5. Commingling trust account funds",
      examKeyPoints: "• Broker supervises ALL licensees and employees—IC status irrelevant\n• Broker vicariously liable but licensees still liable for own conduct\n• Records: 5 years within NV; paperwork submitted within 5 calendar days\n• Trust accounts: optional unless property management; no commingling; monthly reconciliation\n• Broker-salesperson can assist with monitoring; salesperson CANNOT\n• Compensation flows through broker; gifts directly to client OK",
      examAlerts: [
        { id: "tb-ea-u1-3-1", text: "A salesperson CANNOT assist the broker with monitoring and administration—only a broker-salesperson can.", type: "exam-trap" },
        { id: "tb-ea-u1-3-2", text: "Records must be kept for FIVE years, and paperwork submitted within FIVE CALENDAR days.", type: "high-probability" },
      ],
      knowledgeChecks: [
        { id: "tb-kc-u1-3-1", question: "A broker must keep transaction records for at least how many years?", options: ["One year", "Three years", "Five years", "Seven years"], correctIndex: 2, explanation: "NAC 645.650 requires brokers to keep complete transaction and property management records for at least five years." },
      ],
      discussionPrompt: "If a broker is vicariously liable for a salesperson's misconduct, why doesn't that relieve the salesperson of individual liability?",
      assignmentSuggestion: "Create a compliance checklist for a new brokerage covering supervision, recordkeeping, and trust account requirements.",
      estimatedTime: "20 minutes",
      sourceTag: "Textbook",
      correctsTextbook: false,
      federalVsNevada: "nevada",
    },
    {
      id: "tb-mod-u1-4",
      weekNumber: 1,
      title: "Agency Relationships in Nevada",
      order: 53,
      keyTerms: [
        { id: "tb-kt-u1-4-1", term: "Agency (NRS 645.0045)", definition: "A relationship between a principal and an agent arising out of a brokerage agreement whereby the agent is engaged to do certain acts on behalf of the principal in dealings with a third party. An agency is NOT created when one broker negotiates with another broker's client with written permission.", source: "Textbook" },
        { id: "tb-kt-u1-4-2", term: "Single Agency", definition: "The broker represents only one party in a transaction. Client duties to the principal; customer duties to parties not represented.", source: "Textbook" },
        { id: "tb-kt-u1-4-3", term: "Dual Agency", definition: "Acting for more than one party to the transaction (NRS 645.252[1][d]). Requires informed, written consent of ALL parties via the Consent to Act form BEFORE entering into negotiations. The term 'dual agency' is not used in NV statutes.", source: "Textbook" },
        { id: "tb-kt-u1-4-4", term: "Assigned Agency", definition: "Broker assigns one affiliated licensee to represent the seller and a different affiliated licensee to represent the buyer in the same transaction. Avoids dual agency; Consent to Act form is NOT required.", source: "Textbook" },
        { id: "tb-kt-u1-4-5", term: "Statutory Nonemployee", definition: "Under 26 USC § 3508, a 'qualified real estate agent' treated as an independent contractor for federal tax purposes only, if: licensed, compensation based on sales output, written contract specifying non-employee tax status.", source: "Textbook" },
      ],
      conceptExplanation: "Nevada's 2007 statutory definition of agency (NRS 645.0045) has two parts: (1) agency arises from a brokerage agreement where the agent acts on behalf of the principal, and (2) no agency is created when one broker communicates with another broker's client with written permission. Three types of representation exist: single agency (one party only), dual agency (both parties, requires Consent to Act form), and assigned agency (separate licensees assigned to each party, avoiding dual agency). Assigned agency can be established as office policy—case-by-case assignment is not required. Nevada does NOT allow transactional agency, nonagency, or facilitator roles. Under NRS 608.0155 (effective 2015), a salesperson is conclusively presumed to be an independent contractor if they meet certain criteria (SSN/tax ID + business license + 3 of 5 additional criteria).",
      nevadaLegalRefs: "NRS 645.0045 (Agency defined); NRS 645.252(1)(d) (Dual agency authorized); NRS 645.253 (Assigned agency); NRS 608.0155 (IC presumption); 26 USC § 3508 (Statutory nonemployee)",
      realWorldScenario: "Salesperson A lists a home. Salesperson B, from the same brokerage, brings a buyer. If the broker assigns A to represent the seller exclusively and B to represent the buyer exclusively, it is an assigned agency—not a dual agency—and the Consent to Act form is not required.",
      commonMistakes: "1. Thinking assigned agency requires the Consent to Act form—it doesn't\n2. Believing Nevada allows transactional agency or facilitator roles—it doesn't\n3. Confusing federal tax status (statutory nonemployee) with state employment status\n4. Forgetting that dual agency requires consent BEFORE negotiations begin",
      examKeyPoints: "• NRS 645.0045: two-part definition of agency\n• Single agency: one party; dual agency: both parties (Consent to Act required); assigned agency: separate licensees (no Consent to Act)\n• Assigned agency can be office-wide policy\n• Nevada does NOT allow transactional agency/facilitator\n• IC presumption: SSN/tax ID + business license + 3 of 5 criteria\n• Statutory nonemployee (26 USC § 3508): licensed, commission-based, written contract",
      examAlerts: [
        { id: "tb-ea-u1-4-1", text: "Assigned agency does NOT require the Consent to Act form—only dual agency does.", type: "exam-trap" },
        { id: "tb-ea-u1-4-2", text: "Nevada does NOT allow transactional agency, nonagency, or facilitator roles.", type: "exam-alert" },
      ],
      knowledgeChecks: [
        { id: "tb-kc-u1-4-1", question: "Which form is NOT required for an assigned agency?", options: ["Duties Owed by a Nevada RE Licensee", "Consent to Act", "Brokerage agreement", "None of the above"], correctIndex: 1, explanation: "The Consent to Act form is only required for dual agency. Assigned agency avoids dual agency by assigning separate licensees." },
      ],
      discussionPrompt: "Why might a brokerage prefer to use assigned agency as a default office policy rather than handling dual agency on a case-by-case basis?",
      assignmentSuggestion: "Draw a diagram showing how agency flows from client → broker → salesperson in single, dual, and assigned agency scenarios.",
      estimatedTime: "25 minutes",
      sourceTag: "Textbook",
      correctsTextbook: false,
      federalVsNevada: "both",
    },
    {
      id: "tb-mod-u1-5",
      weekNumber: 1,
      title: "Duties Owed by a Nevada Real Estate Licensee",
      order: 54,
      keyTerms: [
        { id: "tb-kt-u1-5-1", term: "NRS 645.252 (Duties to All Parties)", definition: "Disclose material facts relating to the property (known or should have known), disclose compensation sources, disclose if principal/interest in principal, disclose dual agency, disclose changes in relationship, exercise reasonable skill and care, provide agency disclosure form.", source: "Textbook" },
        { id: "tb-kt-u1-5-2", term: "NRS 645.253 (Assigned Agency Duty)", definition: "Additional duty of confidentiality in assigned agency, extending the client-level duty of confidentiality.", source: "Textbook" },
        { id: "tb-kt-u1-5-3", term: "NRS 645.254 (Client Duties)", definition: "Additional duties owed only to clients: carry out brokerage agreement terms, maintain confidentiality (1 year after termination), seek transaction on agreed terms, present ALL offers, disclose material facts concerning the transaction, advise to seek expert advice, account for money/property.", source: "Textbook" },
        { id: "tb-kt-u1-5-4", term: "Material Facts — Property vs. Transaction", definition: "Facts 'relating to the property' (e.g., leaky roof) must be disclosed to ALL parties. Facts 'concerning the transaction' (e.g., seller's motivation) are disclosed only to clients. This is a critical distinction.", source: "Textbook" },
        { id: "tb-kt-u1-5-5", term: "Confidentiality (1-Year Limit)", definition: "The statutory duty of confidentiality lasts only 1 year after revocation or termination of the brokerage agreement. This differs from common law (no time limit) and NAR Code of Ethics (no time limit).", source: "Textbook" },
      ],
      conceptExplanation: "Three statutes define licensee duties in Nevada. NRS 645.252 covers duties owed to ALL parties: disclose material facts relating to the property (known or 'should have known' standard), disclose compensation sources, disclose principal interest, disclose dual agency, exercise reasonable skill and care, and provide the agency disclosure form. NRS 645.253 adds confidentiality duties for assigned agency. NRS 645.254 adds client-only duties: carry out brokerage agreement, maintain confidentiality (1-year statutory limit), present ALL offers (the only waivable duty), seek transaction on stated terms, disclose material facts concerning the transaction, advise seeking expert advice, and account for money. The distinction between 'facts relating to the property' (all parties) and 'facts concerning the transaction' (client only) is critical for the exam. A seller's financial motivation is a transaction fact (confidential), while a leaky roof is a property fact (must disclose to all).",
      nevadaLegalRefs: "NRS 645.252 (Duties to all parties); NRS 645.253 (Assigned agency duties); NRS 645.254 (Client duties); NAC 645.630 (Present all offers promptly)",
      realWorldScenario: "Broker Bob lists a property. The seller discloses the roof leaks and the basement floods. Bob also finds mold. The seller mentions financial problems. Bob must disclose the leaky roof, flooding basement, and mold to all prospective buyers (property facts). But the seller's financial problems are confidential transaction information—not disclosed to buyers.",
      commonMistakes: "1. Confusing 'facts relating to the property' with 'facts concerning the transaction'\n2. Thinking confidentiality lasts forever—it's 1 year under NV statute\n3. Believing a licensee can refuse to present an offer because property is already under contract\n4. Not recognizing the 'should have known' standard for property facts",
      examKeyPoints: "• Three duty statutes: NRS 645.252 (all parties), .253 (assigned agency), .254 (client)\n• Property facts → disclose to ALL; transaction facts → client only\n• 'Should have known' standard applies to property facts\n• Confidentiality: 1 year after termination (differs from common law)\n• ALL offers must be presented—only waivable duty\n• Breach → actual damages (money) only in NV; plus possible disciplinary action",
      examAlerts: [
        { id: "tb-ea-u1-5-1", text: "Material facts RELATING TO THE PROPERTY must be disclosed to ALL parties; material facts CONCERNING THE TRANSACTION are disclosed only to clients.", type: "exam-trap" },
        { id: "tb-ea-u1-5-2", text: "The duty to present ALL offers is the ONLY duty that can be waived by a client.", type: "high-probability" },
        { id: "tb-ea-u1-5-3", text: "Nevada's statutory confidentiality lasts only 1 YEAR after termination—unlike common law which has no time limit.", type: "exam-alert" },
      ],
      knowledgeChecks: [
        { id: "tb-kc-u1-5-1", question: "A listing broker knows the seller is desperate to sell. Must the broker disclose this to potential buyers?", options: ["Yes, it's a material fact relating to the property", "Yes, it's a material fact concerning the transaction", "No, it's confidential client information", "No, unless buyers specifically ask"], correctIndex: 2, explanation: "Seller motivation is a fact concerning the transaction (NRS 645.254), owed only to clients, and is confidential information that should not be disclosed to non-clients." },
      ],
      discussionPrompt: "Why does Nevada limit the duty of confidentiality to one year after termination, while the NAR Code of Ethics imposes no time limit?",
      assignmentSuggestion: "Create a comparison chart of NRS 645.252, 645.253, and 645.254 showing which duties apply to which relationships.",
      estimatedTime: "25 minutes",
      sourceTag: "Textbook",
      correctsTextbook: false,
      federalVsNevada: "nevada",
    },
    {
      id: "tb-mod-u1-6",
      weekNumber: 1,
      title: "Disclosure Forms & Stigmatized Property",
      order: 55,
      keyTerms: [
        { id: "tb-kt-u1-6-1", term: "Duties Owed Form", definition: "State-mandated form advising parties of licensee's statutory duties. Five sections: (1) Title disclaimer/distribution, (2) Licensee/broker/client identification, (3) Statutory duties, (4) Potential for dual agency, (5) Signature blocks. Must be given to client AND every unrepresented party.", source: "Textbook" },
        { id: "tb-kt-u1-6-2", term: "Consent to Act Form", definition: "State-mandated form for dual agency. Eight sections covering: (1) Title/intro, (2) Transaction description, (3) Licensee/party ID, (4) Conflict of interest, (5) Confidentiality, (6) Licensee duties, (7) No requirement to consent, (8) Signature block. Both parties must sign.", source: "Textbook" },
        { id: "tb-kt-u1-6-3", term: "Stigmatized Property (NRS 40.770)", definition: "Properties deemed undesirable due to events (homicide, suicide, felony) or conditions (HIV/AIDS occupant, sex offender nearby, transitional living facility). These are NOT material facts and licensees are NOT liable for non-disclosure—except for methamphetamine production (unless remediated).", source: "Textbook" },
        { id: "tb-kt-u1-6-4", term: "Residential Disclosure Guide", definition: "Effective July 1, 2006 (NRS 645.194), licensees must distribute this Division-prepared booklet to prospective buyers and sellers in residential transactions, covering federal, state, and local disclosure requirements.", source: "Textbook" },
      ],
      conceptExplanation: "Two mandatory forms govern agency disclosure in Nevada. The Duties Owed form (5 sections) must be given to every client and unrepresented party—it is NOT a contract and does NOT establish an agency relationship. The Consent to Act form (8 sections) is required only for dual agency—both parties must sign. NRS 40.770 addresses stigmatized property: homicide, suicide, felony (except meth production), HIV/AIDS occupancy, sex offenders, and transitional living facilities are NOT material facts. Licensees cannot be held liable for non-disclosure of these. Exception: unremediated meth production MUST be disclosed. A buyer's agent can waive the stigmatized property protection by agreement. HIV disclosure carries additional risk under the Fair Housing Act (HUD says it likely constitutes handicap discrimination). Agency confirmation must also be done separately in purchase/rental agreements (NAC 645.637).",
      nevadaLegalRefs: "NRS 645.252 (Duties Owed form requirement); NRS 645.194 (Residential Disclosure Guide); NRS 40.770 (Stigmatized property); NAC 645.637 (Agency confirmation in contracts)",
      realWorldScenario: "A buyer asks their agent whether anyone died in the house they're considering. Under NRS 40.770, the agent is not required to disclose deaths on the property—these are not material facts. However, if the agent had agreed in writing to make such disclosures, the statutory protection would be waived.",
      commonMistakes: "1. Thinking the Duties Owed form creates an agency relationship—it doesn't\n2. Forgetting to give the Duties Owed form to unrepresented parties\n3. Disclosing HIV/AIDS occupancy—this likely violates the Fair Housing Act\n4. Failing to disclose unremediated meth production—this IS required",
      examKeyPoints: "• Duties Owed form: 5 sections, given to client AND unrepresented parties, NOT a contract\n• Consent to Act form: 8 sections, dual agency only, both parties sign\n• NRS 40.770: death, felony, HIV, sex offenders = NOT material facts\n• Exception: unremediated meth production MUST be disclosed\n• Buyer's agent can waive stigmatized property protections\n• HIV disclosure → possible Fair Housing Act violation\n• Residential Disclosure Guide required since July 1, 2006",
      examAlerts: [
        { id: "tb-ea-u1-6-1", text: "Unremediated methamphetamine production is the ONE stigmatized-property exception that MUST be disclosed.", type: "exam-trap" },
        { id: "tb-ea-u1-6-2", text: "The Duties Owed form must be given to BOTH clients AND unrepresented parties.", type: "high-probability" },
      ],
      knowledgeChecks: [
        { id: "tb-kc-u1-6-1", question: "Under NRS 40.770, which of the following MUST be disclosed?", options: ["A homicide on the property", "A sex offender in the neighborhood", "Unremediated methamphetamine production", "A suicide on the property"], correctIndex: 2, explanation: "NRS 40.770 exempts most stigmatized conditions from disclosure, but unremediated methamphetamine production is the exception that must be disclosed." },
      ],
      discussionPrompt: "Should Nevada expand its stigmatized property protections? What about haunted houses—should there be statutory guidance?",
      assignmentSuggestion: "Compare the Duties Owed form and Consent to Act form section by section. When is each required?",
      estimatedTime: "20 minutes",
      sourceTag: "Textbook",
      correctsTextbook: false,
      federalVsNevada: "both",
    },
    {
      id: "tb-mod-u1-7",
      weekNumber: 1,
      title: "Personal Assistants, Advertising & Termination of Agency",
      order: 56,
      keyTerms: [
        { id: "tb-kt-u1-7-1", term: "Personal Assistant (Licensed vs. Unlicensed)", definition: "Can be licensed or unlicensed, employee or IC. Unlicensed assistants cannot perform activities requiring a license. Licensed assistants must be associated with a broker. An inactive licensee is treated as unlicensed.", source: "Textbook" },
        { id: "tb-kt-u1-7-2", term: "Advertising Requirements", definition: "Brokerage firm name must be clearly and prominently identified in every advertisement. Salespersons may not advertise in their own names alone. License number must appear on all advertising. Licensees selling own property: 'for sale by owner-agent' or 'for sale by broker-agent' OK; 'for sale by owner' is NOT allowed.", source: "Textbook" },
        { id: "tb-kt-u1-7-3", term: "Team Advertising", definition: "Teams must have more than one licensee, all associated with the same broker. Team name must include last name of at least one member. Must comply with all other advertising laws.", source: "Textbook" },
        { id: "tb-kt-u1-7-4", term: "Termination of Agency", definition: "Can occur by: performance, expiration of time, revocation by principal, mutual agreement, death of broker (not salesperson), destruction of subject matter, breach of contract, or operation of law (bankruptcy).", source: "Textbook" },
      ],
      conceptExplanation: "Personal assistants enhance productivity but must follow licensing rules. Unlicensed assistants cannot perform any licensed activities. Licensed assistants must be associated with a broker—a salesperson cannot associate only with another salesperson. Inactive licensees are treated as unlicensed. No NV statutes specifically regulate assistants, but the Division has issued Information Bulletin #010. Advertising rules require the brokerage firm name prominently in every ad, license numbers on all advertising, and prohibit salespersons from advertising in their own names. Licensees selling their own property may use 'for sale by owner-agent' but NOT 'for sale by owner.' Teams must include the last name of at least one member. Agency relationships terminate by: performance, expiration, revocation by principal (may still owe compensation), mutual agreement, death of broker (but NOT death of salesperson), destruction of property, breach of contract, or operation of law. Nevada's Unfair Trade Practice Act (NRS 598A) complements federal antitrust laws, and NRS 118 extends fair housing protections to include ancestry, sexual orientation, and gender identity/expression.",
      nevadaLegalRefs: "NAC 645 (Advertising regulations); NRS 598A (Unfair Trade Practice Act / Antitrust); NRS 118 (Nevada Fair Housing Law); RE Division Information Bulletin #010 (Unlicensed Assistants)",
      realWorldScenario: "A top-producing salesperson wants her unlicensed assistant to show properties and negotiate offers while she focuses on listings. This is illegal—showing property and negotiating are activities requiring a license. The unlicensed assistant can handle scheduling, data entry, and marketing materials under supervision, but not licensed activities.",
      commonMistakes: "1. Using 'for sale by owner' when a licensee is selling own property—must say 'owner-agent' or 'broker-agent'\n2. Allowing unlicensed assistants to perform licensed activities (showings, negotiations)\n3. Thinking death of a salesperson terminates the agency—it doesn't; only death of the broker does\n4. Not including brokerage name prominently in ads",
      examKeyPoints: "• Unlicensed assistants: no licensed activities; inactive licensee = unlicensed\n• Advertising: brokerage name prominent, license number required, no 'FSBO' for licensees\n• Teams: must include last name of at least one member\n• Agency termination: performance, expiration, revocation, mutual agreement, broker death, property destruction, breach, operation of law\n• Death of salesperson does NOT terminate agency; death of broker DOES\n• NV Fair Housing adds: ancestry, sexual orientation, gender identity/expression",
      examAlerts: [
        { id: "tb-ea-u1-7-1", text: "Death of a SALESPERSON does NOT terminate the agency relationship—only death of the BROKER does.", type: "exam-trap" },
        { id: "tb-ea-u1-7-2", text: "A licensee selling their own property CANNOT use 'for sale by owner'—must use 'owner-agent' or 'broker-agent.'", type: "exam-alert" },
      ],
      knowledgeChecks: [
        { id: "tb-kc-u1-7-1", question: "Which event terminates an agency relationship?", options: ["Death of the salesperson", "Death of the broker", "The salesperson changing offices", "A client filing a complaint"], correctIndex: 1, explanation: "Death of the broker terminates the agency because all agency flows through the broker. Death of a salesperson does not terminate the agency." },
      ],
      discussionPrompt: "With the rise of real estate teams, should Nevada create specific regulations for team structures and advertising beyond current rules?",
      assignmentSuggestion: "List all methods of agency termination and provide a real-world example of each.",
      estimatedTime: "20 minutes",
      sourceTag: "Textbook",
      correctsTextbook: false,
      federalVsNevada: "both",
    },
  ];
}

export function getTextbookExamQuestions(): ExamQuestion[] {
  return [
    {
      id: "tb-eq-u1-01",
      topic: "Broker Liability",
      question: "A real estate broker is",
      options: [
        "liable for the conduct of associated licensees.",
        "only liable for the conduct of an associated licensee if the broker knows about the licensee's conduct.",
        "not liable for the conduct of associated licensees.",
        "only liable for his own conduct."
      ],
      correctIndex: 0,
      explanation: "The broker is responsible for all activities and the operation of the business. The broker is liable for the conduct of the employees and licensees (NAC 645.600).",
      wrongExplanations: [
        "Broker liability does not depend on knowledge—vicarious liability applies regardless.",
        "The broker IS liable for associated licensees' conduct through vicarious liability.",
        "The broker is liable for both personal conduct AND the conduct of associated licensees."
      ],
      difficulty: "basic",
      examTrap: false,
      tags: ["broker supervision", "liability", "NAC 645.600"],
      source: "Textbook",
    },
    {
      id: "tb-eq-u1-02",
      topic: "Broker Supervision",
      question: "A broker must supervise the activities of",
      options: [
        "all associated licensees and employees.",
        "only licensees retained as employees.",
        "only licensees retained as independent contractors.",
        "only associated licensees, not unlicensed employees."
      ],
      correctIndex: 0,
      explanation: "The broker is responsible for all office operations and must supervise all employees and independent contractors (NAC 645.600).",
      wrongExplanations: [
        "Supervision extends to ALL licensees, not just employees.",
        "Supervision extends to ALL licensees, not just independent contractors.",
        "Supervision covers both licensees AND unlicensed employees."
      ],
      difficulty: "basic",
      examTrap: false,
      tags: ["broker supervision", "NAC 645.600"],
      source: "Textbook",
    },
    {
      id: "tb-eq-u1-03",
      topic: "Broker Duties",
      question: "A broker's duty to supervise and manage includes",
      options: [
        "establishing policies and procedures.",
        "monitoring compliance with established policies and procedures.",
        "supervision of office employees.",
        "All of these."
      ],
      correctIndex: 3,
      explanation: "A broker must establish policies, monitor compliance with those policies, and supervise office employees (NAC 645.600).",
      wrongExplanations: [
        "This is correct but incomplete—monitoring and employee supervision are also required.",
        "This is correct but incomplete—establishing policies and employee supervision are also required.",
        "This is correct but incomplete—establishing policies and monitoring are also required."
      ],
      difficulty: "basic",
      examTrap: false,
      tags: ["broker supervision", "NAC 645.600"],
      source: "Textbook",
    },
    {
      id: "tb-eq-u1-04",
      topic: "Recordkeeping",
      question: "A broker must keep complete real estate transaction and property management records for at LEAST",
      options: ["one year.", "two years.", "three years.", "five years."],
      correctIndex: 3,
      explanation: "Transaction records must be kept by a broker for five years (NAC 645.650[1]).",
      wrongExplanations: [
        "One year is too short—the requirement is five years.",
        "Two years is too short—the requirement is five years.",
        "Three years is too short—the requirement is five years."
      ],
      difficulty: "basic",
      examTrap: false,
      tags: ["recordkeeping", "NAC 645.650"],
      source: "Textbook",
    },
    {
      id: "tb-eq-u1-05",
      topic: "Paperwork Submission",
      question: "A real estate salesperson must deliver to her broker all paperwork within how many days after the paperwork is executed by the parties?",
      options: ["One business day", "One calendar day", "Five business days", "Five calendar days"],
      correctIndex: 3,
      explanation: "By regulation, a salesperson must submit paperwork to the broker within five calendar days after the paperwork has been signed by the parties (NAC 645.650[2]).",
      wrongExplanations: [
        "One business day is the rule for turning over money, not paperwork.",
        "One calendar day is not the correct timeframe for paperwork submission.",
        "The requirement is five CALENDAR days, not five business days."
      ],
      difficulty: "intermediate",
      examTrap: true,
      examTrapNote: "Don't confuse 'business days' with 'calendar days'—paperwork is 5 calendar days; money is 1 business day.",
      tags: ["recordkeeping", "NAC 645.650", "deadlines"],
      source: "Textbook",
    },
    {
      id: "tb-eq-u1-06",
      topic: "Brokerage Agreements",
      question: "When entering into a brokerage agreement, salespeople are acting on",
      options: [
        "their own behalf, if they have been retained as independent contractors.",
        "behalf of their broker.",
        "their own behalf, regardless of whether they have been retained as independent contractors or employees.",
        "behalf of the office manager."
      ],
      correctIndex: 1,
      explanation: "A brokerage agreement is a contract between a client and a broker. A salesperson enters a brokerage agreement on behalf of the broker (NRS 645.005, NRS 645.035, and NRS 645.040).",
      wrongExplanations: [
        "IC status does not change the legal reality—salespeople always act on behalf of the broker.",
        "Regardless of employment status, salespeople act on behalf of the broker, not themselves.",
        "There is no legal concept of acting on behalf of an 'office manager' in brokerage agreements."
      ],
      difficulty: "intermediate",
      examTrap: false,
      tags: ["agency", "brokerage agreement", "NRS 645.005"],
      source: "Textbook",
    },
    {
      id: "tb-eq-u1-07",
      topic: "Salesperson Liability",
      question: "A salesperson is",
      options: [
        "not liable for her own conduct; only the broker is liable.",
        "liable for her own conduct.",
        "only liable for her own conduct if retained as an independent contractor.",
        "only liable for her own conduct if retained as an employee."
      ],
      correctIndex: 1,
      explanation: "A broker is liable for the conduct of associated licensees, but that does not relieve the licensees of liability for their own conduct.",
      wrongExplanations: [
        "Broker liability does not eliminate the salesperson's personal liability.",
        "Liability for own conduct applies regardless of IC or employee status.",
        "Liability for own conduct applies regardless of IC or employee status."
      ],
      difficulty: "basic",
      examTrap: false,
      tags: ["liability", "salesperson"],
      source: "Textbook",
    },
    {
      id: "tb-eq-u1-08",
      topic: "Assigned Agency",
      question: "Which of the following is NOT required in an assigned agency?",
      options: [
        "The Duties Owed by a Nevada Real Estate Licensee form",
        "A duty of confidentiality to the client",
        "A duty to disclose material facts concerning the transaction to a client",
        "The Consent to Act form"
      ],
      correctIndex: 3,
      explanation: "The Consent to Act form is required to create a dual agency (NRS 645.252) but is not required to create an assigned agency (NRS 645.253).",
      wrongExplanations: [
        "The Duties Owed form IS required in all transactions, including assigned agency.",
        "Confidentiality IS owed to clients in assigned agency under NRS 645.253.",
        "Material facts concerning the transaction MUST be disclosed to clients in assigned agency."
      ],
      difficulty: "intermediate",
      examTrap: true,
      examTrapNote: "Assigned agency avoids dual agency entirely—Consent to Act is only for dual agency.",
      tags: ["assigned agency", "Consent to Act", "NRS 645.253"],
      source: "Textbook",
    },
    {
      id: "tb-eq-u1-09",
      topic: "Personal Assistants",
      question: "In Nevada, a personal assistant retained by a real estate broker",
      options: [
        "must obtain a real estate license.",
        "is not required to have a real estate license.",
        "is subject to a special set of statutes and regulations that govern personal assistants.",
        "must obtain a real estate personal assistant license."
      ],
      correctIndex: 1,
      explanation: "A personal assistant may have, but is not required to have, a real estate license. Unlicensed assistants simply cannot perform activities requiring a license.",
      wrongExplanations: [
        "A license is optional—unlicensed assistants are permitted for non-licensed activities.",
        "No specific statutes or regulations govern personal assistants in Nevada.",
        "There is no such thing as a 'real estate personal assistant license' in Nevada."
      ],
      difficulty: "basic",
      examTrap: false,
      tags: ["personal assistants", "licensing"],
      source: "Textbook",
    },
    {
      id: "tb-eq-u1-10",
      topic: "Client vs. Customer Duties",
      question: "Which of the following correctly characterizes a difference between the duties owed by a Nevada real estate licensee to a client and the duties owed to someone the licensee does not represent?",
      options: [
        "A licensee owes a duty of confidentiality to a client but does not owe that duty to someone the licensee does not represent.",
        "A licensee owes a duty to disclose material facts relating to the property to a client but does not owe that duty to someone the licensee does not represent.",
        "A licensee owes a duty to disclose material facts concerning the transaction to someone the licensee does not represent but does not owe that duty to a client.",
        "A licensee owes a duty of skill and care to a client but does not owe that duty to someone the licensee does not represent."
      ],
      correctIndex: 0,
      explanation: "A licensee owes a duty of confidentiality to a client but not to a party he does not represent (NRS 645.254[2]).",
      wrongExplanations: [
        "Material facts relating to the property must be disclosed to ALL parties, not just clients.",
        "Transaction facts are owed to clients, not to non-clients—this answer has it backwards.",
        "Reasonable skill and care is owed to ALL parties under NRS 645.252."
      ],
      difficulty: "advanced",
      examTrap: true,
      examTrapNote: "This tests the property-facts-vs-transaction-facts distinction. Confidentiality is client-only; property facts go to everyone.",
      tags: ["duties", "NRS 645.252", "NRS 645.254", "confidentiality"],
      source: "Textbook",
    },
    {
      id: "tb-eq-u1-11",
      topic: "Stigmatized Property",
      question: "Kelly has listed a property that is being sold, in part, because a homicide occurred on the property. Kelly",
      options: [
        "is not legally required to disclose the homicide to potential buyers.",
        "is legally required to disclose the homicide to potential buyers.",
        "is not required to disclose the homicide if it occurred more than five years ago.",
        "must disclose the homicide to potential buyers if they specifically ask about any homicides on the property."
      ],
      correctIndex: 0,
      explanation: "In Nevada, the occurrence of a death on the property is not a material fact and is not required to be disclosed (NRS 40.770).",
      wrongExplanations: [
        "NRS 40.770 specifically exempts death on property from mandatory disclosure.",
        "There is no five-year rule—the exemption has no time limit.",
        "Even if asked directly, the statute provides the licensee is not liable for non-disclosure."
      ],
      difficulty: "intermediate",
      examTrap: false,
      tags: ["stigmatized property", "NRS 40.770", "disclosure"],
      source: "Textbook",
    },
    {
      id: "tb-eq-u1-12",
      topic: "Dual Agency",
      question: "In a properly created dual agency,",
      options: [
        "to maintain confidentiality, both clients must waive the duty of confidentiality.",
        "both clients must sign the Consent to Act form.",
        "both clients must sign an assigned agency form.",
        "permission is required from the Real Estate Division."
      ],
      correctIndex: 1,
      explanation: "A dual agency cannot be legally created unless both clients sign the Consent to Act form (NRS 645.252). There is no assigned agency form.",
      wrongExplanations: [
        "Clients do not waive confidentiality—it continues to apply in dual agency, creating a dilemma.",
        "There is no 'assigned agency form' in Nevada—assigned agency avoids dual agency entirely.",
        "The Real Estate Division does not need to grant permission for dual agency."
      ],
      difficulty: "intermediate",
      examTrap: false,
      tags: ["dual agency", "Consent to Act", "NRS 645.252"],
      source: "Textbook",
    },
    {
      id: "tb-eq-u1-13",
      topic: "Independent Contractor",
      question: "If certain conditions are met, a real estate salesperson can be conclusively presumed to be",
      options: ["an employee.", "an independent contractor.", "an independent employee.", "a supervised employee."],
      correctIndex: 1,
      explanation: "In 2015, Nevada enacted a statute with criteria that, if met, will conclusively presume a real estate salesperson to be classified as an independent contractor (NRS 608.0155).",
      wrongExplanations: [
        "The presumption is for IC status, not employee status.",
        "There is no legal classification called 'independent employee.'",
        "There is no legal classification called 'supervised employee.'"
      ],
      difficulty: "basic",
      examTrap: false,
      tags: ["independent contractor", "NRS 608.0155"],
      source: "Textbook",
    },
    {
      id: "tb-eq-u1-14",
      topic: "Disclosure Duties",
      question: "Broker Bob has a listing. The seller has told him that the roof leaks and the basement floods. Bob also discovered mold. The seller has disclosed financial problems. Which of the following is Bob NOT required to disclose to prospective buyers?",
      options: [
        "Leaking roof",
        "Seller's financial problems",
        "Flooding basement",
        "Mold Bob discovered"
      ],
      correctIndex: 1,
      explanation: "Bob must disclose facts relating to the property (NRS 645.252) but keep his client's financial condition confidential (NRS 645.254[2]). The seller's financial problems are a fact concerning the transaction, not relating to the property.",
      wrongExplanations: [
        "The leaking roof is a material fact relating to the property—must be disclosed to all parties.",
        "The flooding basement is a material fact relating to the property—must be disclosed to all parties.",
        "Mold discovered by the broker is a material fact relating to the property—must be disclosed to all parties."
      ],
      difficulty: "advanced",
      examTrap: true,
      examTrapNote: "This is the classic property-vs-transaction fact distinction. Physical defects = property facts (disclose to all). Financial motivation = transaction fact (client only, confidential).",
      tags: ["disclosure", "NRS 645.252", "NRS 645.254", "material facts"],
      source: "Textbook",
    },
    {
      id: "tb-eq-u1-15",
      topic: "Unlicensed Referral Fees",
      question: "Fatima, a licensed real estate salesperson, sent two concert tickets to an unlicensed friend with a note: 'Thanks for sending John to me. I got a listing.' This would probably be",
      options: [
        "legal because concert tickets are not compensation.",
        "legal because making a referral for compensation does not require a license.",
        "illegal because Fatima is not a broker.",
        "an illegal payment of compensation to an unlicensed person."
      ],
      correctIndex: 3,
      explanation: "The tickets have monetary value and are compensation. A licensed person cannot give a referral fee to an unlicensed person for activities requiring a license.",
      wrongExplanations: [
        "Concert tickets DO have monetary value and ARE considered compensation.",
        "Receiving compensation for a referral of real estate business DOES require a license.",
        "The issue is paying an unlicensed person, not whether Fatima is a broker or salesperson."
      ],
      difficulty: "intermediate",
      examTrap: true,
      examTrapNote: "Any item of value given as thanks for a referral = compensation to an unlicensed person. This includes gifts, tickets, gift cards, etc.",
      tags: ["compensation", "unlicensed activity", "referral fees"],
      source: "Textbook",
    },
  ];
}

export function getTextbookActivities(): Activity[] {
  return [
    {
      id: "tb-act-u1-1",
      title: "Agency Relationship Scenarios",
      type: "case-study",
      description: "Students receive 5 real-world scenarios involving different agency configurations (single, dual, assigned). For each scenario, students must: (1) identify the type of agency, (2) state which forms are required, (3) identify what duties the licensee owes to each party, and (4) flag any potential violations.",
      instructorNotes: "Use scenarios that blur lines—e.g., two salespersons from the same brokerage without a formal assignment (accidental dual agency). Emphasize that assigned agency can be office policy, not just case-by-case.",
      debriefPrompts: [
        "Which scenario was hardest to classify? Why?",
        "When would you recommend a brokerage adopt assigned agency as default office policy?",
        "How does the Consent to Act form protect both the licensee and the clients?",
      ],
      topic: "Agency Relationships",
      weekNumber: 1,
      tags: ["agency", "dual agency", "assigned agency", "forms", "NRS 645.252"],
    },
    {
      id: "tb-act-u1-2",
      title: "Duties Owed Form Walk-Through",
      type: "role-play",
      description: "In pairs, students role-play a licensee presenting the Duties Owed by a Nevada Real Estate Licensee form to: (Round 1) a new buyer client, and (Round 2) an unrepresented FSBO seller. Students must explain each of the five sections in plain language, addressing questions the 'client' or 'party' asks.",
      instructorNotes: "Provide a copy of the actual Duties Owed form. Have the 'client/party' ask deliberately tricky questions like 'Does this mean you work for me?' (for the FSBO) or 'So you'll keep everything I say secret forever?' (confidentiality is only 1 year). Grade on accuracy of explanations.",
      debriefPrompts: [
        "What was the most common misunderstanding the 'client' had about the form?",
        "How did your explanation change between a client and an unrepresented party?",
        "Why is the disclaimer 'This form does not constitute a contract for services' important?",
      ],
      topic: "Disclosure Forms",
      weekNumber: 1,
      tags: ["Duties Owed form", "disclosure", "role-play", "NRS 645.252", "NRS 645.254"],
    },
    {
      id: "tb-act-u1-3",
      title: "Property Facts vs. Transaction Facts Sorting Exercise",
      type: "case-study",
      description: "Students receive 15 fact cards (e.g., 'roof leaks,' 'seller is divorcing,' 'foundation crack,' 'buyer's max budget,' 'mold in basement,' 'seller needs to close by March'). Working in small groups, students sort each fact into: (A) Material fact relating to the property—disclose to ALL parties, (B) Material fact concerning the transaction—disclose only to CLIENT, or (C) Not a material fact/protected by NRS 40.770.",
      instructorNotes: "Include borderline cases to spark discussion. Make sure to include at least 2 stigmatized-property facts (NRS 40.770). After sorting, reveal correct answers and discuss the 'should have known' standard for property facts.",
      debriefPrompts: [
        "Which facts were hardest to categorize? What made them ambiguous?",
        "How does the 'should have known' standard change a licensee's obligations?",
        "If a buyer's agent discovers the seller is desperate, must that be disclosed to the buyer client?",
      ],
      topic: "Disclosure Duties",
      weekNumber: 1,
      tags: ["material facts", "disclosure", "NRS 645.252", "NRS 645.254", "NRS 40.770"],
    },
  ];
}
