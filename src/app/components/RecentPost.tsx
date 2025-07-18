/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { markdownToHtml } from '../../lib/MarkdownUtil';
import PostCard from './posts/PostCard';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import Link from 'next/link';

// import { usePost } from '../../context/PostContext';
// import { BlogPost, PostIndex } from '../../types/BlogPost';
// import PostCard from './posts/PostCard';
// import Link from 'next/link';
// import { Button } from '../../components/ui/button';
// import { getMarkdownDataList } from '../../lib/MarkdownUtil';
// import PostData from './PostData';

const RecentPost = () => {
  // const posts = usePost();
  const router = useRouter();

  const ViewPost = (postId: string) => {
    router.push(`/posts/${postId}`);
  };
  // const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [markdownData, setMarkdownData] = useState<any[]>([]);

  // useEffect(() => {
  //   setRecentPosts(posts.posts?.slice(0, 3) ?? []);
  // }, [posts.posts]);

  const getMarkdownDataList = async (markdownFileNames: string[]) => {
    const response = await fetch('/api/markdown', {
      method: 'POST',
      body: JSON.stringify({
        markdownFileNames,
      }),
    });
    if (!response.ok) {
      console.log('Failed to fetch markdown data');
    }
    const data = await response.json();
    console.log('markdownDataList Data Received: ', data);
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
    console.log('formattedData Data Received: ', formattedData);

    setMarkdownData(formattedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const postList = ['best_practices_for_efficient_data_access'];
      await getMarkdownDataList(postList);
    };
    fetchData();
  }, []);
  return (
    <>
      {markdownData && markdownData.length > 0 ? (
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
            <div className="flex justify-center mt-5">
              <Button className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-full">
                <Link href="/posts"> View All Posts</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>No Data Found</div>
      )}
      <div></div>
    </>
  );
};

export default RecentPost;
