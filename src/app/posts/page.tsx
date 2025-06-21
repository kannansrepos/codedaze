// ✅ No 'use client' here
import { GetPostMetadata } from '@/lib/PostUtil';
import PostClient from './_components/PostClient';

export default function PostsPage() {
  const posts = GetPostMetadata(); // ✅ Runs only on the server

  return (
    <div>
      {posts ? <PostClient allPosts={posts} /> : <p>No post data available</p>}
    </div>
  );
}
