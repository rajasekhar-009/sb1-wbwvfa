export interface Student {
  id: number;
  name: string;
  rollNumber: string;
  grades: {
    subject: string;
    score: number;
  }[];
  attendance: number;
  extracurricularEngagement: number;
  riskScore: number;
}

export interface CounselingRecommendation {
  studentId: number;
  recommendation: string;
}