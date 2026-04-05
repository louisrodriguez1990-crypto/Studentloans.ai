export interface StateData {
  slug: string;
  name: string;
  abbreviation: string;
  avgDebt: number; // dollars
  borrowerCount: number; // approximate federal borrowers
  totalDebt: number; // billions, approximate
  stateProgramUrl?: string;
  stateProgramName?: string;
  stateProgramNote?: string;
  region: 'northeast' | 'southeast' | 'midwest' | 'southwest' | 'west';
}

export const STATES: StateData[] = [
  { slug: 'alabama', name: 'Alabama', abbreviation: 'AL', avgDebt: 37800, borrowerCount: 620000, totalDebt: 23.4, region: 'southeast' },
  { slug: 'alaska', name: 'Alaska', abbreviation: 'AK', avgDebt: 34200, borrowerCount: 88000, totalDebt: 3.0, region: 'west', stateProgramName: 'Alaska Commission on Postsecondary Education Loan Repayment', stateProgramUrl: 'https://acpe.alaska.gov', stateProgramNote: 'Alaska offers loan repayment assistance for certain healthcare professionals and teachers in rural areas.' },
  { slug: 'arizona', name: 'Arizona', abbreviation: 'AZ', avgDebt: 36100, borrowerCount: 910000, totalDebt: 32.9, region: 'southwest' },
  { slug: 'arkansas', name: 'Arkansas', abbreviation: 'AR', avgDebt: 34900, borrowerCount: 410000, totalDebt: 14.3, region: 'southeast' },
  { slug: 'california', name: 'California', abbreviation: 'CA', avgDebt: 38200, borrowerCount: 3900000, totalDebt: 149.0, region: 'west', stateProgramName: 'California Student Loan Repayment Program', stateProgramUrl: 'https://oshpd.ca.gov/loans-scholarships-grants/', stateProgramNote: 'California offers loan repayment for healthcare professionals working in underserved areas through the HCAI.' },
  { slug: 'colorado', name: 'Colorado', abbreviation: 'CO', avgDebt: 37500, borrowerCount: 740000, totalDebt: 27.8, region: 'west' },
  { slug: 'connecticut', name: 'Connecticut', abbreviation: 'CT', avgDebt: 38900, borrowerCount: 510000, totalDebt: 19.8, region: 'northeast' },
  { slug: 'delaware', name: 'Delaware', abbreviation: 'DE', avgDebt: 39200, borrowerCount: 130000, totalDebt: 5.1, region: 'northeast' },
  { slug: 'florida', name: 'Florida', abbreviation: 'FL', avgDebt: 37100, borrowerCount: 2600000, totalDebt: 96.5, region: 'southeast', stateProgramName: 'Florida Nursing Student Loan Forgiveness Program', stateProgramUrl: 'https://ahca.myflorida.com', stateProgramNote: 'Florida offers forgiveness for nurses working in public health facilities.' },
  { slug: 'georgia', name: 'Georgia', abbreviation: 'GA', avgDebt: 39800, borrowerCount: 1400000, totalDebt: 55.7, region: 'southeast' },
  { slug: 'hawaii', name: 'Hawaii', abbreviation: 'HI', avgDebt: 34600, borrowerCount: 160000, totalDebt: 5.5, region: 'west' },
  { slug: 'idaho', name: 'Idaho', abbreviation: 'ID', avgDebt: 33100, borrowerCount: 220000, totalDebt: 7.3, region: 'west' },
  { slug: 'illinois', name: 'Illinois', abbreviation: 'IL', avgDebt: 37700, borrowerCount: 1700000, totalDebt: 64.1, region: 'midwest', stateProgramName: 'Illinois Nurse Educator Loan Repayment Program', stateProgramUrl: 'https://dph.illinois.gov', stateProgramNote: 'Illinois offers repayment assistance for nurse educators at Illinois nursing schools.' },
  { slug: 'indiana', name: 'Indiana', abbreviation: 'IN', avgDebt: 33400, borrowerCount: 880000, totalDebt: 29.4, region: 'midwest' },
  { slug: 'iowa', name: 'Iowa', abbreviation: 'IA', avgDebt: 31200, borrowerCount: 440000, totalDebt: 13.7, region: 'midwest', stateProgramName: 'Iowa Health & Wellness Rural Loan Repayment', stateProgramUrl: 'https://idph.iowa.gov', stateProgramNote: 'Iowa offers loan repayment for health professionals in rural and underserved areas.' },
  { slug: 'kansas', name: 'Kansas', abbreviation: 'KS', avgDebt: 32900, borrowerCount: 400000, totalDebt: 13.2, region: 'midwest', stateProgramName: 'Kansas State Loan Repayment Program', stateProgramUrl: 'https://www.kdheks.gov', stateProgramNote: 'Kansas offers loan repayment for primary care clinicians in Health Professional Shortage Areas.' },
  { slug: 'kentucky', name: 'Kentucky', abbreviation: 'KY', avgDebt: 34100, borrowerCount: 620000, totalDebt: 21.2, region: 'southeast' },
  { slug: 'louisiana', name: 'Louisiana', abbreviation: 'LA', avgDebt: 36400, borrowerCount: 650000, totalDebt: 23.7, region: 'southeast' },
  { slug: 'maine', name: 'Maine', abbreviation: 'ME', avgDebt: 33800, borrowerCount: 200000, totalDebt: 6.8, region: 'northeast', stateProgramName: 'Maine Dental Education Loan Repayment Program', stateProgramUrl: 'https://www.maine.gov', stateProgramNote: 'Maine offers dental education loan repayment for dentists working in underserved areas.' },
  { slug: 'maryland', name: 'Maryland', abbreviation: 'MD', avgDebt: 42100, borrowerCount: 840000, totalDebt: 35.4, region: 'northeast', stateProgramName: 'Maryland Student Loan Debt Relief Tax Credit', stateProgramUrl: 'https://mhec.maryland.gov', stateProgramNote: 'Maryland offers a tax credit of up to $5,000/year for student loan payments. Apply by September 15.' },
  { slug: 'massachusetts', name: 'Massachusetts', abbreviation: 'MA', avgDebt: 38700, borrowerCount: 990000, totalDebt: 38.3, region: 'northeast' },
  { slug: 'michigan', name: 'Michigan', abbreviation: 'MI', avgDebt: 34900, borrowerCount: 1300000, totalDebt: 45.4, region: 'midwest' },
  { slug: 'minnesota', name: 'Minnesota', abbreviation: 'MN', avgDebt: 33600, borrowerCount: 820000, totalDebt: 27.6, region: 'midwest', stateProgramName: 'Minnesota Rural Physician Loan Forgiveness Program', stateProgramUrl: 'https://www.revisor.mn.gov', stateProgramNote: 'Minnesota forgives up to $20,000 in student loans for rural physicians.' },
  { slug: 'mississippi', name: 'Mississippi', abbreviation: 'MS', avgDebt: 36800, borrowerCount: 430000, totalDebt: 15.8, region: 'southeast' },
  { slug: 'missouri', name: 'Missouri', abbreviation: 'MO', avgDebt: 34700, borrowerCount: 870000, totalDebt: 30.2, region: 'midwest' },
  { slug: 'montana', name: 'Montana', abbreviation: 'MT', avgDebt: 32400, borrowerCount: 140000, totalDebt: 4.5, region: 'west' },
  { slug: 'nebraska', name: 'Nebraska', abbreviation: 'NE', avgDebt: 30800, borrowerCount: 280000, totalDebt: 8.6, region: 'midwest' },
  { slug: 'nevada', name: 'Nevada', abbreviation: 'NV', avgDebt: 35700, borrowerCount: 450000, totalDebt: 16.1, region: 'west' },
  { slug: 'new-hampshire', name: 'New Hampshire', abbreviation: 'NH', avgDebt: 39600, borrowerCount: 200000, totalDebt: 7.9, region: 'northeast' },
  { slug: 'new-jersey', name: 'New Jersey', abbreviation: 'NJ', avgDebt: 39100, borrowerCount: 1200000, totalDebt: 46.9, region: 'northeast' },
  { slug: 'new-mexico', name: 'New Mexico', abbreviation: 'NM', avgDebt: 33900, borrowerCount: 270000, totalDebt: 9.2, region: 'southwest', stateProgramName: 'New Mexico High School Equalization Fund', stateProgramUrl: 'https://hed.state.nm.us', stateProgramNote: 'New Mexico offers various loan programs for state residents attending New Mexico institutions.' },
  { slug: 'new-york', name: 'New York', abbreviation: 'NY', avgDebt: 37400, borrowerCount: 2600000, totalDebt: 97.2, region: 'northeast', stateProgramName: 'New York Get On Your Feet Loan Forgiveness Program', stateProgramUrl: 'https://www.hesc.ny.gov', stateProgramNote: 'New York offers up to 24 months of federal loan forgiveness for eligible NY residents who completed NY college degrees.' },
  { slug: 'north-carolina', name: 'North Carolina', abbreviation: 'NC', avgDebt: 36900, borrowerCount: 1400000, totalDebt: 51.7, region: 'southeast' },
  { slug: 'north-dakota', name: 'North Dakota', abbreviation: 'ND', avgDebt: 30100, borrowerCount: 100000, totalDebt: 3.0, region: 'midwest' },
  { slug: 'ohio', name: 'Ohio', abbreviation: 'OH', avgDebt: 34200, borrowerCount: 1700000, totalDebt: 58.1, region: 'midwest' },
  { slug: 'oklahoma', name: 'Oklahoma', abbreviation: 'OK', avgDebt: 33100, borrowerCount: 530000, totalDebt: 17.5, region: 'southwest' },
  { slug: 'oregon', name: 'Oregon', abbreviation: 'OR', avgDebt: 36300, borrowerCount: 560000, totalDebt: 20.3, region: 'west' },
  { slug: 'pennsylvania', name: 'Pennsylvania', abbreviation: 'PA', avgDebt: 37200, borrowerCount: 1900000, totalDebt: 70.7, region: 'northeast', stateProgramName: 'Pennsylvania Primary Care Loan Repayment Program', stateProgramUrl: 'https://www.health.pa.gov', stateProgramNote: 'Pennsylvania offers up to $100,000 in loan repayment for primary care clinicians in underserved areas.' },
  { slug: 'rhode-island', name: 'Rhode Island', abbreviation: 'RI', avgDebt: 38100, borrowerCount: 150000, totalDebt: 5.7, region: 'northeast' },
  { slug: 'south-carolina', name: 'South Carolina', abbreviation: 'SC', avgDebt: 38400, borrowerCount: 700000, totalDebt: 26.9, region: 'southeast' },
  { slug: 'south-dakota', name: 'South Dakota', abbreviation: 'SD', avgDebt: 31700, borrowerCount: 120000, totalDebt: 3.8, region: 'midwest' },
  { slug: 'tennessee', name: 'Tennessee', abbreviation: 'TN', avgDebt: 35600, borrowerCount: 860000, totalDebt: 30.6, region: 'southeast' },
  { slug: 'texas', name: 'Texas', abbreviation: 'TX', avgDebt: 36500, borrowerCount: 3500000, totalDebt: 127.8, region: 'southwest', stateProgramName: 'Texas State Loan Repayment Program', stateProgramUrl: 'https://dshs.texas.gov', stateProgramNote: 'Texas offers loan repayment for primary care clinicians in Health Professional Shortage Areas.' },
  { slug: 'utah', name: 'Utah', abbreviation: 'UT', avgDebt: 30400, borrowerCount: 380000, totalDebt: 11.6, region: 'west' },
  { slug: 'vermont', name: 'Vermont', abbreviation: 'VT', avgDebt: 37100, borrowerCount: 100000, totalDebt: 3.7, region: 'northeast', stateProgramName: 'Vermont Doctor Loan Repayment Program', stateProgramUrl: 'https://www.healthvermont.gov', stateProgramNote: 'Vermont offers loan repayment assistance for primary care physicians serving underserved communities.' },
  { slug: 'virginia', name: 'Virginia', abbreviation: 'VA', avgDebt: 38900, borrowerCount: 1200000, totalDebt: 46.7, region: 'southeast' },
  { slug: 'washington', name: 'Washington', abbreviation: 'WA', avgDebt: 36800, borrowerCount: 1000000, totalDebt: 36.8, region: 'west', stateProgramName: 'Washington Health Professional Loan Repayment Program', stateProgramUrl: 'https://doh.wa.gov', stateProgramNote: 'Washington offers loan repayment for healthcare providers in Health Professional Shortage Areas.' },
  { slug: 'west-virginia', name: 'West Virginia', abbreviation: 'WV', avgDebt: 34100, borrowerCount: 250000, totalDebt: 8.5, region: 'southeast' },
  { slug: 'wisconsin', name: 'Wisconsin', abbreviation: 'WI', avgDebt: 32700, borrowerCount: 760000, totalDebt: 24.9, region: 'midwest' },
  { slug: 'wyoming', name: 'Wyoming', abbreviation: 'WY', avgDebt: 28900, borrowerCount: 70000, totalDebt: 2.0, region: 'west' },
];

export function getStateBySlug(slug: string): StateData | undefined {
  return STATES.find((s) => s.slug === slug);
}

export function formatBorrowerCount(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return n.toLocaleString();
}
