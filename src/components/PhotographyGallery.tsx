import React, { useState, useEffect, useCallback } from 'react';
import { Camera, MapPin, Eye, X, ChevronLeft, ChevronRight, Sliders, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHOTOGRAPHY_GALLERY } from '../data/portfolioData';
import { PhotoAsset } from '../types';
import { useDialogA11y } from '../hooks/useDialogA11y';
import { asset } from '../lib/asset';

export const PhotographyGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoAsset | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const closeLightbox = useCallback(() => setSelectedPhoto(null), []);
  const dialogRef = useDialogA11y(!!selectedPhoto, closeLightbox);

  const categories = ['All', 'Documentary', 'Portraits', 'Infrastructure', 'Landscape', 'Aerial'];

  const filteredPhotos = PHOTOGRAPHY_GALLERY.filter((p) => 
    activeCategory === 'All' || p.category === activeCategory
  );

  const currentIndex = selectedPhoto 
    ? filteredPhotos.findIndex((p) => p.id === selectedPhoto.id) 
    : -1;

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex > 0) {
      setSelectedPhoto(filteredPhotos[currentIndex - 1]);
    } else {
      setSelectedPhoto(filteredPhotos[filteredPhotos.length - 1]);
    }
  }, [currentIndex, filteredPhotos]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex < filteredPhotos.length - 1) {
      setSelectedPhoto(filteredPhotos[currentIndex + 1]);
    } else {
      setSelectedPhoto(filteredPhotos[0]);
    }
  }, [currentIndex, filteredPhotos]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, currentIndex, filteredPhotos, handlePrev, handleNext]);

  return (
    <section id="photography" className="scroll-mt-24 py-24 relative bg-[#07090e] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/70 border border-purple-500/30 text-purple-400 text-xs font-mono mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>THROUGH THE LENS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Stories & Photographs from the Field
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Before code and alongside it, I've spent years with a camera in hand. These are glimpses from documentary trips and field missions across Malawi—quiet moments, rural resilience, and everyday dignity captured for Phanga Studio, 7arts, and partner organizations.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-purple-500 text-white font-bold shadow-md shadow-purple-500/20'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredPhotos.map((photo, idx) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-white/10 hover:border-purple-400/50 transition-all duration-300 shadow-xl cursor-pointer"
              >
                <img
                  src={asset(photo.url)}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Gradient Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Info on hover / bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-left transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-300 mb-1">
                    <MapPin className="w-3 h-3" />
                    <span>{photo.location}</span>
                    <span>•</span>
                    <span>{photo.category}</span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight leading-snug group-hover:text-purple-200 transition-colors">
                    {photo.title}
                  </h3>

                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {photo.description}
                  </p>
                </div>

                {/* Zoom pill */}
                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Full-Screen Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl animate-fade-in">
          <div className="fixed inset-0" onClick={() => setSelectedPhoto(null)} />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Photo viewer: ${selectedPhoto.title}`}
            tabIndex={-1}
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col z-10"
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center pb-3 text-white">
              <div className="font-mono text-xs text-purple-400 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{selectedPhoto.location}</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400">{selectedPhoto.cameraInfo}</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400">{currentIndex + 1} of {filteredPhotos.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block text-xs text-slate-400 font-mono">Arrow keys to navigate • ESC to close</span>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  aria-label="Close photo viewer"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                  title="Close lightbox (ESC)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Photo Preview Container with Prev/Next buttons */}
            <div className="relative rounded-2xl overflow-hidden bg-black border border-white/10 flex-1 flex items-center justify-center group">
              <img
                src={asset(selectedPhoto.url)}
                alt={selectedPhoto.title}
                className="max-h-[68vh] w-auto object-contain mx-auto select-none"
              />

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-purple-600 text-white backdrop-blur-md transition-all cursor-pointer"
                title="Previous photo (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-purple-600 text-white backdrop-blur-md transition-all cursor-pointer"
                title="Next photo (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Caption */}
            <div className="pt-4 text-left">
              <h3 className="text-lg font-bold text-white tracking-tight">{selectedPhoto.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
