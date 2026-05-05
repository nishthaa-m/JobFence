import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import GradientText from "@/components/ui/GradientText";

const Header = () => {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 backdrop-blur-md bg-white/30 dark:bg-black/20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold text-jobfence-primary dark:text-white">
            <GradientText
              colors={["#9BBD67", "#26C168", "#92C8C0", "#4079ff", "#E3F1E8", "#515039", "#88FDE9", "#0B532F"]}
              animationSpeed={10}
              showBorder={false}
              className="text-2x1"
            >
              JobFence
            </GradientText>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-jobfence-primary transition-colors dark:text-gray-300 dark:hover:text-white">
            Home
          </Link>
          <Link to="/analyzer" className="text-gray-600 hover:text-jobfence-primary transition-colors dark:text-gray-300 dark:hover:text-white">
            Verify
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-jobfence-primary transition-colors dark:text-gray-300 dark:hover:text-white">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="default"
            className="bg-resume-primary hover:bg-resume-primary/90 dark:bg-resume-secondary dark:hover:bg-resume-secondary/90"
            asChild
          >
            <Link to="/analyzer">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
