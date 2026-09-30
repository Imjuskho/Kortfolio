import React, { useState } from 'react';
import { Camera, MapPin, Eye, X, ChevronLeft, ChevronRight, Sliders } from 'lucide-react';
import { PHOTOGRAPHY_GALLERY } from '../data/portfolioData';
import { PhotoAsset } from '../types';

export const PhotographyGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoAsset | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Documentary', 'Portraits', 'Infrastructure', 'Landscape', 'Aerial'];

  const filteredPhotos = PHOTOGRAPHY_GALLERY.filter((p) => 
    activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <section id="photography" className="py-24 relative bg-[#07090e] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/70 border border-purple-500/30 text-purple-400 text-xs font-mono mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>VISUAL STORYTELLING ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Field Documentation & Visual Ethnography
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Photographic archives from Phanga Media and rural technology deployments across Malawi. Grounding technology in the lived human landscape.
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-white/10 hover:border-purple-400/50 transition-all duration-300 shadow-xl cursor-pointer"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Info on hover / bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-left transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <div className="flex items-center gap-2 text-[10px] font-mono text-purple-300 mb-1">
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
            </div>
          ))}
        </div>

      </div>

      {/* Full-Screen Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="fixed inset-0" onClick={() => setSelectedPhoto(null)} />

          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col z-10">
            {/* Close Button */}
            <div className="flex justify-between items-center pb-4 text-white">
              <div className="font-mono text-xs text-purple-400 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{selectedPhoto.location}</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400">{selectedPhoto.cameraInfo}</span>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Preview Container */}
            <div className="relative rounded-2xl overflow-hidden bg-black border border-white/10 flex-1 flex items-center justify-center">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
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
