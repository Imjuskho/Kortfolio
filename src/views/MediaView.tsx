import React, { useMemo, useState } from 'react';
import { Camera, ExternalLink } from 'lucide-react';
import { PageHeader } from '../components/GameUI';
import { Lightbox, type LightboxItem } from '../components/Lightbox';
import { PHOTOGRAPHY_GALLERY, PERSONAL_INFO } from '../data/portfolioData';
import { asset } from '../lib/asset';

const CATEGORIES = Array.from(new Set(PHOTOGRAPHY_GALLERY.map((photo) => photo.category)));

export const MediaView: React.FC = () => {
  const [category, setCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const photos = useMemo(
    () =>
      category === 'All'
        ? PHOTOGRAPHY_GALLERY
        : PHOTOGRAPHY_GALLERY.filter((photo) => photo.category === category),
    [category],
  );

  const items: LightboxItem[] = photos.map((photo) => ({
    src: photo.url,
    title: photo.title,
    description: photo.description,
    meta: `${photo.location}${photo.cameraInfo ? ` · ${photo.cameraInfo}` : ''}`,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <PageHeader
        eyebrow="Media archive"
        title="The camera came before the code."
        lede="Documentary field missions, portrait commissions, infrastructure studies, and aerial surveys across Malawi. A working archive from the same practice that builds the systems."
        aside={
          <div className="flex flex-col items-start gap-2 sm:flex-row lg:flex-col lg:items-end">
            <span className="tag tag-violet">{PHOTOGRAPHY_GALLERY.length} frames</span>
            <a
              href={PERSONAL_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              @_phanga <ExternalLink className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(opens Instagram in a new tab)</span>
            </a>
          </div>
        }
      />

      <div role="group" aria-label="Filter photography by category" className="mb-6 flex flex-wrap items-center gap-2">
        <Camera className="h-4 w-4 text-faint" aria-hidden="true" />
        {['All', ...CATEGORIES].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setCategory(item);
              setActiveIndex(null);
            }}
            aria-pressed={category === item}
            className={`min-h-9 border px-3 font-mono text-xs uppercase tracking-wider transition-colors ${
              category === item
                ? 'border-violet bg-violet text-void-deep'
                : 'border-line bg-white/[0.02] text-muted hover:border-line-strong hover:text-ink'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.12em] text-faint" aria-live="polite">
        {photos.length} frames · click any frame to enlarge · captions from the existing archive
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative overflow-hidden border border-line bg-void-deep text-left transition-colors hover:border-line-violet"
            aria-label={`Open photo: ${photo.title}`}
          >
            <div className="aspect-square">
              <img
                src={asset(photo.url)}
                alt={photo.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void-deep/90 via-void-deep/5 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-violet sm:text-[10px]">
                {photo.category}
              </p>
              <p className="mt-0.5 line-clamp-2 font-display text-xs font-semibold leading-tight text-ink sm:text-sm">
                {photo.title}
              </p>
            </div>
            <span className="absolute right-2 top-2 border border-line bg-void-deep/80 px-1.5 py-0.5 font-mono text-[9px] text-faint">
              {String(index + 1).padStart(2, '0')}
            </span>
          </button>
        ))}
      </div>

      {!photos.length ? (
        <div className="border border-line p-8 text-center">
          <p className="text-sm text-muted">No frames in this category.</p>
          <button type="button" className="btn btn-secondary mt-4" onClick={() => setCategory('All')}>
            Show all
          </button>
        </div>
      ) : null}

      <div className="mt-8 border border-line bg-void-deep p-4">
        <p className="text-xs leading-relaxed text-muted">
          These images document field missions, commissions, and personal work. They are not presented as client
          endorsements. Full-resolution usage and licensing can be discussed directly.
        </p>
      </div>

      {activeIndex !== null ? (
        <Lightbox
          items={items}
          index={activeIndex}
          onIndexChange={setActiveIndex}
          onClose={() => setActiveIndex(null)}
        />
      ) : null}
    </div>
  );
};
