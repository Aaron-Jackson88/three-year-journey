import React, { useState, useEffect } from "react";
import heic2any from "heic2any";

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const SmartImage: React.FC<SmartImageProps> = ({ src, ...props }) => {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let objectUrl: string | null = null;

    const loadImage = async () => {
      try {
        // Try to fetch the image to check its type
        const response = await fetch(src);
        if (!response.ok) throw new Error("Failed to fetch image");
        
        const blob = await response.blob();
        
        // Check if it's HEIC by looking at the first few bytes (even if extension is .jpg)
        // HEIC usually has 'ftyp' at offset 4
        const buffer = await blob.slice(0, 12).arrayBuffer();
        const header = new Uint8Array(buffer);
        const ftyp = String.fromCharCode(...Array.from(header.slice(4, 12)));
        
        const isHeic = ftyp.includes("ftypheic") || ftyp.includes("ftypmif1") || ftyp.includes("ftypheis");

        if (isHeic) {
          setLoading(true);
          const convertedBlob = await heic2any({
            blob,
            toType: "image/jpeg",
            quality: 0.8
          });
          
          if (isMounted) {
            const finalBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
            objectUrl = URL.createObjectURL(finalBlob);
            setImageSrc(objectUrl);
          }
        } else {
          // It's already a browser-supported format (JPG or PNG)
          if (isMounted) {
            setImageSrc(src);
          }
        }
      } catch (error) {
        console.error("Error loading image:", src, error);
        if (isMounted) {
          setImageSrc("/placeholder.svg");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadImage();

    return () => {
      isMounted = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src]);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black/10">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );
  }

  return <img src={imageSrc} {...props} />;
};

export default SmartImage;
