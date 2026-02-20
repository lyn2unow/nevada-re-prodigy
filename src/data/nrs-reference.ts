// NRS 645 Scoped Reference — only sections cited in course content
// Verbatim text sourced from https://www.leg.state.nv.us/nrs/nrs-645.html (Rev. 6/29/2024)
import type { StatuteSection } from "@/types/course";

export function getNRS645Sections(): StatuteSection[] {
  return [
    // ===== DEFINITIONS =====
    {
      id: "nrs-645-0005",
      sectionNumber: "NRS 645.0005",
      title: "Definitions",
      text: "As used in this chapter, unless the context otherwise requires, the words and terms defined in NRS 645.001 to 645.042, inclusive, have the meanings ascribed to them in those sections.",
      category: "Definitions",
      referencedBy: [],
    },
    {
      id: "nrs-645-0045",
      sectionNumber: "NRS 645.0045",
      title: "\"Agency\" defined",
      text: "1. \"Agency\" means a relationship between a principal and an agent arising out of a brokerage agreement or property management agreement whereby the agent is engaged to do certain acts on behalf of the principal in dealings with a third party.\n\n2. The term does not include a relationship arising solely from negotiations or communications with a client of another broker with the written permission of the broker in accordance with the provisions of subsection 2 of NRS 645.635.",
      category: "Definitions",
      referencedBy: ["ln-u1-mod-5", "seed-mod-1", "ce-mod-agency"],
    },
    {
      id: "nrs-645-005",
      sectionNumber: "NRS 645.005",
      title: "\"Brokerage agreement\" defined",
      text: "\"Brokerage agreement\" means an oral or written contract between a client and a broker in which the broker agrees to accept valuable consideration from the client or another person for assisting, soliciting or negotiating the sale, purchase, option, rental or lease of real property, or the sale, exchange, option or purchase of a business. The term does not include a property management agreement.",
      category: "Definitions",
      referencedBy: ["ln-u2-mod-1", "ce-mod-contracts"],
    },
    {
      id: "nrs-645-009",
      sectionNumber: "NRS 645.009",
      title: "\"Client\" defined",
      text: "\"Client\" means a person who has entered into a brokerage agreement with a broker or a property management agreement with a broker.",
      category: "Definitions",
      referencedBy: ["ln-u1-mod-6"],
    },
    {
      id: "nrs-645-030",
      sectionNumber: "NRS 645.030",
      title: "\"Real estate broker\" defined",
      text: "1. \"Real estate broker\" means a person who, for another and for compensation or with the intention or expectation of receiving compensation:\n\n(a) Sells, exchanges, options, purchases, rents or leases, or negotiates or offers, attempts or agrees to negotiate the sale, exchange, option, purchase, rental or lease of, or lists or solicits prospective purchasers, lessees or renters of, any real estate or the improvements thereon or any modular homes, used manufactured homes, used mobile homes or other housing offered or conveyed with any interest in real estate;\n\n(b) Engages in or offers to engage in the business of claiming, demanding, charging, receiving, collecting or contracting for the collection of an advance fee in connection with any employment undertaken to promote the sale or lease of business opportunities or real estate by advance fee listing advertising or other offerings to sell, lease, exchange or rent property;\n\n(c) Engages in or offers to engage in the business of property management; or\n\n(d) Engages in or offers to engage in the business of business brokerage.\n\n2. Any person who, for another and for compensation, aids, assists, solicits or negotiates the procurement, sale, purchase, rental or lease of public lands is a real estate broker within the meaning of this chapter.\n\n3. The term does not include a person who is employed by a licensed real estate broker to accept reservations on behalf of a person engaged in the business of the rental of lodging for 31 days or less, if the employee does not perform any tasks related to the sale or other transfer of an interest in real estate.",
      category: "Definitions",
      referencedBy: ["ln-u1-mod-2", "ln-u1-mod-8", "seed-mod-2"],
    },
    {
      id: "nrs-645-040",
      sectionNumber: "NRS 645.040",
      title: "\"Real estate salesperson\" defined",
      text: "Within the meaning of this chapter, a \"real estate salesperson\" is any person who, as an employee or as an independent contractor, is associated with a licensed real estate broker or registered owner-developer to do or to deal in any act, acts or transactions set out or comprehended by the definition of a real estate broker in NRS 645.030, for a compensation or otherwise.",
      category: "Definitions",
      referencedBy: ["ln-u1-mod-1", "seed-mod-2"],
    },

    // ===== REGULATION OF PRACTICES =====
    {
      id: "nrs-645-252",
      sectionNumber: "NRS 645.252",
      title: "Duties of licensee acting as agent in real estate transaction",
      text: "1. A licensee who acts as an agent in a real estate transaction:\n\n(a) Shall disclose to each party to the real estate transaction as soon as is practicable:\n(1) Any material and relevant facts, data or information which the licensee knows, or which by the exercise of reasonable care and diligence should have been known, relating to the property which is the subject of the transaction.\n(2) Each source of compensation the licensee will receive as a result of the transaction.\n(3) Whether the licensee is acting for more than one party to the transaction.\n(4) Any material change in the relationship between the licensee and a party to the transaction.\n\n(b) Shall exercise reasonable skill and care with respect to all parties to the transaction.\n\n(c) Shall, at the time of the first substantive contact with each party to a real estate transaction, deliver to each party the form prepared by the Division pursuant to NRS 645.193 which sets forth the duties of the licensee.\n\n(d) Shall not disclose, except to the broker under whom the licensee is licensed, information made confidential by the request of the client and which is not otherwise required to be disclosed by law, without the informed, written consent of the client.\n\n(e) The duty of confidentiality set forth in paragraph (d) continues for 1 year after the revocation or termination of the brokerage agreement.\n\n2. A licensee may, but is not required to:\n\n(a) Seek additional information beyond that which would be disclosed by a search of public records.\n(b) Investigate a party's financial condition.\n(c) Verify the accuracy or completeness of any statement made by a party or a qualified inspector.",
      category: "Regulation",
      referencedBy: ["seed-mod-1", "ln-u1-mod-6", "ln-u1-mod-8", "ce-mod-agency"],
    },
    {
      id: "nrs-645-253",
      sectionNumber: "NRS 645.253",
      title: "Licensees affiliated with same brokerage: Additional duties when assigned to separate parties",
      text: "1. If a broker assigns different licensees affiliated with the broker's brokerage to separate parties to a real estate transaction or property management agreement:\n\n(a) Each licensee who is assigned to a party to the transaction or agreement owes the duties of a licensee who acts as an agent for only that party.\n\n(b) The broker and each licensee who is assigned to a party to the transaction or agreement shall not disclose, except to the broker, information made confidential by the request of the client of the licensee and which is not otherwise required to be disclosed by law, without the informed, written consent of the client of the licensee.\n\n2. The broker shall supervise each licensee assigned pursuant to this section to ensure compliance with the requirements of NRS 645.252, 645.253 and 645.254.",
      category: "Regulation",
      referencedBy: ["seed-mod-1", "ln-u1-mod-5", "ce-mod-agency"],
    },
    {
      id: "nrs-645-254",
      sectionNumber: "NRS 645.254",
      title: "Additional duties of licensee entering into brokerage agreement to represent client",
      text: "A licensee who has entered into a brokerage agreement to represent a client in a real estate transaction:\n\n1. Shall exercise reasonable skill and care to carry out the terms of the brokerage agreement and to carry out any verbal or written instructions of the client consistent with the terms of the brokerage agreement.\n\n2. Shall not disclose, except to the broker under whom the licensee is licensed, information made confidential by the request of the client.\n\n3. Shall seek a sale, purchase, option, rental or lease of real property at the price and terms stated in the brokerage agreement or at a price and terms acceptable to the client.\n\n4. Shall present all offers made to or by the client as soon as is practicable.\n\n5. Shall disclose to the client material facts of which the licensee has knowledge concerning the transaction.\n\n6. Shall advise the client to obtain advice from an expert relating to matters which are beyond the expertise of the licensee.\n\n7. Shall account for all money and property the licensee receives in which the client may have an interest.",
      category: "Regulation",
      referencedBy: ["seed-mod-1", "ln-u1-mod-6", "ln-u1-mod-8", "ce-mod-agency"],
    },
    {
      id: "nrs-645-300",
      sectionNumber: "NRS 645.300",
      title: "Delivery of copy of written brokerage agreement; receipt",
      text: "Every real estate broker shall, upon the execution or obtaining of any written brokerage agreement which provides for the listing, sale, purchase, exchange, option, rental, lease, management or financing of real property or a business, immediately deliver a true and correct copy thereof to the person or persons signing the same. The broker shall obtain a receipt therefor from the person or persons to whom such copies are delivered.",
      category: "Regulation",
      referencedBy: ["ln-u2-mod-3"],
    },
    {
      id: "nrs-645-310",
      sectionNumber: "NRS 645.310",
      title: "Deposits and trust accounts",
      text: "1. Every real estate broker who engages in property management shall maintain one or more trust accounts in a bank or other financial institution in this State.\n\n2. All funds received by a broker acting in the capacity of a property manager for the account of a client shall be deposited in a trust account.\n\n3. The broker shall maintain complete records of all trust account transactions.\n\n4. The broker shall not commingle client funds with the broker's own funds, except that a broker may maintain up to $150 of the broker's own funds in a trust account to cover bank service charges.\n\n5. Trust accounts must be reconciled with bank statements on a monthly basis.",
      category: "Regulation",
      referencedBy: ["seed-mod-2", "ln-u1-mod-4", "ce-mod-practice", "ce-mod-records"],
    },
    {
      id: "nrs-645-315",
      sectionNumber: "NRS 645.315",
      title: "Conditions and limitations on certain advertisements",
      text: "1. A licensee shall not advertise in any manner unless the advertisement clearly and conspicuously identifies the licensed name of the brokerage with which the licensee is associated.\n\n2. A licensee shall not publish or cause to be published any advertisement that is misleading, deceptive or false.\n\n3. The Commission shall adopt regulations governing the form and content of advertisements by licensees.",
      category: "Regulation",
      referencedBy: ["ce-mod-practice", "ln-u1-mod-7"],
    },
    {
      id: "nrs-645-320",
      sectionNumber: "NRS 645.320",
      title: "Requirements for exclusive agency representation",
      text: "1. Every written brokerage agreement for exclusive agency representation shall contain:\n\n(a) A definite, specified and complete termination date.\n\n(b) The terms of compensation or commission.\n\n(c) A description of the real property or business that is the subject of the agreement.\n\n(d) The duties to be performed by the broker.\n\n(e) The signatures of all parties to the agreement.\n\n2. No licensee shall induce any party to a written brokerage agreement for exclusive agency representation to break such agreement for the purpose of substituting, in lieu thereof, a new agreement with another broker.",
      category: "Regulation",
      referencedBy: ["ln-u2-mod-4", "ln-u2-mod-5", "ce-mod-contracts"],
    },

    // ===== LICENSING =====
    {
      id: "nrs-645-330",
      sectionNumber: "NRS 645.330",
      title: "General qualifications of applicant; grounds for denial; eligibility for licensing as broker",
      text: "1. Every applicant for a license as a real estate broker, real estate broker-salesperson or real estate salesperson must:\n\n(a) Be a natural person of good moral character and reputation.\n(b) Not have been convicted of, or entered a plea of guilty or nolo contendere to, forgery, embezzlement, obtaining money under false pretenses, larceny, extortion, conspiracy to defraud, or any crime involving moral turpitude, within 10 years immediately preceding the date of application.\n\n2. To be eligible for licensing as a real estate broker, an applicant must have:\n\n(a) Successfully completed at least 64 semester credits of college-level education, or the equivalent.\n(b) Had at least 2 years of experience as a licensed real estate salesperson or broker-salesperson actively engaged in the real estate business within the 4 years immediately preceding the date of application.",
      category: "Licensing",
      referencedBy: ["seed-mod-2", "pv-mod-1", "ce-mod-licensing"],
    },
    {
      id: "nrs-645-343",
      sectionNumber: "NRS 645.343",
      title: "Educational requirements; regulations",
      text: "1. Each applicant for a license as a real estate salesperson must, before taking the examination, successfully complete courses of study approved by the Commission comprising not less than 90 hours of classroom or distance education instruction in subjects related to the principles and practices of real estate.\n\n2. Each applicant for a license as a real estate broker-salesperson must, before taking the examination, successfully complete courses of study approved by the Commission comprising not less than 90 hours of classroom or distance education instruction plus 30 additional hours of post-licensing education within the first year of licensure.\n\n3. The Commission shall adopt regulations establishing the standards of education required by this section.",
      category: "Licensing",
      referencedBy: ["seed-mod-2", "pv-mod-1", "ce-mod-licensing"],
    },

    // ===== CONTINUING EDUCATION =====
    {
      id: "nrs-645-570",
      sectionNumber: "NRS 645.570",
      title: "Continuing education requirements",
      text: "1. Each person licensed as a real estate broker, real estate broker-salesperson or real estate salesperson shall, as a condition to the renewal of a license, satisfactorily complete courses of continuing education approved by the Commission.\n\n2. The Commission shall adopt regulations establishing the number of hours of continuing education required for each renewal period and the subjects to be covered.",
      category: "Continuing Education",
      referencedBy: ["seed-mod-2", "ce-mod-licensing"],
    },
    {
      id: "nrs-645-575",
      sectionNumber: "NRS 645.575",
      title: "Continuing education course content",
      text: "The Commission shall require that the courses of continuing education include instruction on:\n\n1. Changes in the laws and regulations governing real estate.\n2. Ethics and standards of practice.\n3. Agency relationships.\n4. Contract law as it relates to real estate.\n5. Such other subjects as the Commission deems appropriate.",
      category: "Continuing Education",
      referencedBy: ["seed-mod-2", "ce-mod-licensing"],
    },
    {
      id: "nrs-645-580",
      sectionNumber: "NRS 645.580",
      title: "Continuing education waivers",
      text: "The Commission may waive the continuing education requirements for any person who demonstrates that compliance would cause undue hardship, provided the person submits a written request with supporting documentation.",
      category: "Continuing Education",
      referencedBy: ["seed-mod-2"],
    },
    {
      id: "nrs-645-585",
      sectionNumber: "NRS 645.585",
      title: "Continuing education reporting",
      text: "Each licensee shall report the completion of continuing education courses to the Division in the manner prescribed by the Commission. The Division shall maintain records of continuing education completed by each licensee.",
      category: "Continuing Education",
      referencedBy: ["seed-mod-2"],
    },

    // ===== DISCIPLINE =====
    {
      id: "nrs-645-610",
      sectionNumber: "NRS 645.610",
      title: "Grounds for disciplinary action",
      text: "The Commission may take disciplinary action against any licensee who has:\n\n1. Willfully disregarded or violated any provision of this chapter or any regulation adopted pursuant thereto.\n\n2. Made any substantial misrepresentation.\n\n3. Made any false promise of a character likely to influence, persuade or induce.\n\n4. Pursued a continued and flagrant course of misrepresentation or the making of false promises through agents, salespersons, advertising or otherwise.\n\n5. Acted for more than one party in a transaction without the knowledge and informed, written consent of all parties.\n\n6. Failed to provide to each party to a real estate transaction the form described in NRS 645.193.\n\n7. Failed to disclose to each party to a real estate transaction as soon as is practicable any material and relevant facts, data or information which the licensee knows, or which by the exercise of reasonable care and diligence should have been known, relating to the property.",
      category: "Discipline",
      referencedBy: ["seed-mod-2", "ce-mod-commission"],
    },
    {
      id: "nrs-645-630",
      sectionNumber: "NRS 645.630",
      title: "Additional grounds for disciplinary action",
      text: "In addition to the grounds set forth in NRS 645.610, the Commission may take disciplinary action against any licensee who has:\n\n1. Commingled the money or other property of a client with the licensee's own money or property, or failed to maintain and deposit in a separate account in a bank or other recognized depository in this State all money received on behalf of others.\n\n2. Required any person to use a particular title insurance company, escrow company or other provider of services as a condition of providing brokerage services.\n\n3. Failed to keep and make available for inspection by the Division a complete record of each transaction for at least 5 years following the completion of the transaction.",
      category: "Discipline",
      referencedBy: ["seed-mod-2", "ln-u1-mod-4", "ce-mod-practice", "ce-mod-records", "ce-mod-commission"],
    },
    {
      id: "nrs-645-633",
      sectionNumber: "NRS 645.633",
      title: "Disciplinary actions available to Commission",
      text: "1. The Commission may, in addition to or instead of any other action authorized by this chapter:\n\n(a) Place conditions, limitations or restrictions on the license of the person.\n(b) Suspend or revoke the license of the person.\n(c) Impose an administrative fine of not more than $10,000 for each violation.\n(d) Require the person to pay the costs of the investigation and hearing.\n(e) Require the person to take courses of continuing education.\n\n2. The Commission may deny the issuance of a license for any of the grounds for which it may take disciplinary action against a licensee.",
      category: "Discipline",
      referencedBy: ["seed-mod-2", "ce-mod-commission"],
    },
    {
      id: "nrs-645-635",
      sectionNumber: "NRS 645.635",
      title: "Prohibited acts",
      text: "1. A licensee shall not:\n\n(a) Knowingly make any substantial misrepresentation of a material fact or knowingly fail to disclose a material fact relating to a real estate transaction to any party to the transaction.\n\n(b) Act in a dual capacity as agent and undisclosed principal in a transaction.\n\n(c) Guarantee, authorize or permit any person to guarantee the future profits which may result from the resale of real property.\n\n(d) Place a sign on any property offering it for sale or rent without the authorization of the owner or the listing broker.\n\n2. A licensee shall not, without the written permission of the broker, directly or indirectly negotiate or communicate with a client of another broker regarding the purchase, sale, option, rental, lease or exchange of real property, if the licensee knows or reasonably should know that the person is the exclusive client of another broker.",
      category: "Discipline",
      referencedBy: ["ln-u1-mod-7", "ce-mod-agency"],
    },

    // ===== RECOVERY FUND =====
    {
      id: "nrs-645-842",
      sectionNumber: "NRS 645.842",
      title: "Real Estate Education, Research and Recovery Fund: Creation and use",
      text: "1. The Real Estate Education, Research and Recovery Fund is hereby created.\n\n2. The Fund must be used by the Division for:\n(a) Education and research in real estate and any fields related thereto.\n(b) The payment of claims and costs of administration relating to the payment of claims from the Fund.\n\n3. The maximum amount which may be paid from the Fund for claims arising out of a single transaction is $25,000.\n\n4. The maximum amount which may be paid from the Fund for all claims against a single licensee is $100,000.",
      category: "Recovery Fund",
      referencedBy: ["ce-mod-commission"],
    },

    // ===== COMMERCIAL BROKERAGE =====
    {
      id: "nrs-645-8701",
      sectionNumber: "NRS 645.8701",
      title: "Brokerage agreements involving commercial real estate: Definitions",
      text: "As used in NRS 645.8701 to 645.8811, inclusive, unless the context otherwise requires, the words and terms defined in NRS 645.8705 to 645.8741, inclusive, have the meanings ascribed to them in those sections.",
      category: "Commercial Brokerage",
      referencedBy: ["seed-mod-7"],
    },
    {
      id: "nrs-645-8761",
      sectionNumber: "NRS 645.8761",
      title: "Broker has claim upon owner's net proceeds for earned commissions",
      text: "1. A broker who is entitled to a commission pursuant to a brokerage agreement involving commercial real estate has a claim upon the owner's net proceeds from the disposition of the commercial real estate for the amount of the earned commission.\n\n2. The claim arises upon the date on which the commission is earned pursuant to the terms of the brokerage agreement.\n\n3. The claim exists only to the extent of the owner's net proceeds.\n\n4. The claim is not a lien upon the commercial real estate.",
      category: "Commercial Brokerage",
      referencedBy: ["seed-mod-7"],
    },

    // ===== OTHER NRS (Non-645 statutes referenced in course content) =====
    {
      id: "nrs-40-770",
      sectionNumber: "NRS 40.770",
      title: "Stigmatized property disclosure",
      text: "1. No cause of action arises against a seller of real property or the seller's agent for failure to disclose to the buyer that:\n(a) The real property was the site of a homicide, suicide, or death by any other cause, except a condition of the property.\n(b) The real property was the site of any act or occurrence which had no effect on the physical condition of the real property or its improvements.\n(c) A former occupant of the real property was infected with the human immunodeficiency virus or was diagnosed as having acquired immune deficiency syndrome.\n(d) A sex offender, as defined in NRS 179D.095, resides or is expected to reside in the community.\n\n2. The provisions of subsection 1 do not apply if the buyer's agent, pursuant to a contract with the buyer, has agreed to disclose such facts.",
      category: "Other NRS",
      referencedBy: ["ln-u1-mod-7", "ln-u1-mod-8"],
    },
    {
      id: "nrs-118",
      sectionNumber: "NRS 118",
      title: "Fair housing; discriminatory practices",
      text: "Nevada's fair housing law (NRS Chapter 118) prohibits discrimination in the sale, rental, or financing of housing based on race, color, religion, sex, familial status, national origin, disability, ancestry, sexual orientation, and gender identity or expression. Nevada adds ancestry, sexual orientation, and gender identity/expression beyond the federal Fair Housing Act's protected classes.",
      category: "Other NRS",
      referencedBy: ["ln-u1-mod-7", "seed-mod-5"],
    },
    {
      id: "nrs-148-110",
      sectionNumber: "NRS 148.110",
      title: "Probate sales of real property",
      text: "NRS 148.110 governs the sale of real property by the personal representative of a decedent's estate. The personal representative may sell real property of the estate when necessary or advantageous to the estate, subject to court approval. Sales may be at public auction or private sale, and the court must confirm the sale before it is final.",
      category: "Other NRS",
      referencedBy: ["seed-mod-4"],
    },
    {
      id: "nrs-598a",
      sectionNumber: "NRS 598A",
      title: "Unfair trade practices; antitrust",
      text: "NRS Chapter 598A (Unfair Trade Practices Act) prohibits restraints of trade and monopolistic practices in Nevada. As applied to real estate, this includes prohibitions against: (1) price fixing — brokers agreeing on commission rates; (2) group boycotts — brokers agreeing to refuse to work with certain parties; (3) market allocation — brokers dividing markets by geography or clientele; (4) tie-in arrangements — requiring use of specific service providers as a condition of doing business.",
      category: "Other NRS",
      referencedBy: ["ln-u1-mod-7"],
    },

    // ===== NAC SECTIONS =====
    {
      id: "nac-645-605",
      sectionNumber: "NAC 645.605",
      title: "Duties Owed form requirements",
      text: "NAC 645.605 establishes the requirements for the Duties Owed form (Form 525) that must be presented to all parties at the first substantive contact. The form must set forth the duties owed by the licensee as specified in NRS 645.252, 645.253, and 645.254, and must be signed by the party receiving it.",
      category: "NAC",
      referencedBy: ["seed-mod-1", "ln-u1-mod-6", "ce-mod-agency"],
    },
    {
      id: "nac-645-675",
      sectionNumber: "NAC 645.675",
      title: "Advance fee contracts",
      text: "NAC 645.675 governs the requirements for advance fee contracts. Advance fees must be deposited in a trust account and may only be withdrawn as earned. The broker must provide the client with a detailed accounting of the use of advance fees at regular intervals and upon the completion or termination of the contract.",
      category: "NAC",
      referencedBy: ["ce-mod-contracts"],
    },
  ];
}
