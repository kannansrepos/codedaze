/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { markdownToHtml } from '@/lib/MarkdownUtil';
import { PostIndex } from '@/types/BlogPost';
import PostView from './PostView';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const RecentPost = () => {
  const [markdownData, setMarkdownData] = useState<any[]>([]);
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
    const { markdownDataList } = data.data ?? { markdownDataList: [] };

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
    setMarkdownData(formattedData);
  };

  useEffect(() => {
    const GetTopPosts = async () => {
      const topPostUrl = '/api/post?action=get_top_posts&recordCount=3';
      const res = await fetch(topPostUrl);
      const response = await res.json();
      if (res.ok) {
        const postList = response.data.map((item: PostIndex) => item.postId);
        await getMarkdownDataList(postList);
      }
    };
    GetTopPosts();
  }, []);
  return (
    <>
      {markdownData && markdownData.length > 0 && (
        <>
          <div className="w-full flex gap-2 flex-col bg-[#F3F4F6]">
            <div className="container m-auto">
              <PostView markdownData={markdownData} />
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <Button className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-full">
              <Link href="/posts"> View All Posts</Link>
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default RecentPost;
