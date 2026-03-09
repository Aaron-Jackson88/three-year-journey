import { motion } from "framer-motion";
import SmartImage from "./SmartImage";

interface MonthGridProps {
  month: string;
  year: number;
  photos: string[];
}

const MonthGrid = ({ month, year, photos }: MonthGridProps) => {
  const count = photos.length;

  const renderGrid = () => {
    switch (count) {
      case 1:
        return (
          <div className="relative overflow-hidden rounded-lg bg-black/20 flex items-center justify-center h-full">
            <SmartImage
              src={photos[0]}
              alt=""
              className="absolute inset-0 h-full w-full object-cover blur-xl opacity-50 scale-110"
            />
            <SmartImage
              src={photos[0]}
              alt={`${month} ${year} - 1`}
              className="relative z-10 h-full w-full object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-2 gap-2 md:gap-3 h-full">
            {photos.map((photo, i) => (
              <div key={i} className="relative overflow-hidden rounded-lg bg-black/10 flex items-center justify-center">
                <SmartImage
                  src={photo}
                  alt={`${month} ${year} - ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-2 grid-rows-2 gap-2 md:gap-3 h-full">
            <div className="row-span-2 relative overflow-hidden rounded-lg bg-black/20 flex items-center justify-center">
              <SmartImage
                src={photos[0]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover blur-xl opacity-50 scale-110"
              />
              <SmartImage
                src={photos[0]}
                alt={`${month} ${year} - 1`}
                className="relative z-10 h-full w-full object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>
            {photos.slice(1).map((photo, i) => (
              <div key={i} className="relative overflow-hidden rounded-lg bg-black/10 flex items-center justify-center">
                <SmartImage
                  src={photo}
                  alt={`${month} ${year} - ${i + 2}`}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 grid-rows-2 gap-2 md:gap-3 h-full">
            {photos.map((photo, i) => (
              <div key={i} className="relative overflow-hidden rounded-lg bg-black/10 flex items-center justify-center">
                <SmartImage
                  src={photo}
                  alt={`${month} ${year} - ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        );
      case 5:
      default:
        return (
          <div className="grid grid-cols-3 grid-rows-2 gap-2 md:gap-3 h-full">
            <div className="row-span-2 relative overflow-hidden rounded-lg bg-black/20 flex items-center justify-center">
              <SmartImage
                src={photos[0]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover blur-xl opacity-50 scale-110"
              />
              <SmartImage
                src={photos[0]}
                alt={`${month} ${year} - 1`}
                className="relative z-10 h-full w-full object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>
            {photos.slice(1, 5).map((photo, i) => (
              <div key={i} className="relative overflow-hidden rounded-lg bg-black/10 flex items-center justify-center">
                <SmartImage
                  src={photo}
                  alt={`${month} ${year} - ${i + 2}`}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        );
    }
  };

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

      <div className="w-full" style={{ aspectRatio: "3/4" }}>
        {renderGrid()}
      </div>
    </motion.div>
  );
};

export default MonthGrid;
