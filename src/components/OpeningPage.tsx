import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface OpeningPageProps {
  onBegin: () => void;
}

const OpeningPage = ({ onBegin }: OpeningPageProps) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Warm gold gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-light via-gold to-gold-dark" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 25% 25%, hsl(43 80% 46% / 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(43 90% 68% / 0.3) 0%, transparent 50%)',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="h-12 w-12 text-primary-foreground/80" fill="currentColor" />
        </motion.div>

        <h1 className="font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
          Ready to Travel Back
          <br />
          <span className="italic">3 Years Ago?</span>
        </h1>

        <p className="max-w-md font-body text-lg text-primary-foreground/70">
          A journey through our most beautiful memories together
        </p>

        <motion.button
          onClick={onBegin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 rounded-full border-2 border-primary-foreground/30 bg-primary-foreground/10 px-10 py-4 font-display text-lg font-semibold tracking-wide text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/20"
        >
          Begin Our Journey
        </motion.button>
      </motion.div>
    </div>
  );
};

export default OpeningPage;
