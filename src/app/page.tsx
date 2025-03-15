'use client';
import Banner from './components/banner';
import BlogPostComponent from './components/posts/blog-post';
import { usePost } from '../context/PostContext';

export default function Home() {
  const { posts } = usePost();
  return (
    <div className="min-h-screen">
      <Banner />
      <BlogPostComponent />
    </div>
  );
}
