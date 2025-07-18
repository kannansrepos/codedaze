/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/components/ui/input';
import { markdownToHtml } from '@/lib/MarkdownUtil';
import { PostIndex } from '@/types/BlogPost';
import InfiniteScrollPosts from '../InfiniteScrollPosts';

const BlogPostComponent = () => {
  const [postList, setPostList] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState(postList);
  const handleSearch = useDebouncedCallback((term) => {
    if (!term) {
      setFilteredData(postList);
      return;
    }
    setFilteredData(
      postList.filter(
        (d) =>
          d.title.indexOf(term) >= 0 ||
          d.description.indexOf(term) >= 0 ||
          d.section.findIndex(
            (s: any) =>
              s.title.indexOf(term) >= 0 || s.content.indexOf(term) >= 0
          ) >= 0
      )
    );
  }, 300);
  const getMarkdownDataList = async (markdownFileNames: string[]) => {
    const response = await fetch('/api/markdown', {
      method: 'POST',
      body: JSON.stringify({
        markdownFileNames,
      }),
    });
    if (!response.ok) {
    }
    const data = await response.json();
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
    setPostList([formattedData, ...postList]);
    setFilteredData([formattedData, ...filteredData]);
  };
  const GetTopPosts = async () => {
    const topPostUrl = '/api/post?action=get_top_posts&recordCount=3';
    const res = await fetch(topPostUrl);
    const response = await res.json();
    if (res.ok) {
      const postList = response.data.map((item: PostIndex) => item.postId);
      await getMarkdownDataList(postList);
    }
  };
  useEffect(() => {
    GetTopPosts();
  }, []);
  return (
    <div className="container m-auto flex gap-2 flex-col">
      <div className="flex items-center justify-center bg-muted p-4 mt-2 gap-2 flex-col">
        <h1 className="text-lg font-bold dark:text-primary-foreground p-4">
          Search the Post What you need
        </h1>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Search articles"
            className="dark:text-primary-foreground dark:placeholder:text-primary-foreground dark:border-gray-600 border-2"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="col-span-full flex justify-center items-center p-6">
          {/* <div>{postList && <PostView markdownData={postList} />}</div> */}
          <InfiniteScrollPosts pageSize={9} />
        </div>
      </div>
    </div>
  );
};

export default BlogPostComponent;
