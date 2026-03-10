import React, { useState, useEffect, useRef } from "react";
import heic2any from "heic2any";

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const SmartImage: React.FC<SmartImageProps> = ({ src, ...props }) => {
  const [imageSrc, setImageSrc] = useState<string>(""); 
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Split classes: those for the container and those for the image
  const allCurrentClasses = props.className || "";
  const layoutClasses = allCurrentClasses.split(" ").filter(c => 
    c === "absolute" || c === "relative" || c === "inset-0" || 
    c.startsWith("z-") || c === "h-full" || c === "w-full" ||
    c.startsWith("top-") || c.startsWith("left-") || c.startsWith("right-") || c.startsWith("bottom-")
  ).join(" ");
  
  const imageOnlyClasses = allCurrentClasses.split(" ").filter(c => 
    !layoutClasses.split(" ").includes(c)
  ).join(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  useEffect(() => {
    if (!isVisible) return;

    let isMounted = true;
    let objectUrl: string | null = null;

    const loadImage = async () => {
      try {
        setLoading(true);
        const response = await fetch(src);
        if (!response.ok) throw new Error("Failed to fetch image");
        
        const blob = await response.blob();
        
        // --- Magic Byte Detection ---
        const buffer = await blob.slice(0, 12).arrayBuffer();
        const header = new Uint8Array(buffer);
        const headerHex = Array.from(header).map(b => b.toString(16).padStart(2, '0')).join('').toLowerCase();
        const ftyp = String.fromCharCode(...Array.from(header.slice(4, 12)));

        const isHeic = ftyp.includes("ftypheic") || 
                       ftyp.includes("ftypmif1") || 
                       ftyp.includes("ftypheis") || 
                       ftyp.includes("ftyphevc") ||
                       ftyp.includes("ftypmsf1");

        if (isHeic) {
          const convertedBlob = await heic2any({
            blob,
            toType: "image/jpeg",
            quality: 0.6
          });
          
          if (isMounted) {
            const finalBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
            objectUrl = URL.createObjectURL(finalBlob);
            setImageSrc(objectUrl);
          }
        } else {
          if (isMounted) {
            objectUrl = URL.createObjectURL(blob);
            setImageSrc(objectUrl);
          }
        }
      } catch (error) {
        console.error("Error loading image:", src, error);
        if (isMounted) setImageSrc("/placeholder.svg");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadImage();

    return () => {
      isMounted = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src, isVisible]);

  return (
    <div 
      ref={imgRef} 
      className={`${layoutClasses} overflow-hidden rounded-lg bg-black/5 ${!layoutClasses.includes('absolute') && !layoutClasses.includes('relative') ? 'relative' : ''}`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent opacity-50" />
        </div>
      )}
      {imageSrc && (
        <img 
          src={imageSrc} 
          {...props} 
          loading="lazy"
          className={`${imageOnlyClasses} w-full h-full ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        />
      )}
    </div>
  );
};

export default SmartImage;
