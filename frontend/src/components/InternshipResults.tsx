import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Lightbulb, AlertTriangle, CheckCircle2, ShieldCheck, ShieldAlert, Bot, Brain, ListChecks } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { VerificationResult } from "@/types/verification";

interface InternshipResultsProps {
  result: VerificationResult | null;
  loading: boolean;
  error?: string | null;
}

const InternshipResults = ({ result, loading, error }: InternshipResultsProps) => {
  // Loading state
  if (loading) {
    return (
      <Card className="animate-pulse dark:bg-gray-800">
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-full mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-3 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Verification Failed</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  // Empty state
  if (!result) {
    return (
      <Alert className="dark:bg-gray-800 dark:border-gray-700">
        <Info className="h-4 w-4 text-resume-primary dark:text-resume-secondary" />
        <AlertTitle className="dark:text-white">Ready to verify</AlertTitle>
        <AlertDescription className="dark:text-gray-400">
          Upload a file, paste job description text, or input a URL to run the 3-tier verification.
        </AlertDescription>
      </Alert>
    );
  }

  const { score, target_job, tier1_llm, tier2_rules, tier3_ml } = result;

  // Calculate score colors & status text
  const getScoreInfo = (score: number) => {
    if (score >= 80) return { color: "text-green-500", progressColor: "bg-green-500", status: "Legitimate / Safe", icon: ShieldCheck };
    if (score >= 60) return { color: "text-yellow-500", progressColor: "bg-yellow-500", status: "Caution / Moderate Risk", icon: AlertTriangle };
    return { color: "text-red-500", progressColor: "bg-red-500", status: "Suspicious / High Risk", icon: ShieldAlert };
  };

  const scoreInfo = getScoreInfo(score);
  const StatusIcon = scoreInfo.icon;

  const getSeverityBadgeColor = (severity: string) => {
    if (severity === 'high') return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
    if (severity === 'medium') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
  };

  return (
    <Card className="shadow-lg border dark:border-gray-700 dark:bg-gray-800">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold dark:text-white">JobFence Trust Score</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Target: <span className="font-medium">{target_job || "General"}</span>
            </p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-extrabold ${scoreInfo.color} flex items-center gap-1.5`}>
              <StatusIcon className="h-6 w-6" />
              {score}%
            </div>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{scoreInfo.status}</span>
          </div>
        </div>
        <Progress value={score} className="h-2.5 mt-3" />
      </CardHeader>

      <CardContent className="space-y-6">
        <Separator className="dark:bg-gray-700" />

        {/* Tier 1: Agentic LLM Analysis */}
        <section className="space-y-3">
          <h3 className="flex items-center gap-2 text-md font-bold dark:text-white">
            <Bot className="h-5 w-5 text-blue-500" />
            Tier 1: AI Agent Analysis (n8n + LLM)
          </h3>
          <Card className="p-4 bg-blue-50/50 dark:bg-blue-950/10 border-blue-100 dark:border-blue-900/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-blue-800 dark:text-blue-400 uppercase tracking-wide">Analysis Summary</span>
              <Badge variant="outline" className="text-xs border-blue-300 text-blue-800 dark:text-blue-400 dark:border-blue-800">
                Score: {tier1_llm.score}%
              </Badge>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {tier1_llm.explanation}
            </p>
            {tier1_llm.suggestions.length > 0 && (
              <div>
                <span className="text-xs font-bold text-gray-600 dark:text-gray-400 flex items-center gap-1.5 mb-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  Actionable Verification Steps
                </span>
                <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400 pl-4 list-disc">
                  {tier1_llm.suggestions.map((sug, i) => (
                    <li key={i} className="leading-normal">{sug}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </section>

        <Separator className="dark:bg-gray-700" />

        {/* Tier 2: Rule-Based Checker */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="flex items-center gap-2 text-md font-bold dark:text-white">
              <ListChecks className="h-5 w-5 text-purple-500" />
              Tier 2: Rule-Based Checker
            </h3>
            <Badge className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
              Rule Score: {tier2_rules.score}%
            </Badge>
          </div>

          {tier2_rules.flags.length > 0 ? (
            <div className="space-y-2">
              {tier2_rules.flags.map((flag, idx) => (
                <div key={idx} className="flex gap-2 items-start text-xs border rounded-lg p-2.5 dark:bg-gray-900/30 dark:border-gray-700">
                  <Badge variant="outline" className={`shrink-0 capitalize font-bold ${getSeverityBadgeColor(flag.severity)}`}>
                    {flag.severity} Risk
                  </Badge>
                  <span className="text-gray-600 dark:text-gray-400">{flag.message}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-2 items-center text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/10 border border-green-100 dark:border-green-900/30 p-3 rounded-lg">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>No typical fraud rule violations or triggers were detected in the description.</span>
            </div>
          )}
        </section>

        <Separator className="dark:bg-gray-700" />

        {/* Tier 3: ML Classifier */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="flex items-center gap-2 text-md font-bold dark:text-white">
              <Brain className="h-5 w-5 text-green-500" />
              Tier 3: ML Spam Classifier
            </h3>
            <Badge className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
              ML Score: {tier3_ml.score}%
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 rounded-lg">
              <div className="text-xs text-red-600 dark:text-red-400 font-semibold mb-1">Scam Probability</div>
              <div className="text-lg font-bold text-red-700 dark:text-red-400">{tier3_ml.scam_probability}%</div>
            </div>
            <div className="p-3 bg-green-50/50 dark:bg-green-950/10 border border-green-100 dark:border-green-900/30 rounded-lg">
              <div className="text-xs text-green-600 dark:text-green-400 font-semibold mb-1">Legit Probability</div>
              <div className="text-lg font-bold text-green-700 dark:text-green-400">{(100 - tier3_ml.scam_probability).toFixed(1)}%</div>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default InternshipResults;