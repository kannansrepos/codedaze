import { useState, useEffect } from 'react';

interface UseInfiniteScrollProps {
  fetchMore: () => Promise<void>;
  hasMore: boolean;
  loading: boolean;
}

export const useInfiniteScroll = ({
  fetchMore,
  hasMore,
  loading,
}: UseInfiniteScrollProps) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isFetching
      ) {
        return;
      }
      if (hasMore && !loading) {
        setIsFetching(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching, hasMore, loading]);

  useEffect(() => {
    if (!isFetching) return;

    const fetchData = async () => {
      await fetchMore();
      setIsFetching(false);
    };

    fetchData();
  }, [isFetching, fetchMore]);

  return { isFetching };
};
