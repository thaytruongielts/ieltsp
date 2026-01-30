
export interface StudentInfo {
  id: string;
  name: string;
  strengths: string;
  improvements: string;
  praise: string;
  paidUntil: string;
  nextPaymentPeriod: string;
  nextPaymentAmount: string;
  note: string;
  commitment: string;
  sessionDetails: string;
  strategy: string;
}

export interface LetterState {
  recipient: string;
  subject: string;
  students: StudentInfo[];
  summary: string;
  conditional: string;
  wishing: string;
  signature: string;
}
