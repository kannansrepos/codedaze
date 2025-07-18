/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useRouter } from 'next/navigation';
import PostCard from './posts/PostCard';

type Props = {
  markdownData: any[];
};

const PostView = ({ markdownData }: Props) => {
  const router = useRouter();

  const ViewPost = (postId: string) => {
    router.push(`/posts/${postId}`);
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
        {markdownData.map(({ frontmatter, postId }, index) => (
          <PostCard
            key={index}
            showDescription={false}
            post={frontmatter}
            postId={postId}
            ViewPost={ViewPost}
          />
        ))}
      </div>
    </>
  );
};

export default PostView;
