import { motion } from "framer-motion";

const LoveLetterPage = () => {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-lg"
      >
        {/* Floral decorations - Lily top-left */}
        <svg className="absolute -left-6 -top-6 h-24 w-24 text-gold-light opacity-60 md:-left-10 md:-top-10 md:h-32 md:w-32" viewBox="0 0 100 100" fill="none">
          {/* Lily petals */}
          <path d="M50 10 C55 30, 75 35, 50 55 C25 35, 45 30, 50 10Z" fill="currentColor" opacity="0.7" />
          <path d="M50 10 C60 25, 80 20, 65 45 C45 30, 50 20, 50 10Z" fill="currentColor" opacity="0.5" />
          <path d="M50 10 C40 25, 20 20, 35 45 C55 30, 50 20, 50 10Z" fill="currentColor" opacity="0.5" />
          {/* Stem */}
          <path d="M50 55 Q48 70, 50 90" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
          <path d="M50 70 Q40 65, 35 55" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
        </svg>

        {/* Peony bottom-right */}
        <svg className="absolute -bottom-6 -right-6 h-24 w-24 text-gold opacity-50 md:-bottom-10 md:-right-10 md:h-32 md:w-32" viewBox="0 0 100 100" fill="none">
          {/* Peony layers */}
          <circle cx="50" cy="50" r="20" fill="currentColor" opacity="0.3" />
          <circle cx="50" cy="50" r="14" fill="currentColor" opacity="0.4" />
          <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.6" />
          {/* Petals */}
          <ellipse cx="50" cy="28" rx="10" ry="15" fill="currentColor" opacity="0.3" />
          <ellipse cx="72" cy="50" rx="15" ry="10" fill="currentColor" opacity="0.3" />
          <ellipse cx="50" cy="72" rx="10" ry="15" fill="currentColor" opacity="0.3" />
          <ellipse cx="28" cy="50" rx="15" ry="10" fill="currentColor" opacity="0.3" />
          {/* Leaves */}
          <path d="M75 75 Q85 85, 90 95" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
          <path d="M78 78 Q88 75, 95 80" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
        </svg>

        {/* Lily top-right */}
        <svg className="absolute -right-4 -top-4 h-16 w-16 text-gold opacity-40 md:-right-6 md:h-20 md:w-20" viewBox="0 0 100 100" fill="none">
          <path d="M50 15 C55 35, 70 40, 50 58 C30 40, 45 35, 50 15Z" fill="currentColor" opacity="0.6" />
          <path d="M50 58 Q49 75, 50 90" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
        </svg>

        {/* Peony bottom-left */}
        <svg className="absolute -bottom-4 -left-4 h-16 w-16 text-gold-light opacity-40 md:-left-6 md:h-20 md:w-20" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="18" fill="currentColor" opacity="0.25" />
          <circle cx="50" cy="50" r="12" fill="currentColor" opacity="0.35" />
          <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.5" />
          <ellipse cx="50" cy="30" rx="8" ry="12" fill="currentColor" opacity="0.25" />
          <ellipse cx="70" cy="50" rx="12" ry="8" fill="currentColor" opacity="0.25" />
          <ellipse cx="50" cy="70" rx="8" ry="12" fill="currentColor" opacity="0.25" />
          <ellipse cx="30" cy="50" rx="12" ry="8" fill="currentColor" opacity="0.25" />
        </svg>

        {/* Letter card */}
        <div className="rounded-2xl border border-gold/30 bg-ivory/90 px-8 py-10 shadow-2xl backdrop-blur-md md:px-12 md:py-14">
          <h2 className="mb-6 text-center font-display text-3xl font-bold text-gold-dark md:text-4xl">
            My Dearest Love
          </h2>

          <div className="min-h-[300px] rounded-lg border border-border/50 bg-background/50 p-6">
            <p className="font-body text-base leading-relaxed text-muted-foreground italic">
              Write your love letter here...
            </p>
          </div>

          <div className="mt-8 text-right font-display text-lg text-gold-dark italic">
            Forever yours ♥
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoveLetterPage;
