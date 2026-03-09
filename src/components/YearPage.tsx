import { motion } from "framer-motion";
import MonthGrid from "./MonthGrid";
import photoManifest from "../photo-manifest.json";

interface YearPageProps {
  yearLabel: string;
  months: { month: string; year: number }[];
}

const YearPage = ({ yearLabel, months }: YearPageProps) => {
  // Determine which year folder to use based on the yearLabel
  const yearIndex = yearLabel.toLowerCase().includes("one") ? 1 : 
                    yearLabel.toLowerCase().includes("two") ? 2 : 3;

  const yearKey = `year${yearIndex}`;
  const manifestForYear = (photoManifest as any)[yearKey] || {};

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

        {months.filter(({ month, year }) => {
          const monthLower = month.toLowerCase().trim();
          const folderName = (yearIndex === 3 && monthLower === "march" && year === 2026) 
            ? "march_2026" 
            : (yearIndex === 3 && monthLower === "february" && year === 2026)
            ? "february_2026"
            : (yearIndex === 3 && monthLower === "january" && year === 2026)
            ? "january_2026"
            : monthLower;
          
          return manifestForYear[folderName] !== undefined;
        }).map(({ month, year }) => {
          const monthLower = month.toLowerCase().trim();
          
          // Special Case: In Year Three
          const folderName = (yearIndex === 3 && monthLower === "march" && year === 2026) 
            ? "march_2026" 
            : (yearIndex === 3 && monthLower === "february" && year === 2026)
            ? "february_2026"
            : (yearIndex === 3 && monthLower === "january" && year === 2026)
            ? "january_2026"
            : monthLower;

          const photoCount = manifestForYear[folderName] || 0;
          const photos = Array.from({ length: photoCount }, (_, i) => 
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
