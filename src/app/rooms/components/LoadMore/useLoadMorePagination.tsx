import { useRef, useEffect } from 'react';

import { useIntersectionObserver } from './useIntersectionObserver';

export const useLoadMorePagination = (loadMore: () => void) => {
  const loadMoreElRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(loadMoreElRef);

  const loadMoreElIsVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (loadMoreElIsVisible) {
      loadMore();
    }
  }, [loadMoreElIsVisible, loadMore]);

  return loadMoreElRef;
};
