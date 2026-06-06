import { useState } from 'react';
import { verifyInternship } from '@/api/internshipService';
import JobSelector from './JobSelector';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { VerificationResult } from '@/types/verification';
import InternshipUploader from './InternshipUploader';
import InternshipResults from './InternshipResults';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

export default function InternshipVerifier() {
  const [activeTab, setActiveTab] = useState<string>('file');
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [targetJob, setTargetJob] = useState<string | null>(null);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (activeTab === 'file' && !file) {
      toast.error('Please upload the file first');
      return;
    }
    if (activeTab === 'text' && !text.trim()) {
      toast.error('Please paste the job text first');
      return;
    }
    if (activeTab === 'url' && !url.trim()) {
      toast.error('Please paste the job URL first');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        file: activeTab === 'file' ? file : null,
        text: activeTab === 'text' ? text : null,
        url: activeTab === 'url' ? url : null,
      };
      const verification = await verifyInternship(payload, targetJob);
      setResult(verification);
      toast.success('Check complete!');
    } catch (error) {
      toast.error('Verifier failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const hasInput = 
    (activeTab === 'file' && file) || 
    (activeTab === 'text' && text.trim()) ||
    (activeTab === 'url' && url.trim());

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center dark:text-white">
        Job Verifier
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="file">Upload File</TabsTrigger>
              <TabsTrigger value="text">Paste Text</TabsTrigger>
              <TabsTrigger value="url">Paste URL</TabsTrigger>
            </TabsList>
            
            <TabsContent value="file" className="mt-4">
              <InternshipUploader onFileSelected={setFile} />
            </TabsContent>
            
            <TabsContent value="text" className="mt-4">
              <Card className="p-4 dark:bg-gray-800">
                <h3 className="text-sm font-medium mb-2 dark:text-white">
                  Paste Job Posting Text
                </h3>
                <Textarea
                  placeholder="Paste the job description, requirements, or offer text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[160px] dark:bg-gray-900 dark:border-gray-700 dark:text-white resize-y"
                />
              </Card>
            </TabsContent>

            <TabsContent value="url" className="mt-4">
              <Card className="p-4 dark:bg-gray-800">
                <h3 className="text-sm font-medium mb-2 dark:text-white">
                  Paste Job Posting URL
                </h3>
                <input
                  type="url"
                  placeholder="https://example.com/jobs/internship-offer"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                />
              </Card>
            </TabsContent>
          </Tabs>

          <JobSelector onJobSelected={setTargetJob} />
        </div>

        <div>
          <InternshipResults result={result} loading={loading} />
          {hasInput && (
            <Button 
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full mt-4 bg-resume-primary hover:bg-resume-primary/90 text-white dark:bg-resume-secondary dark:hover:bg-resume-secondary/90"
            >
              {loading ? 'Analyzing...' : 'Check Posting'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}