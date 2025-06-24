// import { GetPostMetadata } from '@/lib/PostUtil';
// import PostClient from './_components/PostClient';

import BlogPostComponent from '../components/posts/blog-post';

export default function PostsPage() {
  // const posts = GetPostMetadata();

  return (
    <div>
      {/* {posts ? <PostClient allPosts={posts} /> : <p>No post data available</p>} */}
      <BlogPostComponent />
    </div>
  );
}
