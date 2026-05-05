import { useState } from "react";
import Layout from "@/components/Layout";
import InternshipUploader from '@/components/InternshipUploader';
import JobSelector from "@/components/JobSelector";
import InternshipResults from '@/components/InternshipResults';
import { VerificationResult } from '@/types/verification';
import { verifyInternship } from '@/api/internshipService';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import GradientText from "@/components/ui/GradientText";
import InternshipVerifier from '@/components/InternshipVerifier';

const InternshipVerificationPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [targetJob, setTargetJob] = useState<string | null>(null);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
    setResult(null);
    setError(null);
  };

  const handleJobSelected = (selectedJob: string | null) => {
    setTargetJob(selectedJob);
    setResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please upload a resume first");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const verificationResult = await verifyInternship(file, targetJob);
      setResult(verificationResult);
      toast.success("Analysis completed successfully!");
    } catch (err) {
      console.error("Analysis error:", err);
      const errorMessage = err instanceof Error ? err.message : "Analysis failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 " >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={11}
              showBorder={false}
              className="text-5xl "
            >
              <p className="mb-5">
              Internship Verifier
              </p>
            </GradientText>

            <p className="text-xl text-gray-600 dark:text-gray-300 ">
              Upload an internship offer or company details to verify its legitimacy
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-full max-w-xl">
                <InternshipUploader onFileSelected={handleFileSelected} />
              </div>
            </div>
            <Card className="bg-jobfence-light dark:bg-gray-800 p-6 text-center">
              <Button
                className="mx-auto bg-jobfence-primary hover:bg-jobfence-primary/90 dark:bg-jobfence-secondary dark:hover:bg-jobfence-secondary/90 px-5 py-2 rounded-md text-base font-medium min-w-[160px]"
                size="sm"
                onClick={handleAnalyze}
                disabled={!file || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Verify Internship"
                )}
              </Button>
            </Card>
            <InternshipResults result={result} loading={isAnalyzing} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InternshipVerificationPage;