import { motion } from "framer-motion";

interface MonthGridProps {
  month: string;
  year: number;
  photos: string[];
}

const MonthGrid = ({ month, year, photos }: MonthGridProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <h3 className="mb-4 font-display text-2xl font-semibold text-gold-light md:text-3xl">
        {month} {year}
      </h3>

      <div className="grid grid-cols-3 grid-rows-2 gap-2 md:gap-3" style={{ aspectRatio: "3/2" }}>
        {/* Photo 1 - large, spans 2 rows */}
        <div className="row-span-2 overflow-hidden rounded-lg">
          <img
            src={photos[0]}
            alt={`${month} ${year} - 1`}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        {/* Photos 2-5 - smaller grid */}
        {photos.slice(1, 5).map((photo, i) => (
          <div key={i} className="overflow-hidden rounded-lg">
            <img
              src={photo}
              alt={`${month} ${year} - ${i + 2}`}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MonthGrid;
