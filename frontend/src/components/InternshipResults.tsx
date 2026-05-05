import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export interface VerificationResult {
  score: number;
  matched_skills: Record<string, number>;
  missing_skills: Record<string, number>;
  recommendations: string[];
  target_job: string;
  projects?: Record<string, string[]>;
}

interface InternshipResultsProps {
  result: VerificationResult | null;
  loading: boolean;
  error?: string | null;
}

const InternshipResults = ({ result, loading, error }: InternshipResultsProps) => {
  // Loading state
  if (loading) {
    return (
      <Card className="animate-pulse">
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
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Ready to verify</AlertTitle>
        <AlertDescription>
          Upload a document to begin verification.
        </AlertDescription>
      </Alert>
    );
  }

  const { score, matched_skills, missing_skills, recommendations, target_job } = result;

  // Calculate score color
  const scoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  // Get badge variant based on skill importance
  const getBadgeVariant = (weight: number) => {
    if (weight >= 4) return "default";
    if (weight >= 3) return "secondary";
    return "outline";
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Analysis Results</CardTitle>
          <div className={`text-2xl font-bold ${scoreColor(score)}`}>
            {score}/100
          </div>
        </div>
        <Progress value={score} className="h-2" />
        <div className="text-sm text-muted-foreground">
          Target: <span className="font-medium">{target_job || "General"}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Separator />

        {/* Matched Skills Section */}
        <section>
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Matched Skills
          </h3>
          {Object.entries(matched_skills).length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {Object.entries(matched_skills)
                .sort(([, a], [, b]) => b - a)
                .map(([skill, weight]) => (
                  <Badge
                    key={skill}
                    variant={getBadgeVariant(weight)}
                    className="gap-1.5"
                  >
                    {skill}
                    <span className="text-xs opacity-80">({weight}/5)</span>
                  </Badge>
                ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No matching skills detected.
            </p>
          )}
        </section>

        {/* Missing Skills Section */}
        <section>
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Missing Important Skills
          </h3>
          {Object.entries(missing_skills).length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {Object.entries(missing_skills)
                .sort(([, a], [, b]) => b - a)
                .map(([skill, weight]) => (
                  <Badge
                    key={skill}
                    variant="destructive"
                    className="gap-1.5"
                  >
                    {skill}
                    <span className="text-xs opacity-80">({weight}/5)</span>
                  </Badge>
                ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No critical missing skills identified.
            </p>
          )}
        </section>

        {/* Recommendations Section */}
        <section>
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <Lightbulb className="h-5 w-5 text-blue-500" />
            Recommendations
          </h3>
          {recommendations.length > 0 ? (
            <ul className="space-y-3">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span className="text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              No specific recommendations available.
            </p>
          )}
        </section>
      </CardContent>
    </Card>
  );
};

export default InternshipResults;