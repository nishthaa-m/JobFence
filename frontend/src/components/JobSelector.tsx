import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface JobSelectorProps {
  onJobSelected: (job: string | null) => void;
}

const JobSelector = ({ onJobSelected }: JobSelectorProps) => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  
  const jobs = [
    {
      id: "data-scientist",
      title: "Data Scientist",
      description: "Machine learning, statistics, and data analysis"
    },
    {
      id: "frontend-developer",
      title: "Frontend Developer",
      description: "UI development with JavaScript, React, HTML, CSS"
    },
    {
      id: "backend-developer",
      title: "Backend Developer",
      description: "Server-side applications with databases and APIs"
    },
    {
      id: "general",
      title: "General Analysis",
      description: "Verify internship without targeting a specific role"
    }
  ];

  const handleJobChange = (value: string) => {
    const jobTitle = value === "general" ? null : jobs.find(job => job.id === value)?.title || null;
    setSelectedJob(value);
    onJobSelected(jobTitle);
  };

  return (
    <Card>
      
    </Card>
  );
};

export default JobSelector;
