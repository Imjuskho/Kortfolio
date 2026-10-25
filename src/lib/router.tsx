import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react';
import {
  RouterContext,
  readLocation,
  toHref,
  useRouter,
  type LocationState,
  type RouterValue,
} from './routerCore';

export type { Route, LocationState, RouterValue } from './routerCore';

export const RouterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<LocationState>(readLocation);

  useEffect(() => {
    const onPopState = () => setState(readLocation());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    if (typeof window === 'undefined') return;

    const href = toHref(to);
    if (options?.replace) {
      window.history.replaceState({ kortfolio: true }, '', href);
    } else {
      window.history.pushState({ kortfolio: true }, '', href);
    }
    setState(readLocation());
  }, []);

  const value = useMemo<RouterValue>(() => ({ ...state, navigate }), [state, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  children: ReactNode;
};

/** Internal link that keeps native anchor semantics (crawlable, middle-clickable). */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, children, onClick, target, ...rest }, ref) => {
    const { navigate } = useRouter();
    const external = /^(?:[a-z]+:)?\/\//i.test(to) || /^(?:mailto|tel):/i.test(to);

    if (external || target === '_blank') {
      return (
        <a ref={ref} href={to} target={target} onClick={onClick} rel={rest.rel ?? 'noreferrer'} {...rest}>
          {children}
        </a>
      );
    }

    return (
      <a
        ref={ref}
        href={toHref(to)}
        onClick={(event) => {
          onClick?.(event);
          if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          ) {
            return;
          }
          event.preventDefault();
          navigate(to);
        }}
        {...rest}
      >
        {children}
      </a>
    );
  },
);

Link.displayName = 'Link';
