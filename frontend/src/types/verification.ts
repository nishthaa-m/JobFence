export interface VerificationResult {
  score: number;
  matched_skills: Record<string, number>;
  missing_skills: Record<string, number>;
  recommendations: string[];
  target_job: string;
}