import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ImageLightbox = ({ isOpen, onClose, images = [], initialIndex = 0, productName }) => {
  const [scale, setScale] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Update current index when initialIndex changes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setScale(1);
    }
  }, [isOpen, initialIndex]);

  // Ensure images is always an array
  const imageArray = Array.isArray(images) ? images : images ? [images] : [];
  const currentImage = imageArray[currentIndex] || "";

  // Navigate to next image
  const goToNext = () => {
    if (currentIndex < imageArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setScale(1); // Reset zoom
    }
  };

  // Navigate to previous image
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setScale(1); // Reset zoom
    }
  };

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setScale(1); // Reset zoom on open
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "+" || e.key === "=") {
        handleZoomIn();
      } else if (e.key === "-" || e.key === "_") {
        handleZoomOut();
      } else if (e.key === "0") {
        setScale(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]); // Add currentIndex as dependency

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleReset = () => {
    setScale(1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-[200] flex flex-col"
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between p-6 text-white">
            <div>
              <h3 className="text-xl font-bold">{productName}</h3>
              <p className="text-sm text-gray-400">
                Click and drag to pan • Scroll to zoom
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Zoom Controls */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <button
                  onClick={handleZoomOut}
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                  title="Zoom Out (-)"
                >
                  <i className="bx bx-minus text-xl"></i>
                </button>

                <span className="text-sm font-semibold w-16 text-center">
                  {Math.round(scale * 100)}%
                </span>

                <button
                  onClick={handleZoomIn}
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                  title="Zoom In (+)"
                >
                  <i className="bx bx-plus text-xl"></i>
                </button>

                <div className="w-px h-6 bg-white/20 mx-2"></div>

                <button
                  onClick={handleReset}
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                  title="Reset Zoom (0)"
                >
                  <i className="bx bx-reset text-xl"></i>
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm"
                title="Close (ESC)"
              >
                <i className="bx bx-x text-3xl"></i>
              </button>
            </div>
          </div>

          {/* Image Container */}
          <div
            className="flex-1 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing p-6 relative"
            onClick={(e) => {
              // Close on background click, not on image
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}
          >
            <motion.img
              key={currentIndex}
              src={currentImage}
              alt={`${productName} - Image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain select-none"
              style={{
                scale: scale,
                cursor: scale > 1 ? "grab" : "default",
              }}
              drag={scale > 1}
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragElastic={0.1}
              onWheel={(e) => {
                e.preventDefault();
                if (e.deltaY < 0) {
                  handleZoomIn();
                } else {
                  handleZoomOut();
                }
              }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            />

            {/* Navigation Arrows - Only show if multiple images */}
            {imageArray.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  disabled={currentIndex === 0}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Previous Image (←)"
                >
                  <i className="bx bx-chevron-left text-5xl text-white"></i>
                </button>

                <button
                  onClick={goToNext}
                  disabled={currentIndex === imageArray.length - 1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Next Image (→)"
                >
                  <i className="bx bx-chevron-right text-5xl text-white"></i>
                </button>
              </>
            )}
          </div>

          {/* Footer Info */}
          <div className="flex flex-col items-center justify-center p-4 text-white/60 text-sm gap-4">
            {/* Dots Indicator - Only show if multiple images */}
            {imageArray.length > 1 && (
              <div className="flex items-center gap-2">
                {imageArray.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setScale(1); // Reset zoom
                    }}
                    className={`transition-all rounded-full ${
                      index === currentIndex
                        ? "bg-white w-8 h-2"
                        : "bg-white/40 w-2 h-2 hover:bg-white/60"
                    }`}
                    title={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Controls Info */}
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <i className="bx bx-mouse"></i>
                Scroll to zoom
              </span>
              <span className="flex items-center gap-2">
                <i className="bx bx-move"></i>
                Drag to pan
              </span>
              {imageArray.length > 1 && (
                <span className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-white/10 rounded">← →</kbd>
                  to navigate
                </span>
              )}
              <span className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white/10 rounded">ESC</kbd>
                to close
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
