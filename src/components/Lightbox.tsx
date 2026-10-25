import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useDialogA11y } from '../hooks/useDialogA11y';
import { asset } from '../lib/asset';

export interface LightboxItem {
  src: string;
  title: string;
  description?: string;
  meta?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ items, index, onIndexChange, onClose }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useDialogA11y(true, onClose, closeRef);
  const item = items[index];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onIndexChange((index + 1) % items.length);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onIndexChange((index - 1 + items.length) % items.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [index, items.length, onIndexChange]);

  if (!item) return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-void-deep/96 p-3 sm:p-8">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Evidence viewer: ${item.title}`}
        tabIndex={-1}
        className="relative z-10 flex max-h-[94vh] w-full max-w-6xl flex-col"
      >
        <div className="flex items-center justify-between gap-3 border border-line bg-panel px-3 py-2">
          <div className="min-w-0">
            <p className="hud-label truncate text-mint">{item.title}</p>
            {item.meta ? <p className="truncate font-mono text-[10px] uppercase tracking-wider text-faint">{item.meta}</p> : null}
          </div>
          <div className="flex flex-shrink-0 items-center gap-1.5">
            <span className="mr-1 font-mono text-[10px] text-faint">
              {index + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={() => onIndexChange((index - 1 + items.length) % items.length)}
              className="icon-btn h-9 w-9"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onIndexChange((index + 1) % items.length)}
              className="icon-btn h-9 w-9"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button ref={closeRef} type="button" className="icon-btn h-9 w-9" onClick={onClose} aria-label="Close image viewer">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center border-x border-line bg-black">
          <img
            src={asset(item.src)}
            alt={item.description ?? item.title}
            className="max-h-[72vh] w-auto max-w-full object-contain"
          />
        </div>

        <div className="border border-line bg-panel px-3 py-2.5">
          <p className="text-sm text-muted">{item.description ?? 'Project evidence supplied by the owner.'}</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-faint">
            Arrow keys navigate · Esc closes
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
};
