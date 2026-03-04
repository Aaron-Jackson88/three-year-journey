import { motion } from "framer-motion";
import MonthGrid from "./MonthGrid";

interface YearPageProps {
  yearLabel: string;
  months: { month: string; year: number }[];
}

const PLACEHOLDER = "/placeholder.svg";

const YearPage = ({ yearLabel, months }: YearPageProps) => {
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

        {months.map(({ month, year }) => (
          <MonthGrid
            key={`${month}-${year}`}
            month={month}
            year={year}
            photos={Array(5).fill(PLACEHOLDER)}
          />
        ))}
      </div>
    </div>
  );
};

export default YearPage;
