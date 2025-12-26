import { useEffect } from "react";
import { X } from "lucide-react";

interface ImageModalProps {
  imageSrc: string | null;
  onClose: () => void;
}

export function ImageModal({ imageSrc, onClose }: ImageModalProps) {
  useEffect(() => {
    if (imageSrc) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [imageSrc, onClose]);

  if (!imageSrc) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
        aria-label="닫기"
      >
        <X className="w-8 h-8 md:w-12 md:h-12" />
      </button>
      
      <img
        src={imageSrc}
        alt="확대된 이미지"
        className="max-w-full max-h-full object-contain animate-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
