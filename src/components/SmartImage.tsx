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
  }, [src]); // Re-observe if src changes

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
        // We look at the actual file header, NOT the extension.
        const buffer = await blob.slice(0, 12).arrayBuffer();
        const header = new Uint8Array(buffer);
        const headerHex = Array.from(header).map(b => b.toString(16).padStart(2, '0')).join('').toLowerCase();
        const ftyp = String.fromCharCode(...Array.from(header.slice(4, 12)));

        // HEIC/HEIF signatures: 'ftypheic', 'ftypmif1', 'ftypheis', 'ftyphevc', etc.
        const isHeic = ftyp.includes("ftypheic") || 
                       ftyp.includes("ftypmif1") || 
                       ftyp.includes("ftypheis") || 
                       ftyp.includes("ftyphevc") ||
                       ftyp.includes("ftypmsf1");

        // PNG signature: 89 50 4e 47
        const isPng = headerHex.startsWith("89504e47");
        
        // JPEG signature: ff d8 ff
        const isJpeg = headerHex.startsWith("ffd8ff");

        if (isHeic) {
          // It's a real HEIC file (even if named .jpg) -> Convert it
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
          // It's already a browser-friendly format (PNG, JPEG, etc.) 
          // Use the blob we already downloaded to save time/bandwidth
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
    <div ref={imgRef} className="relative h-full w-full bg-black/5 overflow-hidden rounded-lg">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent opacity-50" />
        </div>
      )}
      {imageSrc && (
        <img 
          src={imageSrc} 
          {...props} 
          loading="lazy"
          className={`${props.className} ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        />
      )}
    </div>
  );
};

export default SmartImage;
