export interface RuleFlag {
  rule: string;
  severity: 'high' | 'medium' | 'low';
  message: string;
}

export interface VerificationResult {
  score: number;
  target_job: string;
  tier1_llm: {
    score: number;
    explanation: string;
    suggestions: string[];
  };
  tier2_rules: {
    score: number;
    flags: RuleFlag[];
  };
  tier3_ml: {
    score: number;
    scam_probability: number;
  };
}