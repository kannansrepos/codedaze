'use client';
import { useEffect, useState } from 'react';
import Banner from './components/banner';
import BlogPostComponent from './components/posts/blog-post';
import { BlogPost } from '../types/BlogPost';

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const GetAllPosts = async () => {
      let url = '/api/posts?pageSize=10';
      if (nextPageToken) {
        url += `&pageToken=${nextPageToken}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        return data;
      }
      return [];
    };

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const posts = await GetAllPosts();
        setPosts(posts.data);
        setNextPageToken(posts.nextPageToken);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching completes
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen">
      <Banner />
      {loading ? (
        <div className="flex justify-center items-center content-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        posts && <BlogPostComponent data={posts} />
      )}
    </div>
  );
}
