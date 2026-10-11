import React, { useEffect, useRef, useState } from 'react';

export type RevealVariant = 'y' | 'x' | 'zoom' | 'scale-x';

interface RevealProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  as?: keyof React.JSX.IntrinsicElements;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  variant = 'y',
  as: Tag = 'div',
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(
    () => typeof window === 'undefined' || typeof IntersectionObserver === 'undefined',
  );

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  const Element = Tag as React.ElementType;

  return (
    <Element
      ref={ref}
      className={`reveal reveal-${variant} ${shown ? 'reveal-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Element>
  );
};