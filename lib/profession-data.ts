export interface ProfessionData {
  slug: string;
  displayName: string;
  pluralName: string;
  medianSalary: number; // annual, approximate
  pslfEligible: true; // all professions here qualify
  pslfNote: string;
  perkinsCancellation: boolean;
  perkinsCancellationNote?: string;
  incomeTendency: 'lower' | 'moderate' | 'higher';
  keywords: string[]; // SEO keywords
  description: string; // 1-2 sentence description of the profession's student loan situation
  commonEmployers: string[]; // types of qualifying PSLF employers
  commonLoanAmount: string; // e.g., "$40,000–$120,000"
}

export const PROFESSIONS: ProfessionData[] = [
  {
    slug: 'teacher',
    displayName: 'Teacher',
    pluralName: 'Teachers',
    medianSalary: 61000,
    pslfEligible: true,
    pslfNote:
      'Public school teachers are some of the most eligible PSLF borrowers — public schools are qualifying government employers. Submit your Employer Certification Form as soon as you start teaching.',
    perkinsCancellation: true,
    perkinsCancellationNote:
      'Teachers at low-income schools or in shortage subjects (math, science, special education, bilingual education) can have up to 100% of Perkins Loans cancelled over 5 years of service.',
    incomeTendency: 'lower',
    keywords: ['teacher student loan forgiveness', 'PSLF teacher', 'teacher loan forgiveness 2026'],
    description:
      'Teachers have some of the best student loan forgiveness options available — PSLF after 10 years, Perkins cancellation for shortage subjects, and Teacher Loan Forgiveness up to $17,500.',
    commonEmployers: ['Public school districts', 'Charter schools (501(c)(3))', 'State education agencies', 'Public universities'],
    commonLoanAmount: '$35,000–$80,000',
  },
  {
    slug: 'nurse',
    displayName: 'Nurse',
    pluralName: 'Nurses',
    medianSalary: 81000,
    pslfEligible: true,
    pslfNote:
      'Nurses at government hospitals, nonprofit health systems, or public health agencies qualify for PSLF. Many nurses at large health systems (CommonSpirit, Kaiser, Ascension) work for 501(c)(3) nonprofits and qualify.',
    perkinsCancellation: true,
    perkinsCancellationNote:
      'Nurses and medical technicians can have up to 100% of Federal Perkins Loans cancelled over 5 years of service at qualifying healthcare employers.',
    incomeTendency: 'moderate',
    keywords: ['nurse student loan forgiveness', 'PSLF nurse', 'nursing student loan 2026'],
    description:
      'Nurses often carry significant student debt — especially BSN-to-MSN programs. PSLF is widely available at nonprofit and government health systems, and Perkins cancellation applies to Perkins Loan holders.',
    commonEmployers: ['Public hospitals and health systems', 'Nonprofit hospital networks (501(c)(3))', 'Veterans Affairs (VA)', 'Public health departments'],
    commonLoanAmount: '$30,000–$100,000',
  },
  {
    slug: 'social-worker',
    displayName: 'Social Worker',
    pluralName: 'Social Workers',
    medianSalary: 58000,
    pslfEligible: true,
    pslfNote:
      'Social workers are highly likely to qualify for PSLF — most work for government agencies (county, state, federal) or nonprofit organizations. After 10 years, remaining loans are forgiven tax-free.',
    perkinsCancellation: true,
    perkinsCancellationNote:
      'Social workers in government or nonprofit agencies can have up to 100% of Perkins Loans cancelled over 5 years.',
    incomeTendency: 'lower',
    keywords: ['social worker student loan forgiveness', 'PSLF social worker', 'social work student loans 2026'],
    description:
      'Social workers often have significant debt relative to income. PSLF is nearly universally available — almost all social work positions are with qualifying public or nonprofit employers.',
    commonEmployers: ['County and state child welfare agencies', 'Nonprofit social service organizations', 'Veterans Affairs', 'Public schools and hospitals'],
    commonLoanAmount: '$40,000–$80,000',
  },
  {
    slug: 'firefighter',
    displayName: 'Firefighter',
    pluralName: 'Firefighters',
    medianSalary: 56000,
    pslfEligible: true,
    pslfNote:
      'Municipal firefighters work for city or county government — a qualifying PSLF employer. Volunteer firefighters paid by a government entity also qualify.',
    perkinsCancellation: true,
    perkinsCancellationNote:
      'Firefighters can have up to 100% of Perkins Loans cancelled over 5 years of service.',
    incomeTendency: 'moderate',
    keywords: ['firefighter student loan forgiveness', 'PSLF firefighter', 'first responder loan forgiveness'],
    description:
      'Firefighters employed by city or county governments qualify for PSLF. Many fire departments also offer department-specific tuition reimbursement that can be combined with federal loan programs.',
    commonEmployers: ['Municipal fire departments', 'County fire departments', 'Federal fire services (USFS, DOD)', 'Airport fire departments (government-run)'],
    commonLoanAmount: '$20,000–$60,000',
  },
  {
    slug: 'police-officer',
    displayName: 'Police Officer',
    pluralName: 'Police Officers',
    medianSalary: 67000,
    pslfEligible: true,
    pslfNote:
      'Local, state, and federal law enforcement officers all work for qualifying government employers and are eligible for PSLF after 120 qualifying payments.',
    perkinsCancellation: true,
    perkinsCancellationNote:
      'Law enforcement officers can have up to 100% of Perkins Loans cancelled over 5 years. Contact your loan servicer to apply.',
    incomeTendency: 'moderate',
    keywords: ['police officer student loan forgiveness', 'law enforcement PSLF', 'cop student loans forgiveness'],
    description:
      'Police officers and other law enforcement professionals employed by government agencies qualify for PSLF. Federal law enforcement (FBI, DEA, Border Patrol) also qualifies.',
    commonEmployers: ['Municipal police departments', 'County sheriffs offices', 'State police and highway patrol', 'Federal law enforcement (FBI, DEA, ATF, USMS)'],
    commonLoanAmount: '$20,000–$60,000',
  },
  {
    slug: 'doctor',
    displayName: 'Doctor',
    pluralName: 'Doctors',
    medianSalary: 208000,
    pslfEligible: true,
    pslfNote:
      'Physicians at nonprofit hospitals or government health systems (Veterans Affairs, federally qualified health centers, public university hospitals) qualify for PSLF. With medical school debt averaging $200,000+, PSLF can mean forgiveness of $100,000–$300,000 tax-free.',
    perkinsCancellation: false,
    incomeTendency: 'higher',
    keywords: ['doctor student loan forgiveness', 'physician PSLF', 'medical school loan forgiveness 2026', 'doctor loan repayment'],
    description:
      'Physicians carry the highest average student debt of any profession ($250,000+ after residency). For those at qualifying nonprofit or government hospitals, PSLF can eliminate six figures in debt tax-free.',
    commonEmployers: ['Academic medical centers (university hospitals)', 'VA Medical Centers', 'Federally Qualified Health Centers (FQHCs)', 'Nonprofit hospital systems (CommonSpirit, Ascension, etc.)'],
    commonLoanAmount: '$150,000–$400,000',
  },
  {
    slug: 'librarian',
    displayName: 'Librarian',
    pluralName: 'Librarians',
    medianSalary: 62000,
    pslfEligible: true,
    pslfNote:
      'Public librarians work for city, county, or state government — qualifying employers for PSLF. Academic librarians at public universities also qualify.',
    perkinsCancellation: true,
    perkinsCancellationNote:
      'Librarians at Title I school libraries can have up to 100% of Perkins Loans cancelled over 5 years.',
    incomeTendency: 'lower',
    keywords: ['librarian student loan forgiveness', 'PSLF librarian', 'library science student loans'],
    description:
      'Many librarians hold MLS or MLIS degrees and carry moderate debt. Public and academic librarians at government or nonprofit institutions are strong PSLF candidates.',
    commonEmployers: ['Public library systems (city/county)', 'Public university libraries', 'K-12 school libraries (public)', 'Government agency libraries'],
    commonLoanAmount: '$30,000–$70,000',
  },
  {
    slug: 'nonprofit-employee',
    displayName: 'Nonprofit Employee',
    pluralName: 'Nonprofit Employees',
    medianSalary: 54000,
    pslfEligible: true,
    pslfNote:
      'Any employee of a 501(c)(3) nonprofit qualifies for PSLF regardless of job role — from executive directors to program staff to administrative assistants. The nonprofit must be a 501(c)(3); other nonprofit types (501(c)(4), etc.) do not qualify.',
    perkinsCancellation: false,
    incomeTendency: 'lower',
    keywords: ['nonprofit employee student loan forgiveness', 'PSLF nonprofit', '501c3 student loan forgiveness'],
    description:
      'All full-time 501(c)(3) nonprofit employees qualify for PSLF regardless of role. With lower nonprofit salaries, IBR payments are often low — meaning larger forgiven balances after 10 years.',
    commonEmployers: ['501(c)(3) nonprofit organizations', 'Nonprofit hospitals', 'Nonprofit educational institutions', 'Nonprofit housing and social service agencies'],
    commonLoanAmount: '$30,000–$80,000',
  },
  {
    slug: 'federal-employee',
    displayName: 'Federal Employee',
    pluralName: 'Federal Employees',
    medianSalary: 94000,
    pslfEligible: true,
    pslfNote:
      'All federal government employees qualify for PSLF — from GS-level civilian employees to military service members. Federal employees can also access the Federal Student Loan Repayment Program (SLRP), which provides up to $10,000/year (max $60,000) in tax-free loan repayment assistance.',
    perkinsCancellation: false,
    incomeTendency: 'moderate',
    keywords: ['federal employee student loan forgiveness', 'PSLF federal employee', 'government worker student loans'],
    description:
      'Federal employees have a double advantage: PSLF after 10 years AND the federal Student Loan Repayment Program (SLRP) for up to $60,000 in additional repayment assistance through their agency.',
    commonEmployers: ['All U.S. federal agencies (DOD, HHS, VA, IRS, etc.)', 'Military (active duty counts for PSLF)', 'AmeriCorps and Peace Corps', 'U.S. Postal Service'],
    commonLoanAmount: '$30,000–$100,000',
  },
  {
    slug: 'military',
    displayName: 'Military Service Member',
    pluralName: 'Military Service Members',
    medianSalary: 52000,
    pslfEligible: true,
    pslfNote:
      'Active duty military service counts toward PSLF. Additionally, while on active duty, loan interest is capped at 6% under the Servicemembers Civil Relief Act (SCRA). Military members may also qualify for Military College Loan Repayment Program (CLRP) through their branch.',
    perkinsCancellation: false,
    incomeTendency: 'lower',
    keywords: ['military student loan forgiveness', 'veteran student loans', 'PSLF military', 'active duty student loan'],
    description:
      'Active duty military members qualify for PSLF and have interest capped at 6% under SCRA. Veterans transitioning out of service also qualify for various federal and VA-specific programs.',
    commonEmployers: ['U.S. Army, Navy, Air Force, Marines, Coast Guard, Space Force', 'National Guard and Reserves (active duty orders)', 'ROTC graduates (commissioned officers)'],
    commonLoanAmount: '$20,000–$60,000',
  },
  {
    slug: 'public-defender',
    displayName: 'Public Defender',
    pluralName: 'Public Defenders',
    medianSalary: 62000,
    pslfEligible: true,
    pslfNote:
      'Public defenders employed by government public defender offices qualify for PSLF. Many public defenders carry law school debt of $150,000+, making PSLF extremely valuable — often saving $100,000+ after 10 years.',
    perkinsCancellation: false,
    incomeTendency: 'lower',
    keywords: ['public defender student loan forgiveness', 'lawyer PSLF public defender', 'law school loan forgiveness public defender'],
    description:
      'Public defenders carry massive law school debt on government salaries. PSLF is life-changing for this profession — 10 years of lower IBR payments followed by tax-free forgiveness of remaining six-figure balances.',
    commonEmployers: ['State and county public defender offices', 'Federal public defender offices', 'Legal aid organizations (501(c)(3))', 'Government law offices'],
    commonLoanAmount: '$100,000–$250,000',
  },
  {
    slug: 'government-attorney',
    displayName: 'Government Attorney',
    pluralName: 'Government Attorneys',
    medianSalary: 84000,
    pslfEligible: true,
    pslfNote:
      'Government attorneys — including those at federal agencies, state attorney general offices, district attorney offices, and public interest law organizations — qualify for PSLF. Law school debt averaging $150,000+ makes PSLF extremely impactful.',
    perkinsCancellation: false,
    incomeTendency: 'moderate',
    keywords: ['government attorney student loan forgiveness', 'lawyer PSLF government', 'attorney general student loans', 'government lawyer loan forgiveness'],
    description:
      'Government attorneys and public interest lawyers with law school debt are strong PSLF candidates. The combination of six-figure debt, government salaries, and 10-year forgiveness can yield $80,000–$150,000 in tax-free forgiveness.',
    commonEmployers: ['Federal agencies (DOJ, FTC, SEC, EPA, etc.)', 'State attorney general offices', 'District attorney offices', 'Public interest law firms (501(c)(3))'],
    commonLoanAmount: '$100,000–$250,000',
  },
];

export function getProfessionBySlug(slug: string): ProfessionData | undefined {
  return PROFESSIONS.find((p) => p.slug === slug);
}

export function formatSalary(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}
