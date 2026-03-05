import { motion } from "framer-motion";
import MonthGrid from "./MonthGrid";

interface YearPageProps {
  yearLabel: string;
  months: { month: string; year: number }[];
}

const PLACEHOLDER = "/placeholder.svg";

const YearPage = ({ yearLabel, months }: YearPageProps) => {
  // Determine which year folder to use based on the yearLabel
  const yearIndex = yearLabel.toLowerCase().includes("one") ? 1 : 
                    yearLabel.toLowerCase().includes("two") ? 2 : 3;

  return (
    <div className="relative z-10 min-h-screen">
      <div className="mx-auto max-w-lg px-4 py-12 md:max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center font-display text-3xl font-bold text-gold-light md:text-5xl"
        >
          {yearLabel}
        </motion.h2>

        {months.map(({ month, year }) => {
          const monthLower = month.toLowerCase().trim();
          
          // Special Case: In Year Three, there's a March 2025 and a March 2026.
          // For March 2026, we look for a folder named "march_2026".
          const folderName = (yearIndex === 3 && monthLower === "march" && year === 2026) 
            ? "march_2026" 
            : monthLower;

          const photos = Array.from({ length: 5 }, (_, i) => 
            `/photos/year${yearIndex}/${folderName}/${i + 1}.jpg`
          );
          
          return (
            <MonthGrid
              key={`${month}-${year}`}
              month={month}
              year={year}
              photos={photos}
            />
          );
        })}
      </div>
    </div>
  );
};

export default YearPage;
