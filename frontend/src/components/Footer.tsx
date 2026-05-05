import { Mail, Github, Linkedin } from 'lucide-react';
import { Link } from "react-router-dom";
import Orb from '@/components/ui/Orb';
import GradientText from './ui/GradientText';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Footer Navigation */}
      <div className="bg-resume-light dark:bg-gray-900 pt-12 border-t border-gray-200 dark:border-gray-700 ">
        <div className="container mx-auto px-4 pb-8 relative ">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <div>
              <h3 className="text-xl font-bold text-resume-primary dark:text-white mb-4 ">
                <GradientText
                  colors={["#9BBD67", "#26C168", "#92C8C0", "#4079ff", "#E3F1E8", "#515039", "#88FDE9", "#0B532F"]}
                  animationSpeed={10}
                  showBorder={false}
                  className="text-4xl font-semibold  "
                >
                JobFence
                </GradientText>
                </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 ">
                Ensure Legitimate Internships & Detect Fraud.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-xl text-resume-primary dark:text-resume-secondary mb-4 ">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-resume-primary dark:text-gray-300 dark:hover:text-white transition-colors ">Home</Link>
                </li>
                <li>
                  <Link to="/analyzer" className="text-gray-600 hover:text-resume-primary dark:text-gray-300 dark:hover:text-white transition-colors ">Intership Verifier</Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-resume-primary dark:text-gray-300 dark:hover:text-white transition-colors ">About</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-xl text-resume-primary dark:text-resume-secondary mb-4 ">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-gray-600 hover:text-resume-primary dark:text-gray-300 dark:hover:text-white transition-colors ">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-600 hover:text-resume-primary dark:text-gray-300 dark:hover:text-white transition-colors">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>
          
        </div>

        {/* Footer */}
        <footer className="w-full bg-[#f0f0f0] dark:bg-[#0d1526] py-6 px-4 mt-4" >

          <div className="max-w-7xl mx-auto flex justify-between items-start text-black dark:text-slate-400">
            {/* Left Profile */}
            <div className="relative flex items-start space-x-4">
              {/* Decorative Square and Lines */}
              <div className="relative w-12 h-12">
                {/* Inner solid square */}
                <div className="absolute top-1 left-2 w-full h-full border-[3px] border-black dark:border-slate-400 z-10"></div>
                {/* Outer line square */}
                <div className="absolute top-0 left-1 w-full h-full border border-black dark:border-slate-400 z-0"></div>
                {/* Circle */}
                <div className="absolute -top-2 left-2 w-2 h-2 bg-black dark:bg-slate-400 rounded-full z-20"></div>
              </div>

              {/* Name and Social Links */}
              
            </div>

            {/* Logo */}
            <div className="hidden sm:block" style={{ width: '10%', height: '70px', position: 'relative' }}>
              <Orb
                hoverIntensity={0.5}
                rotateOnHover={true}
                hue={0}
                forceHoverState={false}
              />
            </div>

            {/* Right Profile */}
            <div className="flex items-start space-x-4">
              <div className="relative w-12 h-12">
                {/* Inner solid square */}
                <div className="absolute top-1 left-2 w-full h-full border-[3px] border-black dark:border-slate-400 z-10"></div>
                {/* Outer line square */}
                <div className="absolute top-0 left-1 w-full h-full border border-black dark:border-slate-400 z-0"></div>
                {/* Circle */}
                <div className="absolute -top-2 left-2 w-2 h-2 bg-black dark:bg-slate-400 rounded-full z-20"></div>
              </div>

              {/* Name and Social Links */}
              

            </div>
          </div>
        </footer>
      </div>
    </>


  );
};

export default Footer;