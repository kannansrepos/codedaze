'use client';
import Banner from './components/banner';
import BlogPostComponent from './components/posts/blog-post';
export default function Home() {
  return (
    <div className="min-h-screen">
      <Banner />
      <BlogPostComponent />
    </div>
  );
}
