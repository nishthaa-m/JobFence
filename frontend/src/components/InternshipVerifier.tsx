import { useState } from 'react';
import { verifyInternship } from '@/api/internshipService';
import JobSelector from './JobSelector';
import ResumeUploader from './ResumeUploader';
import ResumeResults from './ResumeResults';
import { toast } from 'sonner';
import { Button } from 'react-day-picker';
import { VerificationResult } from '@/types/verification';
import InternshipUploader from './InternshipUploader';
import InternshipResults from './InternshipResults';

export default function InternshipVerifier() {
  const [file, setFile] = useState<File | null>(null);
  const [targetJob, setTargetJob] = useState<string | null>(null);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file) {
      toast.error('Please upload the file first');
      return;
    }

    setLoading(true);
    try {
      const verification = await verifyInternship(file, targetJob);
      setResult(verification);
    } catch (error) {
      toast.error('Verifier failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center dark:text-white">
        Job Verifier
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <InternshipUploader onFileSelected={setFile} />
          <JobSelector onJobSelected={setTargetJob} />
        </div>

        <div>
          <InternshipResults result={result} loading={loading} />
          {file && (
            <Button 
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full mt-4"
            >
              {loading ? 'Analyzing...' : 'Checking'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}