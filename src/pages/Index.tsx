import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OpeningPage from "@/components/OpeningPage";
import YearPage from "@/components/YearPage";
import LoveLetterPage from "@/components/LoveLetterPage";
import VideoBackground from "@/components/VideoBackground";
import PageIndicator from "@/components/PageIndicator";

const MONTHS = [
  "March", "April", "May", "June", "July", "August",
  "September", "October", "November", "December", "January", "February"
];

const YEAR1_MONTHS = MONTHS.map((m, i) => ({
  month: m,
  year: i < 10 ? 2023 : 2024,
}));

const YEAR2_MONTHS = MONTHS.map((m, i) => ({
  month: m,
  year: i < 10 ? 2024 : 2025,
}));

const YEAR3_MONTHS = [
  { month: "March", year: 2025 },
  { month: "April", year: 2025 },
  { month: "May", year: 2025 },
  { month: "June", year: 2025 },
  { month: "July", year: 2025 },
  { month: "August", year: 2025 },
  { month: "September", year: 2025 },
  { month: "October", year: 2025 },
  { month: "November", year: 2025 },
  { month: "December", year: 2025 },
  { month: "January", year: 2026 },
  { month: "February", year: 2026 },
  { month: "March", year: 2026 },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

// Helper to generate photo paths for a year
const generateYearPhotos = (yearNum: number, months: string[]) => {
  const data: Record<string, string[]> = {};
  months.forEach(m => {
    const monthLower = m.toLowerCase();
    data[m] = [
      `/photos/year${yearNum}/${monthLower}/1.jpg`,
      `/photos/year${yearNum}/${monthLower}/2.jpg`,
      `/photos/year${yearNum}/${monthLower}/3.jpg`,
      `/photos/year${yearNum}/${monthLower}/4.jpg`,
      `/photos/year${yearNum}/${monthLower}/5.jpg`,
    ];
  });
  return data;
};

const PHOTO_DATA: Record<string, Record<string, string[]>> = {
  "Year One": generateYearPhotos(1, MONTHS),
  "Year Two": generateYearPhotos(2, MONTHS),
  "Year Three": generateYearPhotos(3, ["March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"]),
};

const Index = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const navigate = useCallback((page: number) => {
    setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
  }, [currentPage]);

  const goNext = useCallback(() => {
    if (currentPage < 4) navigate(currentPage + 1);
  }, [currentPage, navigate]);

  const goPrev = useCallback(() => {
    if (currentPage > 0) navigate(currentPage - 1);
  }, [currentPage, navigate]);

  // Swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  const pages = [
    <OpeningPage key="opening" onBegin={goNext} />,
    <YearPage key="year1" yearLabel="Year One" months={YEAR1_MONTHS} photoData={PHOTO_DATA["Year One"]} />,
    <YearPage key="year2" yearLabel="Year Two" months={YEAR2_MONTHS} photoData={PHOTO_DATA["Year Two"]} />,
    <YearPage key="year3" yearLabel="Year Three" months={YEAR3_MONTHS} photoData={PHOTO_DATA["Year Three"]} />,
    <LoveLetterPage key="letter" />,
  ];

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Video background for pages 2-5 */}
      {currentPage > 0 && <VideoBackground />}

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentPage}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
          className={currentPage > 0 ? "h-screen overflow-y-auto" : "h-screen"}
        >
          {pages[currentPage]}
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      {currentPage > 0 && (
        <button
          onClick={goPrev}
          className="fixed left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-gold/20 p-3 text-gold-light backdrop-blur-sm transition-colors hover:bg-gold/40"
          aria-label="Previous page"
        >
          ‹
        </button>
      )}
      {currentPage < 4 && currentPage > 0 && (
        <button
          onClick={goNext}
          className="fixed right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-gold/20 p-3 text-gold-light backdrop-blur-sm transition-colors hover:bg-gold/40"
          aria-label="Next page"
        >
          ›
        </button>
      )}

      <PageIndicator total={5} current={currentPage} onNavigate={navigate} />
    </div>
  );
};

export default Index;
