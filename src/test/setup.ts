import '@testing-library/jest-dom/vitest';

// jsdom lacks several browser APIs the app's motion/scroll layers expect.
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}

if (!('IntersectionObserver' in window)) {
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  // @ts-expect-error test shim
  window.IntersectionObserver = IO;
  // @ts-expect-error test shim
  globalThis.IntersectionObserver = IO;
}

if (!('ResizeObserver' in window)) {
  class RO {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  // @ts-expect-error test shim
  window.ResizeObserver = RO;
}

window.scrollTo = () => {};
Element.prototype.scrollIntoView = () => {};
