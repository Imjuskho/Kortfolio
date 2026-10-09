import React, { useState, useCallback, useEffect } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { PHOTOGRAPHY_GALLERY, PERSONAL_INFO } from '../data/portfolioData';
import { PhotoAsset } from '../types';
import { useDialogA11y } from '../hooks/useDialogA11y';
import { asset } from '../lib/asset';

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const FEATURED_PHOTO_IDS = [
  'p_ig_01',
  'p_aerial',
  'p_ig_04',
  'p_ig_10',
  'p_ig_03',
  'p_ig_09',
  'p_ig_06',
  'p_ig_11',
];

export const PhotographyGallery: React.FC = () => {
  const photos = FEATURED_PHOTO_IDS
    .map((id) => PHOTOGRAPHY_GALLERY.find((p) => p.id === id))
    .filter((p): p is PhotoAsset => Boolean(p));

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev === null || prev <= 0 ? photos.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev === null || prev >= photos.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, photos.length]);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const dialogRef = useDialogA11y(activeIndex !== null, closeLightbox);

  return (
    <section className="py-16 relative bg-background border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-violet/10 border border-violet/30 text-violet text-xs font-mono mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>FIELD NOTES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              The camera that came before the code
            </h2>
            <p className="text-muted text-sm mt-2 max-w-2xl leading-relaxed">
              Documentary trips, field missions, and commissions across Malawi. A short
              roll of favourites—the full archive lives on Instagram.
            </p>
          </div>

          <a
            href={PERSONAL_INFO.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 flex-shrink-0 px-3.5 py-2 rounded-xl bg-surface hover:bg-surface-2 border border-border text-muted hover:text-violet text-xs font-mono transition-all"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            @_phanga
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Filmstrip roll */}
        <div className="relative">
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
            {photos.map((photo, idx) => (
              <button
                key={photo.id}
                onClick={() => setActiveIndex(idx)}
                aria-label={`View photo: ${photo.title}`}
                className="group relative flex-shrink-0 snap-start w-[220px] sm:w-[260px] aspect-[4/3] rounded-xl overflow-hidden border border-border bg-surface-2 cursor-pointer"
              >
                <img
                  src={asset(photo.url)}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-300/90">
                    <Camera className="w-3 h-3" />
                    <span>{photo.category}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white tracking-tight leading-snug mt-0.5">
                    {photo.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mt-1 font-mono text-[11px] text-faint">
            <span>Scroll sideways for the roll →</span>
            <span>{photos.length} frames</span>
          </div>
        </div>

      </div>

      {/* Full-Screen Lightbox Modal */}
      {activeIndex !== null && photos[activeIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl animate-fade-in">
          <div className="fixed inset-0" onClick={() => setActiveIndex(null)} />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Photo viewer: ${photos[activeIndex].title}`}
            tabIndex={-1}
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col z-10"
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center pb-3 text-white">
              <div className="font-mono text-xs text-emerald-300 flex items-center gap-2">
                <Camera className="w-3.5 h-3.5" />
                <span>{photos[activeIndex].location}</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400">{photos[activeIndex].cameraInfo}</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400">{activeIndex + 1} of {photos.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block text-xs text-slate-400 font-mono">Arrow keys to navigate • ESC to close</span>
                <button
                  onClick={() => setActiveIndex(null)}
                  aria-label="Close photo viewer"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                  title="Close lightbox (ESC)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Photo Preview */}
            <div className="relative rounded-2xl overflow-hidden bg-black border border-white/10 flex-1 flex items-center justify-center">
              <img
                src={asset(photos[activeIndex].url)}
                alt={photos[activeIndex].title}
                className="max-h-[68vh] w-auto object-contain mx-auto select-none"
              />

              <button
                onClick={() => setActiveIndex((prev) => (prev === null || prev <= 0 ? photos.length - 1 : prev - 1))}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-emerald-600 text-white backdrop-blur-md transition-all cursor-pointer"
                title="Previous photo (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setActiveIndex((prev) => (prev === null || prev >= photos.length - 1 ? 0 : prev + 1))}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-emerald-600 text-white backdrop-blur-md transition-all cursor-pointer"
                title="Next photo (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Caption */}
            <div className="pt-4 text-left">
              <h3 className="text-lg font-bold text-white tracking-tight">{photos[activeIndex].title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                {photos[activeIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
