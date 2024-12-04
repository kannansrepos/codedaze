'use client';
import { useEffect, useState } from 'react';
import Banner from './components/banner';
import BlogPostComponent from './components/posts/blog-post';
import { BlogPost } from './components/posts/types/BlogPost';

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [nextPageToken, setNextPageToken] = useState('');

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
      const posts = await GetAllPosts();
      setPosts(posts.data);
      setNextPageToken(posts.nextPageToken);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen">
      <Banner />
      {posts && <BlogPostComponent data={posts} />}
    </div>
  );
}
