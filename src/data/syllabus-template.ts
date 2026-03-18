import type { SyllabusTemplate } from "@/types/course";

export function getDefaultSyllabusTemplate(): SyllabusTemplate {
  return {
    courseCode: "RE 103",
    courseTitle: "Real Estate Principles",
    semester: "Spring 2026",
    instructorName: "Nathanial (Nate) Miller",
    instructorCredentials: "MM, Realtor, S.193995",
    meetingDays: "Tuesdays & Thursdays",
    meetingTime: "5:30–8:20 PM",
    location: "Meadowood Center",
    dateRange: "January 20, 2026 – March 12, 2026",
    textbook: "Nevada Real Estate Principles, 3rd Edition; Ben C. Scheible Esq. (supplemental reference only)",
    platform: "In-Person/Canvas",
    contactInfo: "Please use Canvas to contact me, I'll usually reply within 24 hours. I will also use Canvas to make announcements and post grades.",
    courseObjectives: [
      "Explain and apply the law of agency in Nevada.",
      "Complete and evaluate listing and purchase agreements.",
      "Demonstrate understanding of contract law as it applies to real estate.",
      "Analyze financing options and interpret key loan documents.",
      "Identify and explain land-use controls, leases, and subdivisions.",
      "Apply ethical principles and fair-housing standards in practice.",
      "Accurately prepare closing statements and explain escrow procedures.",
      "Reference and apply relevant NRS and NAC codes governing real-estate professionals.",
    ],
    readingRequirement: "Students should complete assigned reading prior to each class session to fully benefit from each session's lecture. Additionally, to ensure the greatest possibility of passing the Nevada Real Estate Exam, students should dedicate at least 7 hours per week outside of class to adequately prepare for the Nevada Real Estate Exam.",
    courseFlow: "1. Exam-weighted topic lecture aligned to Pearson VUE content areas.\n2. Cognitive-level exercises (Knowledge → Application → Analysis).\n3. Graded Canvas quiz due by the following Sunday.",
    weeklySchedule: [
      // Week 1 — Contracts (23%) & Agency (20%)
      { week: 1, day: "Tues 1/20", unitTopic: "Session 1 – Contracts I: Formation, Validity & Nevada Requirements (Knowledge/Application)", examAlignment: "National VII – Contracts (13.3%); State V – Nevada Contracts (4.2%)", assignmentQuiz: "" },
      { week: 1, day: "Thurs 1/22", unitTopic: "Session 2 – Agency: Duties, Disclosure & Nevada Relationships (Knowledge/Application)", examAlignment: "National V – General Principles of Agency (8.3%); State III – Nevada Agency (4.2%)", assignmentQuiz: "Quiz #1 – Contracts & Agency Fundamentals" },

      // Week 2 — Disclosures (12%) & Property Ownership (9%)
      { week: 2, day: "Tues 1/27", unitTopic: "Session 3 – Disclosures: Property, Seller & Environmental (Knowledge/Application)", examAlignment: "National VI – Property Disclosures (7.5%); State IV – Nevada Disclosures (4.2%)", assignmentQuiz: "" },
      { week: 2, day: "Thurs 1/29", unitTopic: "Session 4 – Property Ownership: Estates, Interests & Title (Knowledge)", examAlignment: "National I – Property Ownership (9.2%)", assignmentQuiz: "Quiz #2 – Disclosures & Ownership" },

      // Week 3 — Valuation (9%) & Land Use (8%)
      { week: 3, day: "Tues 2/3", unitTopic: "Session 5 – Valuation & Market Analysis: Appraisal Approaches (Application/Analysis)", examAlignment: "National III – Valuation & Market Analysis (9.2%)", assignmentQuiz: "" },
      { week: 3, day: "Thurs 2/5", unitTopic: "Session 6 – Land Use Controls: Zoning, Planning & Environmental Regs (Knowledge/Application)", examAlignment: "National II – Land Use Controls & Regulations (7.5%)", assignmentQuiz: "Quiz #3 – Valuation & Land Use" },

      // Week 4 — Financing (6%) & Brokerage Operations (8%)
      { week: 4, day: "Tues 2/10", unitTopic: "Session 7 – Financing: Loan Types, Mortgage Law & Settlement (Application/Analysis)", examAlignment: "National IV – Financing (5.8%)", assignmentQuiz: "" },
      { week: 4, day: "Thurs 2/12", unitTopic: "Session 8 – Nevada Brokerage Operations: Trust Accounts, Records & Compliance (Knowledge/Application)", examAlignment: "State VII – Nevada Brokerage Operations (4.2%)", assignmentQuiz: "Quiz #4 – Financing & Brokerage Ops" },

      // Week 5 — Leasing/PM (6%) & Licensing/Commission (9%)
      { week: 5, day: "Tues 2/17", unitTopic: "Session 9 – Leasing & Property Management: Landlord-Tenant, PM Agreements (Knowledge/Application)", examAlignment: "National VIII – Leasing & PM (5.8%); State VI – Nevada PM (4.2%)", assignmentQuiz: "" },
      { week: 5, day: "Thurs 2/19", unitTopic: "Session 10 – Nevada Commission & Licensing: Powers, Requirements & Education (Knowledge)", examAlignment: "State I – Commission Powers (4.2%); State II – Licensing (5.0%)", assignmentQuiz: "Quiz #5 – Leasing, PM & Licensing" },

      // Week 6 — Midterm & Contracts II
      { week: 6, day: "Tues 2/24", unitTopic: "⭐ MIDTERM EXAM – 60 Questions (Sessions 1–10 cumulative)", examAlignment: "All areas covered through Session 10", assignmentQuiz: "Midterm Exam" },
      { week: 6, day: "Thurs 2/26", unitTopic: "Session 11 – Contracts II: Purchase Agreements, Earnest Money & Closing (Application/Analysis)", examAlignment: "National VII – Contracts; State V – Nevada Contracts", assignmentQuiz: "Quiz #6 – Contracts II" },

      // Week 7 — Disciplinary + Comprehensive Review
      { week: 7, day: "Tues 3/3", unitTopic: "Session 12 – Nevada Disciplinary Actions & Recovery Fund (Knowledge/Application)", examAlignment: "State VIII – Disciplinary Actions & Recovery Fund (3.3%)", assignmentQuiz: "Quiz #7 – Disciplinary & Recovery Fund" },
      { week: 7, day: "Thurs 3/5", unitTopic: "Session 13 – Comprehensive Review: High-Weight Areas & Exam Traps (Analysis)", examAlignment: "All 16 Pearson VUE areas – weighted review", assignmentQuiz: "Quiz #8 – Comprehensive Review" },

      // Week 8 — Final Exam Simulations (extra sessions if schedule allows)
      { week: 7, day: "Tues 3/10", unitTopic: "Session 14 – Practice Exam Simulation I: National Portion (80 questions)", examAlignment: "National portions I–VIII", assignmentQuiz: "Quiz #9 – National Simulation Debrief" },
      { week: 7, day: "Thurs 3/12", unitTopic: "⭐ FINAL EXAM – 120 Questions (Full Pearson VUE Weighted)", examAlignment: "All 16 Pearson VUE areas – exam-weighted", assignmentQuiz: "Final Exam" },
    ],
    gradingCategories: [
      { category: "Quizzes (9 × 15 pts)", points: 135 },
      { category: "Midterm Exam", points: 100 },
      { category: "Final Exam", points: 165 },
    ],
    totalPoints: 400,
    gradeScale: [
      { letter: "A", range: "100% to 94%" },
      { letter: "A-", range: "<94% to 90%" },
      { letter: "B+", range: "<90% to 87%" },
      { letter: "B", range: "<87% to 84%" },
      { letter: "B-", range: "<84% to 80%" },
      { letter: "C+", range: "<80% to 77%" },
      { letter: "C", range: "<77% to 74%" },
      { letter: "C-", range: "<74% to 70%" },
      { letter: "D+", range: "<70% to 67%" },
      { letter: "D", range: "<67% to 64%" },
      { letter: "D-", range: "<64% to 61%" },
      { letter: "F", range: "<61% to 0%" },
    ],
    instructorPolicies: [
      "No late work: Real estate deadlines are serious business; we treat them that way here.",
      "Show up, participate, and ask questions: Real estate is a people business, let's practice here.",
      "No extra credit: Do your best from the start.",
      "Canvas is where you'll find announcements, reminders, and materials.",
      "Study outside of class. You will need to study outside of this class to ensure you pass the Nevada Real Estate Exam.",
    ],
    institutionalPolicies: [
      {
        title: "Withdrawal",
        content: "Except for an administrative withdrawal during the first week of the semester, instructors cannot withdraw a student or issue a \"W\" grade. The student must do a withdrawal. Please check with admissions and records for any applicable deadlines.",
      },
      {
        title: "Audit",
        content: "Instead of withdrawing a student can choose to change his/her option from credit with a letter grade, to audit with no letter grade. The form is available here: Audit or Satisfactory/Unsatisfactory Grade Change form. Check with Admissions and Records regarding deadlines and the impact this change can have on financial aid.",
      },
      {
        title: "Extra Credit",
        content: "Extra credit is not available in this course.",
      },
      {
        title: "Attendance",
        content: "It is the student's responsibility to be in class.",
      },
      {
        title: "Americans with Disabilities Act (ADA)",
        content: "Qualified, self-identified students with documented disabilities have the right to free accommodations to ensure equal access to educational opportunities at Truckee Meadows Community College. For assistance contact TMCC's Disability Resource Center at 775-673-7277, TTY 775-673-7888, e-mail drc@tmcc.edu or come by the Red Mountain Building, room 315.",
      },
      {
        title: "NSHE Mandatory Statement",
        content: "Truckee Meadows Community College is committed to maintaining a safe learning environment for all students, faculty, and staff. Students, faculty, and staff are encouraged to remain at home if experiencing any symptoms of ill health. At TMCC, properly worn masks are optional in all classrooms, work-spaces, and public spaces.",
      },
      {
        title: "Canvas Learning Management System",
        content: "The Canvas Learning Management System is the electronic platform used for this course. You are expected to already know or quickly learn how to use Canvas and be reasonably competent using a computer.",
      },
      {
        title: "Technical Assistance",
        content: "Technical assistance is available through the IT Student Support Center. Web College provides information on Getting Started and I recommend that you complete the Web College Online Tutorial.",
      },
    ],
  };
}
