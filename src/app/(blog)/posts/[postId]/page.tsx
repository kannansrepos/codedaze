/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { MailIcon } from 'lucide-react';
import { marked } from 'marked';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ImageWithFallback from '@/components/ImageWithFallback';

import { Slag } from '@/types/BlogPost';
import { toast } from 'react-toastify';
import PostMeta from '../_components/PostMeta';

const getPostData = async (postId: string) => {
  const response = await fetch(`/api/post/file?postId=${postId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch post data');
  }
  const responseData = await response.json();
  const { downloadResult } = responseData.data;
  if (!downloadResult) {
    toast.error('Failed to fetch post data');
  }
  return downloadResult;
};

const PostDetail = ({ params }: { params: { postId: string } }) => {
  const [markdownData, setMarkdownData] = useState<any>(null);
  const [slagData, setSlagData] = useState<Slag | null>(null);

  useEffect(() => {
    const getPost = async () => {
      const { downloadResult } = await getPostData(params.postId);
      setMarkdownData(marked(downloadResult?.content));
      setSlagData(downloadResult?.frontmatter as Slag);
    };
    getPost();
  }, [params.postId]);

  return (
    <div className="min-h-screen container m-auto flex flex-col md:flex-row gap-4">
      <PostMeta />
      <div className="flex flex-col gap-2 w-full md:w-3/4 p-4">
        <div className="flex gap-2 flex-col">
          <div className="flex flex-col h-[400px] gap-2 w-full my-3">
            <div className="relative text-center">
              <ImageWithFallback
                src={`/banner/${slagData?.language}.png`}
                alt={slagData?.language ?? 'banner'}
                width={1200}
                height={600}
                fallbackSrc="/banner/codedaze.png"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-[300px] text-center flex justify-center items-center text-4xl font-bold text-primary">
                <h1 className="bg-gradient-to-r from-[#2A42BA] via-[#8142EF] to-[#C521EF] inline-block text-transparent bg-clip-text">
                  {slagData?.title.toUpperCase()}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 my-5 bg-white dark:bg-gray-800 p-6 py-10 rounded-lg">
            {markdownData && (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: markdownData }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/4 h-auto md:min-h-screen bg-primary/10 flex flex-col gap-2 p-4 mt-4 bg-white dark:bg-gray-800 rounded-lg">
        <div className="flex flex-col gap-2 items-center justify-center">
          <h2 className="font-bold text-lg text-primary">News Letter</h2>
          <p>
            Subscribe to our newsletter to receive the latest news and updates
            from our blog. We will send you the .NET Core, Angular, React, Next
            Js, and TypeScript news and updates.
          </p>
          <div className="flex flex-col gap-3 w-full max-w-sm items-center space-x-2">
            <Input
              type="email"
              placeholder="Your Email Address"
              className="text-primary placeholder:text-primary border-primary border-2"
            />
            <Button type="submit" variant={'default'}>
              <MailIcon />
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostDetail;
