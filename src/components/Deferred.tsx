import React, { useEffect, useRef, useState } from 'react';

interface DeferredProps {
  id?: string;
  children: React.ReactNode;
  /** Reserved height (px) before the section mounts, to limit layout shift. */
  minHeight?: number;
  rootMargin?: string;
  className?: string;
}

/**
 * Mounts its children only once the section approaches the viewport, so heavy
 * below-the-fold sections and their code-split chunks are not loaded up front.
 * The wrapper (carrying the section `id`) is always in the DOM, so anchor links
 * keep working before the content mounts.
 */
export const Deferred: React.FC<DeferredProps> = ({
  id,
  children,
  minHeight = 640,
  rootMargin = '1200px 0px',
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      const t = setTimeout(() => setShow(true), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show, rootMargin]);

  return (
    <div ref={ref} id={id} className={className} style={show ? undefined : { minHeight }}>
      {show ? children : null}
    </div>
  );
};

export const SectionSkeleton: React.FC<{ minHeight?: number }> = ({ minHeight = 640 }) => (
  <div
    aria-hidden="true"
    className="w-full border-t border-border/60"
    style={{ minHeight }}
  />
);
