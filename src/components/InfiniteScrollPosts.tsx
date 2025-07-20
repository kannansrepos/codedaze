import React from 'react';
import { usePosts } from '@/hooks/UsePosts';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import PostView from './PostView';

interface InfiniteScrollPostsProps {
  pageSize?: number;
}

const InfiniteScrollPosts: React.FC<InfiniteScrollPostsProps> = ({
  pageSize = 9,
}) => {
  const { posts, loading, hasMore, fetchMore, error } = usePosts(pageSize);
  const sentinelRef = useInfiniteScrollObserver({
    fetchMore,
    hasMore,
    loading,
    rootMargin: '200px', // Start loading when 200px away from bottom
  });

  if (error) {
    return (
      <div className="col-span-full flex justify-center items-center p-6">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (posts.length === 0 && loading) {
    return (
      <div className="col-span-full flex justify-center items-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts && <PostView markdownData={posts} />}

      {/* Sentinel element for intersection observer */}
      {hasMore && (
        <div
          ref={sentinelRef}
          className="flex justify-center items-center p-6 min-h-[50px]"
        >
          {loading && (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              <span className="ml-2">Loading more posts...</span>
            </>
          )}
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div className="flex justify-center items-center p-6">
          <div className="text-gray-500">No more posts to load</div>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollPosts;
