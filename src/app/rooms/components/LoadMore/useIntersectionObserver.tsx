import { useEffect, useState, RefObject } from 'react';

export function useIntersectionObserver(
  elementRef: RefObject<Element | null>,
  { root = null, rootMargin = '0%', threshold = 0 } = {},
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>();

  const updateEntry = ([entry]: IntersectionObserverEntry[]) => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, root, rootMargin, elementRef]);

  return entry;
}
