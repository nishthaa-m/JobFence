import Layout from "@/components/Layout";
import GradientText from "@/components/ui/GradientText";
const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 z-[-3]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-jobfence-primary dark:text-jobfence-secondary mb-4">
              <span className="inline">
              About{" "}
              <span className="inline"><GradientText
                colors={["#9BBD67", "#26C168", "#92C8C0", "#4079ff", "#E3F1E8", "#515039", "#88FDE9", "#0B532F"]}
                animationSpeed={10}
                showBorder={false}
                className="text-2x1 font-semibold pb-2 inline"
              >JobFence</GradientText>
              </span>
              </span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400">
              Protecting students and job seekers from internship scams with AI-powered verification.
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert prose-headings:text-jobfence-primary prose-a:text-jobfence-primary max-w-none">
            <p>
              <strong>JobFence</strong> is your trusted partner in verifying the authenticity of internship offers. We use advanced AI and data analysis to help you avoid fraudulent companies and unsafe opportunities, ensuring your career journey starts on solid ground.
            </p>

            <h2 className="mt-12 mb-4 text-2xl font-semibold text-jobfence-primary dark:text-jobfence-secondary">How Our Technology Works</h2>
            <p>
              Our system leverages machine learning, official databases, and scam alert sources to check internship offers and company legitimacy. Upload your offer letter or enter company details, and our AI cross-references them with trusted sources, detecting red flags and providing a trust score instantly.
            </p>

            <h2 className="mt-12 mb-4 text-2xl font-semibold text-jobfence-primary dark:text-jobfence-secondary">Getting Started</h2>
            <ol>
              <li><strong>Upload Your Internship Offer</strong>: Upload your offer letter (PDF/DOCX) or enter company information for verification.</li>
              <li><strong>Receive Instant Results</strong>: Get a detailed report on the legitimacy of the offer, company background, and any detected warning signs.</li>
              <li><strong>Stay Safe</strong>: Use our recommendations to make informed decisions and avoid scams.</li>
            </ol>

            <h2 className="mt-12 mb-4 text-2xl font-semibold text-jobfence-primary dark:text-jobfence-secondary">Our Mission</h2>
            <p>
              At JobFence, we believe everyone deserves a safe and fair start to their career. Our mission is to empower students and job seekers with tools to verify opportunities, prevent exploitation, and build trust in the internship market.
            </p>

            <h2 className="mt-12 mb-4 text-2xl font-semibold text-jobfence-primary dark:text-jobfence-secondary">Our Commitment to Your Privacy</h2>
            <p>
              Your data is yours. All verifications are processed securely and privately, in real-time. We never store your documents or personal information unless you choose to save them. No third-party sharing. No surprises.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
