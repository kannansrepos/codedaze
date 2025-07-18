import { useState, useEffect, useCallback } from 'react';
import { PostIndex } from '../types/BlogPost';
import { markdownToHtml } from '../lib/MarkdownUtil';

interface Post {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  language: string;
  // Add other post properties based on your data structure
}

interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  hasMore: boolean;
  fetchMore: () => Promise<void>;
  error: string | null;
}

export const usePosts = (pageSize: number = 9): UsePostsReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const getMarkdownDataList = async (markdownFileNames: string[]) => {
    const response = await fetch('/api/markdown', {
      method: 'POST',
      body: JSON.stringify({
        markdownFileNames,
      }),
    });
    if (!response.ok) {
    }
    const data = await response.json();
    const { markdownDataList } = data.data ?? null;

    const formattedData = await Promise.all(
      markdownDataList.map(
        async (item: {
          frontmatter: unknown;
          content: string;
          postId: string;
        }) => ({
          frontmatter: item.frontmatter,
          content: await markdownToHtml(item.content),
          postId: item.postId,
        })
      )
    );
    return formattedData;
  };
  const fetchPosts = useCallback(
    async (pageToken?: string | null) => {
      if (loading) return; // Prevent concurrent requests

      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          pageSize: pageSize.toString(),
          ...(pageToken && { pageToken }),
        });

        const response = await fetch(
          `/api/post?action=get_all_posts&${params}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const postIndexes = result.data.map((item: PostIndex) => item.postId);
        const resultData = await getMarkdownDataList(postIndexes);
        if (pageToken) {
          // Append new posts for infinite scroll
          setPosts((prev) => [...prev, ...resultData]);
        } else {
          // Replace posts for initial load
          setPosts(resultData);
        }
        setNextPageToken(result.nextPageToken);
        setHasMore(!!result.nextPageToken && result.data.length === pageSize);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
    [pageSize, loading]
  );

  const fetchMore = useCallback(async () => {
    if (!hasMore || loading) return;
    await fetchPosts(nextPageToken);
  }, [fetchPosts, nextPageToken, hasMore, loading]);

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, hasMore, fetchMore, error };
};
