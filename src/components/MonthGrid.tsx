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

      <div className="grid grid-cols-3 grid-rows-2 gap-2 md:gap-3" style={{ aspectRatio: "3/4" }}>
        {/* Photo 1 - large, spans 2 rows. Optimized for horizontal images in vertical slot */}
        <div className="row-span-2 relative overflow-hidden rounded-lg bg-black/20 flex items-center justify-center">
          {/* Blurred Background to fill vertical space */}
          <img
            src={photos[0]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover blur-xl opacity-50 scale-110"
          />
          {/* The Actual Image - set to contain so it doesn't crop the sides of horizontal photos */}
          <img
            key={`${month}-${year}-0`}
            src={photos[0]}
            alt={`${month} ${year} - 1`}
            className="relative z-10 h-full w-full object-contain transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </div>

        {/* Photos 2-5 - smaller grid slots */}
        {photos.slice(1, 5).map((photo, i) => (
          <div key={i} className="relative overflow-hidden rounded-lg bg-black/10 flex items-center justify-center">
             <img
              key={`${month}-${year}-${i+1}`}
              src={photo}
              alt={`${month} ${year} - ${i + 2}`}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MonthGrid;
