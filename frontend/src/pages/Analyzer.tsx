import Layout from "@/components/Layout";
import InternshipVerifier from '@/components/InternshipVerifier';

const InternshipVerificationPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <InternshipVerifier />
      </div>
    </Layout>
  );
};

export default InternshipVerificationPage;