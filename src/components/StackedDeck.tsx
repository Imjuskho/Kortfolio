import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useSound } from '../lib/sfxCore';

export interface StackedDeckItem {
  id: string;
  code: string; // e.g. "CH 01", "04 / 2023"
  label: string; // e.g. "Curiosity", "7arts Creative Agency"
  period?: string; // e.g. "Age 11", "2023 – Present"
  tone?: 'amber' | 'violet' | 'rose' | 'mint' | 'emerald';
  renderContent: (isActive: boolean, isUnder: boolean) => React.ReactNode;
}

export interface StackedDeckProps {
  id: string;
  title: string;
  eyebrow?: string;
  items: StackedDeckItem[];
  unitName?: string; // e.g. "Chapter", "Milestone", "Record"
  tone?: 'amber' | 'mint' | 'violet';
  className?: string;
}

const TONE_CLASSES = {
  amber: {
    accent: 'border-t-amber',
    text: 'text-amber',
    bg: 'bg-amber',
    activePill: 'border-line-amber bg-amber/15 text-amber font-semibold',
    dot: 'bg-amber',
  },
  mint: {
    accent: 'border-t-mint',
    text: 'text-mint',
    bg: 'bg-mint',
    activePill: 'border-line-mint bg-mint/15 text-mint font-semibold',
    dot: 'bg-mint',
  },
  violet: {
    accent: 'border-t-violet',
    text: 'text-violet',
    bg: 'bg-violet',
    activePill: 'border-line-violet bg-violet/15 text-violet font-semibold',
    dot: 'bg-violet',
  },
  rose: {
    accent: 'border-t-rose-400',
    text: 'text-rose-400',
    bg: 'bg-rose-400',
    activePill: 'border-rose-400/40 bg-rose-400/15 text-rose-400 font-semibold',
    dot: 'bg-rose-400',
  },
  emerald: {
    accent: 'border-t-emerald-400',
    text: 'text-emerald-400',
    bg: 'bg-emerald-400',
    activePill: 'border-emerald-400/40 bg-emerald-400/15 text-emerald-400 font-semibold',
    dot: 'bg-emerald-400',
  },
};

export const StackedDeck: React.FC<StackedDeckProps> = ({
  id,
  title,
  eyebrow,
  items,
  unitName = 'Card',
  tone = 'amber',
  className = '',
}) => {
  const { play } = useSound();
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const toneStyle = TONE_CLASSES[tone] || TONE_CLASSES.amber;

  // Track active card on scroll using bounding client rect
  useEffect(() => {
    const handleScroll = () => {
      // 120px corresponds to 64px TopBar + 48px sticky HUD bar + buffer
      const stickyThreshold = 130;
      let current = 0;
      let hasLayout = false;

      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        if (rect.height > 0 || rect.width > 0) {
          hasLayout = true;
          // If card top has scrolled up past its sticky landing threshold
          if (rect.top <= stickyThreshold + idx * 10 + 35) {
            current = idx;
          }
        }
      });

      if (!hasLayout) return;

      setActiveIndex((prev) => (prev !== current ? current : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items.length]);

  const scrollToCard = useCallback(
    (index: number) => {
      if (index < 0 || index >= items.length) return;
      setActiveIndex(index);
      const card = cardRefs.current[index];
      if (!card) return;

      play('select');

      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

      const rect = card.getBoundingClientRect();
      const currentScroll = window.scrollY;
      const targetTop = currentScroll + rect.top - (124 + index * 10);

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: prefersReduced ? 'instant' : 'smooth',
      });
    },
    [items.length, play],
  );

  const activeItem = items[activeIndex] || items[0];

  return (
    <div id={id} ref={containerRef} className={`relative ${className}`} role="region" aria-label={title}>
      {/* Sticky HUD Deck Controller */}
      <div className="sticky top-16 z-30 mb-6 border border-line bg-void/90 p-2.5 shadow-lg backdrop-blur-md transition-all sm:p-3">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Status & Active Counter */}
          <div className="flex items-center gap-2">
            <span className="status-dot" aria-hidden="true" />
            <span className={`font-mono text-[11px] font-semibold uppercase tracking-wider ${toneStyle.text}`}>
              {activeItem.code} / {String(items.length).padStart(2, '0')}
            </span>
            <span className="hidden font-display text-xs font-bold uppercase tracking-wider text-ink sm:inline">
              · {activeItem.label}
            </span>
          </div>

          {/* Interactive Chapter / Item Pills on Desktop */}
          <div className="hidden items-center gap-1 md:flex" role="tablist" aria-label={`${title} deck navigation`}>
            {items.map((item, idx) => {
              const isSelected = activeIndex === idx;
              const itemTone = item.tone ? TONE_CLASSES[item.tone] : toneStyle;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => scrollToCard(idx)}
                  className={`min-h-7 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-all duration-150 ${
                    isSelected
                      ? `${itemTone.activePill} shadow-xs`
                      : 'border border-transparent text-muted hover:border-line hover:text-ink'
                  }`}
                >
                  {item.code.replace(/^(CH\s*|0)/i, '')} {item.label}
                </button>
              );
            })}
          </div>

          {/* Prev / Next Steppers */}
          <div role="group" className="flex items-center gap-1.5" aria-label={`${unitName} pagination controls`}>
            <button
              type="button"
              disabled={activeIndex === 0}
              onClick={() => scrollToCard(activeIndex - 1)}
              className="icon-btn h-7 w-7 text-xs disabled:cursor-not-allowed disabled:opacity-30"
              aria-label={`Previous ${unitName.toLowerCase()}`}
              title="Previous card"
            >
              <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <span className="font-mono text-[10px] uppercase tracking-wider text-faint sm:hidden">
              {activeIndex + 1}/{items.length}
            </span>
            <button
              type="button"
              disabled={activeIndex === items.length - 1}
              onClick={() => scrollToCard(activeIndex + 1)}
              className="icon-btn h-7 w-7 text-xs disabled:cursor-not-allowed disabled:opacity-30"
              aria-label={`Next ${unitName.toLowerCase()}`}
              title="Next card"
            >
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Segmented Progress Track */}
        <div
          className="mt-2.5 grid gap-1"
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
          role="progressbar"
          aria-valuenow={activeIndex + 1}
          aria-valuemin={1}
          aria-valuemax={items.length}
          aria-label={`${title} reading progress: card ${activeIndex + 1} of ${items.length}`}
        >
          {items.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-xs transition-all duration-300 ${
                idx <= activeIndex ? toneStyle.bg : 'bg-line/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stacking Card Deck */}
      <div className="space-y-0">
        {items.map((item, index) => {
          const isCurrent = activeIndex === index;
          const isUnder = activeIndex > index;
          const itemTone = item.tone ? TONE_CLASSES[item.tone] : toneStyle;

          return (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              style={{
                position: 'sticky',
                top: `calc(7.25rem + ${index * 10}px)`,
                zIndex: 10 + index,
                marginBottom: index < items.length - 1 ? '5.5rem' : '1.5rem',
              }}
              className="transition-all duration-300 ease-out will-change-transform"
            >
              <div
                className={`pixel-panel rounded-xs border border-line-strong !bg-panel p-5 shadow-2xl transition-all duration-300 sm:p-6 ${
                  itemTone.accent
                } ${
                  isCurrent
                    ? 'scale-100 ring-1 ring-line-strong'
                    : 'scale-[0.99]'
                }`}
                style={{
                  backgroundColor: 'var(--panel)',
                  boxShadow:
                    '0 -6px 20px -4px rgba(0, 0, 0, 0.45), 0 24px 50px -12px rgba(0, 0, 0, 0.75)',
                }}
              >
                {/* Micro Tab Indicator Header */}
                <div className="mb-3.5 flex items-center justify-between border-b border-line pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${itemTone.dot}`} aria-hidden="true" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
                      {unitName} {item.code}
                    </span>
                    <span className="font-mono text-[10px] text-faint">
                      ({index + 1} of {items.length})
                    </span>
                  </div>
                  {item.period ? (
                    <span className="font-mono text-[11px] text-faint">{item.period}</span>
                  ) : null}
                </div>

                {/* Card Custom Content */}
                {item.renderContent(isCurrent, isUnder)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
