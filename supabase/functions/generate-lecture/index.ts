import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const TOPIC_CONTENT: Record<string, {
  nrsRefs: string;
  keyTerms: string;
  conceptSummary: string;
  examAlerts: string;
  commonMistakes: string;
  practicalExamples: string;
  examQuestionSamples: string;
}> = {
  "Nevada Licensing Requirements (NRS 645, NAC 645)": {
    nrsRefs: "NRS 645.343 (salesperson: 90 hrs pre-licensing); NRS 645.330 (broker: 64 additional hrs + 2 yrs active experience); NRS 645.575–645.580 (disciplinary actions); NAC 645.440 (trust account requirements); NRS 645.633 (grounds for discipline); NRS 645.310 (earnest money handling); NRS 645.254 (document delivery within 5 days)",
    keyTerms: "Pre-licensing education (90 hrs salesperson / 64 additional hrs broker); Continuing education (24 hrs every 2 years); Trust account (separate account, no commingling); NRED (Nevada Real Estate Division); Broker supervision; Independent contractor vs. employee; Reciprocity",
    conceptSummary: "Nevada salesperson candidates must complete 90 hours of pre-licensing education, pass state and national exam portions, and be sponsored by a licensed broker. Brokers require 64 additional hours beyond salesperson requirements plus 2 years active experience. All licensees renew every 2 years with 24 hours CE. NRED enforces disciplinary actions including fines, suspension, and revocation. Commingling client funds with personal funds is always a violation regardless of duration or intent. Salespersons and broker-salespersons must deliver all original paperwork to their broker within 5 calendar days after contract execution.",
    examAlerts: "90 hrs pre-licensing (NOT 120 — common trap). CE = 24 hrs every 2 YEARS not annually. Commingling is ALWAYS a violation — even temporarily. Salesperson CANNOT operate independently — must be supervised. Trust account funds must NEVER be commingled. Reciprocity typically still requires Nevada-specific exam components.",
    commonMistakes: "Confusing 90-hr salesperson requirement with broker requirement; thinking temporary commingling is acceptable; assuming verbal agency agreement is sufficient; not knowing NRED can revoke, suspend, fine, AND require repayment of audit costs",
    practicalExamples: "A newly licensed salesperson receives an earnest money check and deposits it into their personal checking account planning to transfer it next day — this is commingling, a serious NRS 645.633 violation. A broker-salesperson designated as supervisor must be reported to NRED. An out-of-state licensee seeking Nevada reciprocity must still pass Nevada-specific exam components.",
    examQuestionSamples: "How many hours of pre-licensing education does Nevada require for a salesperson? (90 hrs) | Commingling of client funds is: (Always a violation under NRS 645.633) | Nevada CE requirement: (24 hours every 2 years) | What is required for a broker license in addition to education? (2 years active experience)",
  },
  "Nevada Real Estate Commission: Duties & Powers": {
    nrsRefs: "NRS 645.410–645.450 (NREC composition and powers); NRS 645.630–645.680 (disciplinary proceedings); NRS 645.575 (grounds for disciplinary action); NRS 119A (timeshares — NRED approval of public offering statement); NRS 645.190 (5-year record retention)",
    keyTerms: "Nevada Real Estate Commission (NREC — sets policy); Nevada Real Estate Division (NRED — enforces operations); Administrator; License revocation; License suspension; Administrative fine; Recovery Fund; Audit authority; Record retention (5 years within Nevada)",
    conceptSummary: "The NREC sets policy and rules; NRED enforces day-to-day operations. The Commission can suspend, revoke, deny renewal, impose administrative fines, and require repayment of audit costs — but NOT impose jail time (that is a criminal court function). NRED administrator must approve timeshare public offering statements. Brokers must cooperate with NRED audits during normal business hours. Transaction records must be maintained for 5 years within Nevada. Broker must notify the Division of exact storage location.",
    examAlerts: "Commission disciplines via fines/suspension/revocation — NOT jail time (courts do that). NRED administrator approves timeshare public offering statements (not 'Nevada Timeshare Commission'). Audit noncompliance: license revocation AND/OR court action AND/OR audit cost repayment. Records must stay WITHIN Nevada. Broker must notify Division of storage location.",
    commonMistakes: "Confusing NREC (policy) with NRED (enforcement); thinking the commission can impose jail time; not knowing the 5-year retention rule applies within Nevada borders; thinking records can be stored anywhere",
    practicalExamples: "Big Valley Brokerage audit reveals noncompliance — penalties can include broker license revocation, court action, and/or repayment of audit costs. A broker who shreds files after 3 years violates the 5-year retention rule. NRED schedules audit at 11am Thursday during normal business hours — broker must cooperate.",
    examQuestionSamples: "The commission may discipline licensees using all EXCEPT: (Jail time) | Audit noncompliance penalties include: (License revocation and/or court action and/or audit cost repayment) | Transaction files must be retained for: (5 years, within Nevada) | Who approves a timeshare public offering statement? (NRED administrator)",
  },
  "Agency Law & Fiduciary Duties": {
    nrsRefs: "NRS 645.252 (Duties Owed form at first substantive contact; dual agency written consent); NRS 645.253 (duties owed by broker to each party); NRS 645.254 (disclosure of agency relationship); NAC 645.605 (Duties Owed form requirements); NRS 40.770 (stigmatized property — no duty to disclose)",
    keyTerms: "Agency (fiduciary relationship); Fiduciary duties — LOCDAC: Loyalty, Obedience, Confidentiality, Disclosure, Accounting, Care; Dual agency (written consent from BOTH parties); Disclosed dual agency; Assigned agency; Buyer's agent; Seller's agent; Termination of agency; Procuring cause; Stigmatized property (no disclosure required)",
    conceptSummary: "Nevada agency is governed by NRS 645.252–645.254. The Duties Owed form must be presented at FIRST SUBSTANTIVE CONTACT — not at contract signing. Dual agency requires WRITTEN consent from BOTH parties — verbal is insufficient and undisclosed dual agency is always a violation regardless of whether harm occurs. Fiduciary duties (LOCDAC) apply to the principal (client); all parties are owed honesty and fair dealing. Agency can be created by express agreement, implied actions, or ratification. Confidentiality survives termination of agency. Stigmatized property (murder, suicide, paranormal) requires NO disclosure under NRS 40.770.",
    examAlerts: "Duties Owed form = FIRST SUBSTANTIVE CONTACT (not contract signing). Dual agency = WRITTEN consent from BOTH parties — verbal is never enough. Undisclosed dual agency = violation EVEN IF no harm occurs. Obedience = follow LAWFUL instructions only. Confidentiality SURVIVES end of agency. Stigmatized property = NO disclosure required (NRS 40.770).",
    commonMistakes: "Assuming agency requires a written agreement to exist (it can be implied); not presenting Duties Owed form before substantive discussion; confusing customer-level with client-level duties; thinking 'no harm, no foul' for undisclosed dual agency",
    practicalExamples: "Listing agent at open house — buyer discusses max budget. Agent still owes seller fiduciary duty and must disclose buyer's motivation. Agent representing both parties must get written consent from both before proceeding. Murder occurred at property 3 years ago — NO disclosure required under NRS 40.770.",
    examQuestionSamples: "When must the Duties Owed form be presented? (First substantive contact) | Dual agency requires: (Written consent from both parties) | Which fiduciary duty requires following the principal's lawful instructions? (Obedience) | Undisclosed dual agency is a violation: (Even if no harm occurs)",
  },
  "Property Disclosures (NRS 113, NRS 645)": {
    nrsRefs: "NRS 113.130 (SRPD required for residential 1-4 units); NRS 113.150 (buyer's right to rescind for late SRPD); NRS 645.252 (licensee disclosure duties); NRS 40.770 (stigmatized property — no duty to disclose); NRS 113.065 (CIC/HOA disclosures)",
    keyTerms: "SRPD (Seller's Real Property Disclosure); Material fact (affects reasonable person's decision); Stigmatized property; CIC (Common Interest Community); HOA disclosure; Licensee as principal (must disclose license status); Latent defect (hidden); Patent defect (visible); Caveat emptor (buyer beware — NOT Nevada law)",
    conceptSummary: "Nevada requires sellers of residential 1-4 unit properties to complete the SRPD under NRS 113.130. Buyers may rescind if SRPD is delivered late. Licensees must disclose ALL material facts — client instructions to hide defects must be refused. Stigmatized property (murder, suicide, paranormal) does NOT require disclosure under NRS 40.770. CIC/HOA properties require additional disclosures. Nevada does NOT follow caveat emptor. When a licensee sells their own property, they must disclose their license status.",
    examAlerts: "SRPD required for 1-4 unit residential ONLY (not commercial, vacant land, or new construction). Stigmatized property = NO disclosure required. Licensee CANNOT follow client instructions to conceal material facts. Late SRPD = buyer may rescind. Licensee selling own property MUST disclose license status. Nevada DOES NOT follow caveat emptor.",
    commonMistakes: "Thinking stigmatized property must be disclosed; confusing latent vs. patent defects; not knowing buyer's rescission right for late SRPD; assuming SRPD applies to all property types",
    practicalExamples: "Seller tells agent not to disclose the leaking roof — agent MUST disclose regardless of client instructions. Property where a murder occurred — NO disclosure required. Agent selling their own investment condo must disclose license status in advertising. CIC buyer must receive HOA financials, CC&Rs, and meeting minutes.",
    examQuestionSamples: "Must a licensee disclose that a homicide occurred on a property? (No — NRS 40.770) | When can a buyer rescind based on the SRPD? (When delivered late) | Which disclosure is required for residential 1-4 unit sales? (SRPD — NRS 113.130) | Can an agent follow seller's instructions not to disclose a material defect? (No — must disclose all material facts)",
  },
  "Contracts: Listing, Purchase & Lease Agreements": {
    nrsRefs: "NRS 111.205 (Statute of Frauds — real estate contracts must be in writing); NRS 645.310 (earnest money — promptly to broker); NRS 645.254 (document delivery within 5 days); NRS 645.310 (advance fee accounting within 3 months); NRS 645.252 (brokerage agreement duties)",
    keyTerms: "Statute of Frauds (real estate contracts must be written); Purchase agreement; Listing agreement types (exclusive right to sell, exclusive agency, open, net listing); Buyer representation agreement; Earnest money (to broker promptly); Contingency (financing, inspection, appraisal); Counter-offer (TERMINATES original offer); Specific performance; Advance fees (accounting within 3 months); Bilateral contract; Executed vs. executory",
    conceptSummary: "Real estate contracts must be in WRITING under NRS 111.205. Valid contracts require: competent parties, offer and acceptance, consideration, legal purpose, written form. A counter-offer TERMINATES the original offer — cannot later be accepted. Earnest money goes to broker's trust account PROMPTLY. Exclusive representation prohibits other licensees from approaching the client. Net listings are legal in Nevada but ethically problematic. Advance fee licensees must account for funds within 3 months. Real estate sales contracts must be enforceable, express, valid, bilateral, and executed or executory.",
    examAlerts: "Counter-offer TERMINATES original offer — top exam trap. Earnest money → broker PROMPTLY (not to seller or escrow directly). Statute of Frauds = WRITTEN contracts for real estate. Brokerage agreement copy must be delivered AS SOON AS SIGNED. Original paperwork to broker within 5 CALENDAR DAYS. Advance fee accounting = 3 months (not 30 days, not 60 days).",
    commonMistakes: "Believing verbal real estate agreements are enforceable; thinking original offer survives a counter-offer; confusing earnest money with down payment; not knowing advance fee accounting deadline is 3 months",
    practicalExamples: "Buyer submits offer, seller counter-offers — buyer cannot accept original offer. Agent receives earnest money check — must immediately deliver to broker. Agent charges advance fee for marketing — must provide accounting within 3 months. Agent delivers brokerage agreement copy at contract signing — violation (should be AS SOON AS SIGNED).",
    examQuestionSamples: "When a seller makes a counter-offer, the original offer is: (Terminated) | Earnest money must be: (Given to the licensee's broker promptly) | Advance fee accounting is required within: (Three months) | Real estate contracts must be: (In writing — Statute of Frauds)",
  },
  "Leasing & Property Management": {
    nrsRefs: "NRS 645.230 (property management license required); NRS 118A (Nevada landlord-tenant law); NRS 40.251–40.280 (summary eviction); NRS 645.310 (separate trust accounts for PM); NRS 118A.240 (security deposit limits and return)",
    keyTerms: "Property management agreement; Gross lease; Net lease (single/double/triple net); Percentage lease; Security deposit; Summary eviction (Nevada NRS 40 process); Trust accounts (rents account + security deposits account = separate); Custodial client account (NOT a trust account — client owns it); PM fee structures; Landlord obligations; Tenant rights",
    conceptSummary: "Nevada property management requires a real estate license under NRS 645.230. Brokers handling BOTH property management AND sales must maintain THREE separate trust accounts: one for rents, one for security deposits, and one for sales/earnest money. A custodial client account is NOT a trust fund — the client owns it and both client and broker can withdraw. PM fees are negotiable and not set by statute. Nevada's summary eviction process under NRS 40 gives tenants specific notice and response rights.",
    examAlerts: "Property manager = real estate license required. Three separate trust accounts when doing both PM and sales. Custodial client account is NOT a trust account — client owns it. Rents and security deposits MUST be in separate accounts. Summary eviction timeline — know the NRS 40 notice periods. PM compensation is ALWAYS negotiable.",
    commonMistakes: "Thinking one trust account covers all transaction types; confusing custodial client account with trust account; not knowing Nevada requires separate accounts for rents vs. security deposits vs. sales",
    practicalExamples: "Jeremy the broker handles sales AND property management — needs 3 trust accounts: rents, security deposits, sales earnest money. Property manager collects rent — goes into rents trust account (not broker's personal account). Tenant hasn't paid rent — Nevada NRS 40 summary eviction begins with proper written notice.",
    examQuestionSamples: "A broker doing both PM and sales needs how many trust accounts? (Three) | A custodial client account: (Holds client funds — not a trust account, client owns it) | Property management in Nevada requires: (A real estate license under NRS 645.230) | Rents and security deposits must be: (Held in separate trust accounts)",
  },
  "Real Estate Financing & Lending": {
    nrsRefs: "12 U.S.C. §2601–2617 (RESPA); 15 U.S.C. §1601–1667 (TILA/Regulation Z); 12 CFR §1026.19 (TRID — Loan Estimate 3 biz days of application; Closing Disclosure 3 biz days before closing); NRS 645B (Nevada Mortgage Lending); NRS 645E (Nevada Mortgage Brokers)",
    keyTerms: "RESPA (Real Estate Settlement Procedures Act — prohibits kickbacks); TILA (Truth in Lending Act — APR disclosure, 3-day rescission for REFINANCES ONLY); TRID (TILA-RESPA Integrated Disclosure); Loan Estimate (3 business days of application); Closing Disclosure (3 business days before closing); APR; PMI (protects LENDER — not borrower); LTV; FHA (3.5% min down); VA (0% down + funding fee); Conventional; Secondary market (Fannie Mae, Freddie Mac, Ginnie Mae); Amortization; Points; Usury",
    conceptSummary: "RESPA requires the Loan Estimate within 3 business days of application and prohibits kickbacks. TILA requires APR disclosure and provides a 3-day right of rescission for REFINANCES ONLY — NOT purchase transactions. PMI protects the LENDER (not the borrower) and is required when LTV exceeds 80% on conventional loans. FHA minimum down payment is 3.5%. VA loans require 0% down but have a funding fee. The secondary market provides liquidity. Nevada mortgage brokers regulated under NRS 645B and 645E.",
    examAlerts: "TILA 3-day rescission = REFINANCES ONLY, NOT purchases (top exam trap nationally). PMI protects the LENDER not the borrower — students pay it but it protects the bank. Loan Estimate = 3 biz days after APPLICATION. Closing Disclosure = 3 biz days BEFORE closing. FHA = 3.5% down. VA = 0% down but still has funding fee.",
    commonMistakes: "Thinking TILA rescission applies to purchase transactions; confusing PMI with homeowner's insurance; mixing up Loan Estimate vs. Closing Disclosure timelines; assuming VA loans have zero costs",
    practicalExamples: "First-time buyer qualifies for FHA with 3.5% down — explain upfront MIP (1.75%) and annual MIP. Homeowner refinances — has 3-day right of rescission. Conventional buyer putting 10% down — lender requires PMI. Closing Disclosure sent 4 business days before closing — compliant with TRID.",
    examQuestionSamples: "TILA's 3-day right of rescission applies to: (Refinance transactions only) | PMI protects: (The lender) | The Loan Estimate must be provided within: (3 business days of application) | FHA minimum down payment is: (3.5%)",
  },
  "Valuation & Market Analysis (CMA & Appraisal)": {
    nrsRefs: "NRS 645C (Appraiser licensing and regulation); NAC 645C (Appraisal regulations); USPAP (Uniform Standards of Professional Appraisal Practice); NRS 645.252 (BPO rules — fee allowed, NOT for mortgage approval)",
    keyTerms: "Appraisal (by licensed/certified appraiser — USPAP); CMA (Comparative Market Analysis — by licensees, NOT an appraisal); BPO (Broker Price Opinion — fee allowed, never for mortgage); Sales comparison approach (most common residential); Cost approach (new construction/special use); Income approach (investment — NOI ÷ Cap Rate = Value); GRM (Gross Rent Multiplier); Depreciation (physical, functional, external/economic); Highest and best use; Subject property; Comparable (comp); Market value vs. market price",
    conceptSummary: "Three approaches to value: Sales Comparison (most common residential), Cost Approach (new/special use), Income Approach (investment). CMAs are by licensees — NOT appraisals, CANNOT be used for mortgage lending. BPOs can be performed by any active Nevada licensee in good standing for a fee, but NEVER for mortgage loan approval. Appraisers are separately licensed under NRS 645C and must follow USPAP. Highest and best use must be legally permissible, physically possible, financially feasible, and maximally productive. External obsolescence is always incurable.",
    examAlerts: "BPO = allowed for fee by active licensee BUT never for mortgage loan approval. CMA ≠ appraisal — cannot be used for loan approval. Appraisers licensed SEPARATELY under NRS 645C. External obsolescence = always INCURABLE. Income approach: NOI ÷ Cap Rate = Value. Highest and best use = 4 criteria (legal, physical, financial, maximum productivity).",
    commonMistakes: "Thinking licensees can perform appraisals (they cannot); confusing CMA with appraisal; not knowing BPO cannot be used for mortgage; forgetting external obsolescence is always incurable",
    practicalExamples: "Agent prepares CMA showing comparable sales for seller pricing — NOT an appraisal. Salesperson issues written BPO for relocation company — legal, can charge fee, cannot be used for mortgage. Appraiser values rental property: NOI $50,000 ÷ 5% cap rate = $1,000,000 value. Property near new highway (external obsolescence) — value reduced, always incurable.",
    examQuestionSamples: "A Nevada licensee may perform a BPO for a fee: (Yes, as long as not for mortgage loan approval) | Most common approach for residential property: (Sales comparison) | External obsolescence is: (Always incurable) | A CMA performed by a licensee: (Is not an appraisal and cannot be used for mortgage approval)",
  },
  "Property Ownership & Transfer": {
    nrsRefs: "NRS 111.310–111.345 (Deeds and conveyances); NRS 111.325 (Race-notice recording statute); NRS 123.220 (Community property — default for married couples); NRS 115 (Homestead exemption — up to $605,000 equity); NRS 40.010 (Adverse possession — 5 years); NRS 111.315 (Recording requirements)",
    keyTerms: "General warranty deed (most protection — all claims); Special warranty deed (grantor's period only); Grant deed; Bargain and sale deed; Quitclaim deed (no warranties — least protection); Community property (married couples, default Nevada); Joint tenancy (TTIP + right of survivorship); Tenancy in common; Homestead exemption ($605,000); Adverse possession (5 years — ONHCA: open, notorious, hostile, continuous, actual); Race-notice recording statute; Constructive notice (recording); Inquiry notice (actual possession); Escheat; Intestate succession",
    conceptSummary: "Nevada is a RACE-NOTICE recording state — first bona fide purchaser to record without notice of prior claims prevails. A deed is effective upon DELIVERY AND ACCEPTANCE — not recording. Recording provides constructive notice only. Community property is the default for married couples (NRS 123.220). Joint tenancy requires TTIP (same Time, Title, Interest, Possession) with right of survivorship. Quitclaim deeds transfer whatever interest exists with NO warranties. Homestead exemption protects up to $605,000 in equity. Adverse possession requires 5 years of open, notorious, hostile, continuous, actual use in Nevada.",
    examAlerts: "Nevada = RACE-NOTICE (not pure race, not pure notice). Deed valid upon DELIVERY AND ACCEPTANCE — not recording. Recording = constructive notice ONLY. Community property = married couples ONLY (not all co-owners). Quitclaim = NO warranties. Homestead = $605,000 equity protection. Adverse possession = 5 years. Escheat = property goes to state when owner dies intestate with no heirs.",
    commonMistakes: "Confusing race-notice with pure race or pure notice; thinking recording makes a deed valid; assuming community property automatically includes survivorship; confusing joint tenancy with tenancy in common",
    practicalExamples: "Couple delays recording — seller fraudulently sells to second buyer who records immediately without knowledge of prior sale — second buyer prevails under race-notice. Married couple buys home — community property by default. Neighbor uses your vacant lot openly for 5+ years — adverse possession possible. Owner dies intestate with no heirs — property escheats to Nevada.",
    examQuestionSamples: "Nevada's recording statute is: (Race-notice) | A deed becomes legally effective when: (Delivered and accepted) | Community property in Nevada applies to: (Married couples) | Which deed provides LEAST protection? (Quitclaim deed)",
  },
  "Land Use Controls & Regulations": {
    nrsRefs: "NRS 278 (Planning and zoning authority); NRS 540A (water conservation and conservation easements); NRS 533 (Prior appropriation water rights); NRS 533.040 (appurtenant water rights — silently conveyed with land); NRS 244.3675 (county zoning authority)",
    keyTerms: "Zoning (government use restrictions — police power); Variance (exception to zoning); Conditional use permit; Nonconforming use (predates zoning); Eminent domain (government takes for public use — must pay just compensation); Police power (no compensation); Deed restriction/CC&R (runs with land); Conservation easement (restricts use — homeowner gets rebate); Easement appurtenant (runs with land); Prior appropriation (Nevada water system); Prescriptive easement (use rights through adverse use)",
    conceptSummary: "Nevada uses PRIOR APPROPRIATION for water rights — beneficial use, first in time. Appurtenant water rights transfer automatically (silently) with land sale. Conservation easements restrict land use for water conservation — homeowner receives monetary rebate and easement runs with land. Deed restrictions (CC&Rs) bind all future owners. Eminent domain requires just compensation. Police power (zoning) requires no compensation. When CC&Rs conflict with zoning, whichever is MORE RESTRICTIVE prevails.",
    examAlerts: "Nevada = PRIOR APPROPRIATION (not riparian — Eastern states use riparian). Appurtenant water right silently conveyed with land — no separate mention needed in deed. Conservation easement = runs with land, homeowner gets rebate. Eminent domain = MUST pay just compensation. CC&Rs vs. zoning = MORE RESTRICTIVE prevails. Prescriptive easement ≠ adverse possession (no exclusivity required).",
    commonMistakes: "Confusing riparian (Eastern states) with prior appropriation (Nevada/West); not knowing appurtenant rights transfer automatically; confusing eminent domain (compensation) with police power (no compensation)",
    practicalExamples: "Cooper sells land with appurtenant water right — water right automatically transfers to buyer without mention in deed. Henderson homeowner grants conservation easement — new buyer must maintain xeriscape (runs with land). City takes private land for highway — must pay just compensation. HOA's CC&Rs prohibit STRs even if city zoning allows them — CC&Rs prevail (more restrictive).",
    examQuestionSamples: "Nevada primarily uses which water rights system? (Prior appropriation) | An appurtenant water right when land is sold is: (Silently conveyed to new owner) | A conservation easement: (Runs with land — homeowner receives rebate) | When CC&Rs conflict with zoning, which prevails? (Whichever is more restrictive)",
  },
  "Fair Housing (Federal & Nevada)": {
    nrsRefs: "42 U.S.C. §3601–3619 (Federal Fair Housing Act — 7 protected classes); NRS 118.010–118.120 (Nevada Fair Housing); NRS 118.020 (Nevada protected classes — adds sexual orientation, gender identity, ancestry); NRS 118.100 (Penalties)",
    keyTerms: "7 Federal protected classes: race, color, religion, sex, national origin, familial status, disability; Nevada adds: sexual orientation, gender identity/expression, ancestry; Steering; Blockbusting; Redlining; Reasonable accommodation (policy change for disability); Reasonable modification (physical change for disability); Mrs. Murphy exemption (owner-occupied ≤4 units, NO agent); Disparate impact; Discriminatory advertising",
    conceptSummary: "Federal Fair Housing Act (1968, amended 1988) protects 7 classes. Nevada adds sexual orientation, gender identity/expression, and ancestry. When a real estate licensee is involved, ALL fair housing exemptions are eliminated — including Mrs. Murphy. Steering, blockbusting, and redlining are always illegal regardless of intent. Reasonable accommodation = change in rules/policies. Reasonable modification = physical change to property. Advertising only in narrow-reach publications without also using broad-market publications can be a fair housing violation.",
    examAlerts: "Licensee involvement ELIMINATES ALL exemptions including Mrs. Murphy. Nevada protects MORE classes than federal (sexual orientation, gender identity, ancestry). Steering = always illegal regardless of intent or outcome. Reasonable accommodation = policy change; modification = physical change. Religious pub ads OK ONLY IF also advertising broadly.",
    commonMistakes: "Thinking Mrs. Murphy exemption applies when a licensee is involved; not knowing Nevada's additional protected classes; confusing reasonable accommodation with reasonable modification; thinking good intent is a defense",
    practicalExamples: "PM tells family with children complex is 'for professionals' — familial status steering violation. Agent shows minority buyers only in certain neighborhoods — steering violation. Shari places listing ad only in religious magazine — potential fair housing violation unless also advertising broadly. Tenant with disability requests grab bars — reasonable modification (physical change).",
    examQuestionSamples: "Protected class under Nevada law but NOT federal: (Sexual orientation) | When a licensee is involved, fair housing exemptions are: (Eliminated entirely) | Steering is: (Directing prospects toward/away from neighborhoods based on protected class) | Advertising only in a religious publication: (Potential violation unless also in broader publications)",
  },
  "Closing Procedures & Settlement Statements": {
    nrsRefs: "NRS 645A (Escrow agents — must be licensed); NRS 692A.117 (Title insurance); 12 CFR §1026.19 (TRID — Closing Disclosure 3 biz days before closing); NRS 645.254 (closing statement delivery within 10 days if no escrow agent used)",
    keyTerms: "Closing Disclosure (3 business days before closing — TRID); Proration (divide expenses by day of ownership); Escrow agent (neutral third party — licensed NRS 645A); Title insurance (lender's policy vs. owner's policy); TRID (TILA-RESPA Integrated Disclosure); Debit/Credit (buyer vs. seller columns); Prepaid items vs. items in arrears; 365-day year (Nevada standard); Transfer tax; Recording fees",
    conceptSummary: "Nevada closings are handled by licensed escrow/title companies (NRS 645A). Closing Disclosure must be provided at least 3 BUSINESS DAYS before closing. Nevada uses a 365-day year for proration calculations. Day of closing typically belongs to the BUYER. Prepaid taxes = buyer credits seller. Taxes in arrears = seller credits buyer. If no escrow company is used, licensee must deliver closing statement within 10 DAYS (calendar, not business days) after closing.",
    examAlerts: "Closing Disclosure = 3 BUSINESS DAYS before closing (not calendar days). Nevada prorations = 365-day year (NOT 360). Day of closing = BUYER'S. Prepaid taxes = credit to SELLER. Taxes in arrears = credit to BUYER. Closing statement to clients within 10 DAYS (calendar) if no escrow used. Escrow agents must be licensed — NRS 645A.",
    commonMistakes: "Using 360-day year for prorations; crediting the wrong party; forgetting day of closing belongs to buyer; confusing 10 days vs. 10 business days for closing statement delivery",
    practicalExamples: "Property closes March 15. Annual taxes $3,650 prepaid. Daily rate: $10/day. Buyer owns from March 15 (292 days). Buyer credits seller: $2,920. Gloria delivers closing statements on day 8 — within 10 days, no violation. Closing Disclosure sent 4 business days before closing — compliant.",
    examQuestionSamples: "Closing Disclosure must be provided at least: (3 business days before closing) | Nevada prorations use: (365-day year) | Prepaid taxes at closing: (Buyer credits seller for unused portion) | Closing statement without escrow must be delivered within: (10 days after closing)",
  },
  "Nevada Brokerage Operations": {
    nrsRefs: "NRS 645.310 (trust account requirements — commingling prohibited); NRS 645.633 (commingling and conversion grounds for discipline); NRS 645.380 (branch office requirements); NRS 645.230 (broker license required)",
    keyTerms: "Trust account (separate — client funds only); Commingling (mixing client and personal funds — always a violation); Conversion (using client funds personally — criminal offense); Broker supervision; Broker-salesperson supervisor (must notify NRED); Team rules (2+ members, same broker, name includes member's last name); Commission negotiability (always — never fixed by law); For Sale by Owner-Salesperson/Broker (licensee selling own property disclosure); Policies and procedures manual",
    conceptSummary: "Brokers must maintain trust accounts in their name or company name within Nevada. Commingling is always a disciplinary violation; conversion is criminal. Written P&P manuals are required but do NOT automatically protect broker from liability — must prove adequate training and monitoring. Broker-salesperson designated as supervisor must be reported to NRED. Teams need minimum 2 people under same broker; name must include a member's last name. Compensation is ALWAYS negotiable. Licensees selling own property must disclose their license status.",
    examAlerts: "Commingling = ALWAYS a violation (even briefly). Conversion = criminal offense. Written P&P manual does NOT eliminate broker liability — must prove training. Team name MUST include a member's last name. Licensee selling own property MUST disclose license status. Compensation is ALWAYS negotiable — never fixed by law or jurisdiction.",
    commonMistakes: "Thinking written P&P manual protects broker from all liability; not knowing team name rules; confusing commingling (administrative violation) with conversion (criminal); assuming commission rates are set by law",
    practicalExamples: "Winston Group — Kevin Winston's team with Beth and Scott. Legal — includes team member's last name, 2+ people, same broker. Malcolm has P&P manual but doesn't train licensees — still liable when licensee violates law. Tina the salesperson sells her own home — must advertise as 'For Sale by Owner-Salesperson.' Any commission rate agreed between broker and client is legal.",
    examQuestionSamples: "The amount of a broker's commission is: (Negotiable between agent and client) | A team name must: (Include the last name of one team member) | A salesperson selling their own property must advertise as: (For Sale by Owner-Salesperson) | Commingling of client funds is: (Always a violation regardless of duration)",
  },
  "Ethics & Professional Conduct": {
    nrsRefs: "NRS 645.633 (grounds for discipline including ethical violations); NRS 645.841 (Recovery Fund — compensates victims); NAC 645 (professional conduct standards); NRS 645.310 (referral fees must go through broker)",
    keyTerms: "Fiduciary duty; Confidentiality (survives agency termination); Material fact disclosure; Conflict of interest; Net listing (legal in Nevada — but ethically problematic); Advance fees; Referral fees (must go through broker); Recovery Fund (compensates victims after legal remedies exhausted); Unlicensed activity; Professional misconduct",
    conceptSummary: "Professional ethics in Nevada are governed by NRS 645. Confidentiality survives the end of agency. Net listings are legal in Nevada but widely considered ethically problematic because they create a conflict of interest between agent's profit and client's best interests. Referral fees must flow through the broker — cannot be paid directly to salesperson. Advance fees require accounting within 3 months. Nevada Recovery Fund compensates victims of licensee fraud or conversion when the licensee cannot pay — requires exhausting legal remedies first.",
    examAlerts: "Net listing = LEGAL in Nevada but ethically problematic (conflict of interest). Confidentiality duty SURVIVES end of agency. Recovery Fund available AFTER exhausting legal remedies against licensee. Referral fees must go through broker. Licensee role = educate/advise, NOT steer or influence client's decision.",
    commonMistakes: "Thinking net listings are illegal in Nevada (they're legal but ethically questionable); not knowing confidentiality survives agency termination; confusing Recovery Fund eligibility (must exhaust legal remedies first)",
    practicalExamples: "Seller wants net listing at $450k — agent benefits from everything above that amount. Legal but creates conflict where agent may not act in seller's best interest. Former client tells agent about motivation for prior transaction — agent must maintain confidentiality. Victim of licensee fraud recovers judgment but licensee can't pay — Recovery Fund available after exhausting legal remedies.",
    examQuestionSamples: "Net listings in Nevada are: (Legal but considered ethically problematic) | The duty of confidentiality: (Survives the end of the agency relationship) | The Nevada Recovery Fund: (Compensates victims after exhausting legal remedies) | A licensee presenting offers should: (Educate and advise — not steer the client)",
  },
  "Special Topics: Water Rights, Solar Easements, Timeshares & Subdivisions": {
    nrsRefs: "NRS 533 (Prior appropriation water rights); NRS 533.040 (appurtenant water rights — silently conveyed with land); NRS 704 (Nevada Public Utility Commission — regulates solar energy systems); NRS 119A (Timeshares — 5-day cancellation period; NRED administrator approves public offering statement); NRS 119 (Subdivisions — property report required before selling lots); Interstate Land Sales Full Disclosure Act (federal — protects against fraudulent interstate sales)",
    keyTerms: "Prior appropriation (Nevada water — first in time, first in right, beneficial use); Appurtenant water right (runs with land — silently conveyed on sale); Conservation easement (restricts use, homeowner gets rebate); Timeshare (5-day cancellation period before closing); Public offering statement (NRED administrator must approve); Property report (required before selling subdivided land — NRS 119); Interstate Land Sales Full Disclosure Act; Nevada Public Utility Commission (regulates solar); Photovoltaic (PV) system; Passive solar; Solar thermal; CSP (industrial use only — NOT residential)",
    conceptSummary: "Nevada uses prior appropriation for water — beneficial use, first in time. Appurtenant water rights transfer automatically with land. Conservation easements restrict land use for water conservation — homeowner receives rebate, easement runs with land. Timeshare purchasers have 5-day cancellation period before closing. NRED administrator must approve timeshare public offering statements — NOT a 'Nevada Timeshare Commission' (that entity doesn't exist). Subdivided land requires property report from NRED before lots can be sold. Interstate Land Sales Full Disclosure Act protects buyers from fraudulent out-of-state land sales. Nevada Public Utility Commission (not Dept of Energy Conservation) regulates solar.",
    examAlerts: "Timeshare cancellation = 5 CALENDAR DAYS before closing (not 3, not 7). NRED administrator approves timeshare public offering statement (NOT 'Nevada Timeshare Commission' — trap). Nevada water = PRIOR APPROPRIATION. Solar regulated by NEVADA PUBLIC UTILITY COMMISSION (not Dept of Energy Conservation). Property report required BEFORE selling subdivided lots. Interstate Land Sales Full Disclosure Act = federal consumer protection for interstate fraud.",
    commonMistakes: "Confusing 5-day timeshare cancellation with other periods; selecting 'Nevada Timeshare Commission' as approving body (it's NRED administrator); confusing riparian vs. prior appropriation; not knowing solar is regulated by NPUC",
    practicalExamples: "Mark signs timeshare on Wednesday — 5 days expire Monday, earliest closing is Tuesday. Sam Sketchy markets desert lots as lakefront to out-of-state buyers — Interstate Land Sales Full Disclosure Act provides protection. John creates planned community near Carson City — must get property report from NRED before selling lots. Cooper sells land with appurtenant water right — automatically transfers to buyer.",
    examQuestionSamples: "Nevada timeshare cancellation period is: (5 days before closing) | Who approves a timeshare public offering statement? (NRED administrator) | What protects buyers from fraudulent interstate land sales? (Interstate Land Sales Full Disclosure Act) | Nevada solar energy systems are regulated by: (Nevada Public Utility Commission)",
  },
};

const DEFAULT_CONTENT = {
  nrsRefs: "Refer to NRS 645 (general licensing), NRS 113 (disclosures), and applicable federal statutes",
  keyTerms: "Review course materials for key terms specific to this topic",
  conceptSummary: "Cover core principles, Nevada-specific rules, and practical applications",
  examAlerts: "Focus on Nevada-specific rules that differ from national standards",
  commonMistakes: "Review areas where students commonly confuse Nevada law with general principles",
  practicalExamples: "Use real Nevada transaction scenarios to illustrate concepts",
  examQuestionSamples: "Review Pearson VUE content outline for exam-weighted topics in this area",
};

// Fetch live NRS statute text for a topic
async function fetchNRSContent(topics: string[]): Promise<string> {
  const NRS_URLS: Record<string, string[]> = {
    "Nevada Licensing Requirements (NRS 645, NAC 645)": [
      "https://www.leg.state.nv.us/nrs/nrs-645.html"
    ],
    "Nevada Real Estate Commission: Duties & Powers": [
      "https://www.leg.state.nv.us/nrs/nrs-645.html"
    ],
    "Agency Law & Fiduciary Duties": [
      "https://www.leg.state.nv.us/nrs/nrs-645.html"
    ],
    "Property Disclosures (NRS 113, NRS 645)": [
      "https://www.leg.state.nv.us/nrs/nrs-113.html"
    ],
    "Contracts: Listing, Purchase & Lease Agreements": [
      "https://www.leg.state.nv.us/nrs/nrs-111.html",
      "https://www.leg.state.nv.us/nrs/nrs-645.html"
    ],
    "Leasing & Property Management": [
      "https://www.leg.state.nv.us/nrs/nrs-118a.html"
    ],
    "Real Estate Financing & Lending": [
      "https://www.leg.state.nv.us/nrs/nrs-645b.html"
    ],
    "Valuation & Market Analysis (CMA & Appraisal)": [
      "https://www.leg.state.nv.us/nrs/nrs-645c.html"
    ],
    "Property Ownership & Transfer": [
      "https://www.leg.state.nv.us/nrs/nrs-111.html",
      "https://www.leg.state.nv.us/nrs/nrs-115.html"
    ],
    "Land Use Controls & Regulations": [
      "https://www.leg.state.nv.us/nrs/nrs-278.html",
      "https://www.leg.state.nv.us/nrs/nrs-533.html"
    ],
    "Fair Housing (Federal & Nevada)": [
      "https://www.leg.state.nv.us/nrs/nrs-118.html"
    ],
    "Closing Procedures & Settlement Statements": [
      "https://www.leg.state.nv.us/nrs/nrs-645a.html"
    ],
    "Nevada Brokerage Operations": [
      "https://www.leg.state.nv.us/nrs/nrs-645.html"
    ],
    "Ethics & Professional Conduct": [
      "https://www.leg.state.nv.us/nrs/nrs-645.html"
    ],
    "Special Topics: Water Rights, Solar Easements, Timeshares & Subdivisions": [
      "https://www.leg.state.nv.us/nrs/nrs-533.html",
      "https://www.leg.state.nv.us/nrs/nrs-119a.html",
      "https://www.leg.state.nv.us/nrs/nrs-119.html"
    ],
  };

  const urlsToFetch = new Set<string>();
  for (const topic of topics) {
    const urls = NRS_URLS[topic] || [];
    for (const url of urls) urlsToFetch.add(url);
  }

  if (urlsToFetch.size === 0) return "";

  const results = await Promise.allSettled(
    Array.from(urlsToFetch).map(async (url) => {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; RE103-LectureGenerator/1.0)" },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) return `[Could not fetch ${url}]`;
      const html = await res.text();
      const text = html
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 8000);
      return `=== SOURCE: ${url} ===\n${text}`;
    })
  );

  const fetched = results
    .filter((r) => r.status === "fulfilled")
    .map((r) => (r as PromiseFulfilledResult<string>).value)
    .join("\n\n");

  return fetched
    ? `\n\n## LIVE NRS STATUTE TEXT (fetched at generation time — use this as ground truth for all NRS citations):\n${fetched}\n`
    : "";
}

const SYSTEM_PROMPT = `You are Nathanial Miller, a Nevada real estate instructor at Truckee Meadows Community College (TMCC) teaching RE 103 — Principles of Real Estate. You have a direct, practical teaching style that emphasizes Nevada-specific law, real-world scenarios, and Pearson VUE exam preparation. Your lectures are thorough and designed for adult learners preparing for the Nevada license exam.

## TMCC Course Objectives

Every lecture MUST address applicable objectives:

1. Apply principles of real property ownership, transfer, and recording
2. Distinguish forms of property ownership and their legal implications
3. Analyze contracts including listing, purchase, and lease agreements
4. Apply agency law and fiduciary duties
5. Evaluate property valuation methods including CMA and appraisal
6. Analyze financing methods, instruments, and the lending process
7. Apply disclosure requirements under Nevada law (NRS 113, NRS 645)
8. Interpret land use controls including zoning and environmental regulations
9. Analyze fair housing laws at federal and state levels
10. Apply property management principles and landlord-tenant law
11. Evaluate closing procedures, prorations, and settlement statements
12. Interpret Nevada licensing requirements (NRS 645, NAC 645)
13. Apply ethical standards and professional conduct expectations

## Content Authority Hierarchy

When generating lecture content, follow this strict priority order:

1. **NRS/NAC** — Ground truth. Live statute text is provided below under "LIVE NRS STATUTE TEXT" — use it as the primary authority for all rules, timelines, and requirements. Always cite specific statute numbers. If the live text conflicts with your training data, the live text wins.

2. **CE Shop** — Current Nevada pre-licensing course alignment. Use CE Shop question samples to validate what is exam-testable and to cross-check NRS interpretations.

3. **Pearson VUE** — Exam content areas and weights.

4. **Lecture Notes** — Practical examples and Nevada-specific context.

5. **Textbook** — Supplemental only. Flag conflicts with NRS/NAC.

## Output Requirements

Produce a COMPLETE, FULLY DEVELOPED lecture. Do not truncate or summarize. Write every section in full instructor-ready prose.

Structure:

1. LECTURE HEADER — Title, date placeholder, duration, TMCC objectives addressed
2. LEARNING OBJECTIVES — 4-6 measurable objectives
3. KEY TERMS AND DEFINITIONS — Every term defined with NRS citation where applicable, written as you would explain it to a student
4. TIMED LECTURE CONTENT — Fully written instructor prose for each time block. Include: opening hook per section, full concept explanations with NRS citations woven in, real-world Reno/NV examples, explicit EXAM TRAP callouts, Ask the class prompts, smooth transitions
5. KNOWLEDGE CHECK QUESTIONS — 4-6 Pearson VUE format multiple choice with full answer explanations
6. DISCUSSION QUESTIONS — 3-4 open-ended questions
7. EXAM PREP SUMMARY — Every testable fact, number, deadline, and threshold from this lecture organized by NRS section
8. COMMON EXAM TRAPS — Dedicated section listing every trap covered
9. NEXT CLASS PREVIEW — Brief connector to next session

Never truncate. Write as a working instructor delivering real class content.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    let topics: string[];

    if (Array.isArray(body.topics) && body.topics.length > 0) {
      topics = body.topics;
    } else if (typeof body.topic === "string" && body.topic.trim()) {
      topics = [body.topic.trim()];
    } else {
      return new Response(
        JSON.stringify({ error: "topics (array) or topic (string) is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const durationMinutes = body.durationMinutes;
    if (!durationMinutes) {
      return new Response(
        JSON.stringify({ error: "durationMinutes is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const perTopicMinutes = Math.round(durationMinutes / topics.length);

    // Fetch live NRS statute text for accuracy
    const liveNRSText = await fetchNRSContent(topics);

    const topicBlocks = topics.map((topic: string, i: number) => {
      const content = TOPIC_CONTENT[topic] || DEFAULT_CONTENT;
      const startMin = i * perTopicMinutes;
      const endMin = startMin + perTopicMinutes;

      return `
## TOPIC ${i + 1}: ${topic}
Time Block: ${startMin}:00 – ${endMin}:00 (${perTopicMinutes} minutes)

NRS/NAC References: ${content.nrsRefs}
Key Terms to Define: ${content.keyTerms}
Core Concepts: ${content.conceptSummary}
Exam Alerts (flag explicitly with EXAM TRAP): ${content.examAlerts}
Common Student Mistakes: ${content.commonMistakes}
Practical Examples (use Reno/NV context): ${content.practicalExamples}
Sample Exam Questions for Knowledge Check: ${content.examQuestionSamples}`;
    }).join("\n\n");

    const minWords = Math.round(durationMinutes * 120);
    const sectionCount = Math.ceil(durationMinutes / 15);

    const userPrompt = `Generate a COMPLETE ${durationMinutes}-minute RE 103 lecture for TMCC. Write every section fully — no truncating, no placeholders.

Duration: ${durationMinutes} minutes | Topics: ${topics.length} | Per topic: ~${perTopicMinutes} min
Expected sections: ~${sectionCount} timed content blocks
Minimum output: ${minWords} words of actual lecture content

${topicBlocks}${liveNRSText}

CRITICAL INSTRUCTIONS:
1. Write EVERY section in full — no "continue as above" or placeholder text
2. Each timed block = 3-5 paragraphs of instructor prose minimum
3. Define EVERY key term listed above as you would explain it to a class
4. Weave NRS citations naturally into explanations
5. Flag EVERY exam trap with the prefix: EXAM TRAP:
6. Use Reno/Northern Nevada examples wherever possible
7. Include at least 2 "Ask the class:" interaction prompts per topic
8. Knowledge check questions must match Pearson VUE multiple-choice format exactly
9. Exam Prep Summary must list every specific number, deadline, and threshold (90 hrs, 5 years, 3 months, 3 business days, 10 days, 24 hrs CE every 2 years, etc.)
10. This lecture will be exported as slides — use clear headers but write full prose content under each`;

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
          max_tokens: 8000,
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