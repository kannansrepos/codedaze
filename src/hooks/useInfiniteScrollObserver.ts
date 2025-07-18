import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollObserverProps {
  fetchMore: () => Promise<void>;
  hasMore: boolean;
  loading: boolean;
  rootMargin?: string;
}

export const useInfiniteScrollObserver = ({
  fetchMore,
  hasMore,
  loading,
  rootMargin = '100px',
}: UseInfiniteScrollObserverProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loading) {
        fetchMore();
      }
    },
    [fetchMore, hasMore, loading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin, // Load when sentinel is 100px away from viewport
      threshold: 0.1,
    });

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [handleIntersect, rootMargin]);

  return sentinelRef;
};
