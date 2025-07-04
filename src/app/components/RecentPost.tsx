import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { usePost } from '../../context/PostContext';
import { BlogPost } from '../../types/BlogPost';
import PostCard from './posts/PostCard';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

const RecentPost = () => {
  const posts = usePost();
  const router = useRouter();

  const ViewPost = (post: BlogPost) => {
    router.push(`/posts/${post.url}`);
  };
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  useEffect(() => {
    setRecentPosts(posts.posts?.slice(0, 3) ?? []);
  }, [posts.posts]);

  return (
    <div className="w-full flex gap-2 flex-col bg-[#F3F4F6]">
      <div className="container m-auto">
        <h1 className="text-xl md:text-4xl py-5 font-bold text-center justify-center flex gap-2">
          <p className="flex items-center text-center">The Recent</p>
          <p className="text-3xl md:text-5xl bg-gradient-to-r from-[#2A42BA] via-[#8142EF] to-[#C521EF] inline-block text-transparent bg-clip-text">
            CodeDaze
          </p>
          <p className="flex items-center text-center">Posts</p>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
          {recentPosts.map((post) => (
            <PostCard
              key={post.id}
              showDescription={false}
              post={post}
              ViewPost={ViewPost}
            />
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <Button className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-full">
            <Link href="/posts"> View All Posts</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentPost;
