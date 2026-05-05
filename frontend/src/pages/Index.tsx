import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import Aurora from '@/components/ui/Aurora';
import ShinyText from "@/components/ui/ShinyText";
import GradientText from "@/components/ui/GradientText";
import Particles from "@/components/ui/particles";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pb-36">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={11}
              showBorder={false}
              className="text-5xl "
            >
              <p className="mb-5">
              AI-Powered Internship Verifier
              </p>
            </GradientText>
            <p className="text-xl mb-8">
              Verify the authenticity of internship offers, companies, and candidate applications using AI-driven verification. Prevent scams and mismatches with real-time validation.
            </p>

            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-gray-800 dark:hover:bg-gray-900 px-8 py-6 text-lg"
              asChild
            >
              <Link to="/analyzer"><ShinyText text="Verify Now" disabled={false} speed={5} className='custom-class' /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-jobfence-primary dark:text-jobfence-secondary">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-blue-600 dark:bg-gray-800">
              <CardContent className="pt-6 relative z-10">

                <div className="bg-jobfence-light dark:bg-gray-700 h-12 w-12 flex items-center justify-center rounded-full mb-4">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
                className="z-0"
              />
                <h3 className="text-xl font-bold mb-2 dark:text-white backdrop-blur-sm">Submit Details</h3>
                <p className="text-gray-600 dark:text-gray-300 backdrop-blur-sm ">
                   Upload the internship offer or enter company info. We verify its legitimacy against official databases and scam alerts.
                </p>
              </CardContent>
              
            </Card>

            <Card className="border-t-4 border-t-jobfence-secondary dark:bg-gray-800">
              <CardContent className="pt-6 relative z-10">
                <div className="bg-jobfence-light dark:bg-gray-700 h-12 w-12 flex items-center justify-center rounded-full mb-4">
                  <span className="text-xl font-bold text-jobfence-secondary">2</span>
                </div>
                <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
                className="z-0"
              />
                <h3 className="text-xl font-bold mb-2 dark:text-white backdrop-blur-sm">AI Verification</h3>
                
                <p className="text-gray-600 dark:text-gray-300 backdrop-blur-sm">
                  Our system cross-checks the internship with trusted sources.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-jobfence-accent dark:bg-gray-800">
              <CardContent className="pt-6 relative z-10">
                <div className="bg-jobfence-light dark:bg-gray-700 h-12 w-12 flex items-center justify-center rounded-full mb-4">
                  <span className="text-xl font-bold text-jobfence-accent">3</span>
                </div>
                <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
                className="z-0"
              />
                <h3 className="text-xl font-bold mb-2 dark:text-white backdrop-blur-sm">Get Results</h3>
                <p className="text-gray-600 dark:text-gray-300 backdrop-blur-sm">
                   Receive an instant Trust Score
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-jobfence-primary dark:text-jobfence-secondary">Avoid Scams - Verify Internships Instantly</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Our AI-powered checker helps students identify legitimate internships and avoid fraudulent offers with real-time verification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="bg-jobfence-primary rounded-full p-2 text-white mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 dark:text-jobfence-secondary">Company Validation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Verify if the company is registered and has a legitimate hiring history before applying.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-jobfence-primary rounded-full p-2 text-white mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 dark:text-jobfence-secondary">Red Flag Detection</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get alerts on suspicious internship terms, fake job postings, or unethical practices.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-jobfence-primary rounded-full p-2 text-white mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 dark:text-jobfence-secondary">Trust Score Rating</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Receive an instant safety rating for any internship offer.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-jobfence-primary rounded-full p-2 text-white mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 dark:text-jobfence-secondary">Immediate Feedback</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  No more guesswork—AI checks databases, reviews, and scam reports in seconds.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              className="bg-jobfence-primary hover:bg-jobfence-primary/90 dark:bg-jobfence-secondary dark:hover:bg-jobfence-secondary/90 px-8 text-white"
              size="lg"
              asChild
            >
              <Link to="/analyzer">Try It Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
