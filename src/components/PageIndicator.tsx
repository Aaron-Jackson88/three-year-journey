import { cn } from "@/lib/utils";

interface PageIndicatorProps {
  total: number;
  current: number;
  onNavigate: (index: number) => void;
}

const PageIndicator = ({ total, current, onNavigate }: PageIndicatorProps) => {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onNavigate(i)}
          className={cn(
            "h-2.5 rounded-full transition-all duration-300",
            i === current
              ? "w-8 bg-gold-light"
              : "w-2.5 bg-gold-light/40 hover:bg-gold-light/60"
          )}
          aria-label={`Go to page ${i + 1}`}
        />
      ))}
    </div>
  );
};

export default PageIndicator;
