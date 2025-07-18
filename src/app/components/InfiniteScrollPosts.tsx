import React from 'react';
import PostView from './PostView'; // Adjust import path as needed
import { usePosts } from '@/hooks/UsePosts';
import { useInfiniteScroll } from '@/hooks/UseInfiniteScroll';

interface InfiniteScrollPostsProps {
  pageSize?: number;
}

const InfiniteScrollPosts: React.FC<InfiniteScrollPostsProps> = ({
  pageSize = 9,
}) => {
  const { posts, loading, hasMore, fetchMore, error } = usePosts(pageSize);
  const { isFetching } = useInfiniteScroll({ fetchMore, hasMore, loading });
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
      {(loading || isFetching) && (
        <div className="flex justify-center items-center p-6">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          <span className="ml-2">Loading more posts...</span>
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
