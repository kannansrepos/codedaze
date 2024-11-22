'use client';
import Banner from './components/banner';
import BlogPostComponent from './components/posts/blog-post';
import { DUMMY_DATA } from './components/posts/dummy-data';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Banner />
      <BlogPostComponent data={DUMMY_DATA} />
    </div>
  );
}
