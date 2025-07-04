/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { MailIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Slag } from '../../../types/BlogPost';
import { marked } from 'marked';
import ImageWithFallback from '../../../components/ImageWithFallback';

const PostDetail = ({ params }: { params: { postId: string } }) => {
  const getPostData = async (postId: string) => {
    const response = await fetch(`/api/markdown?fileName=${postId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post data');
    }
    const responseData = await response.json();
    console.log('Post Data Received: ', responseData.data);
    setMarkdownData(marked(responseData?.data?.markdownData?.content));
    setSlagData(responseData?.data?.markdownData?.frontmatter as Slag);
  };

  const [markdownData, setMarkdownData] = useState<any>(null);
  const [slagData, setSlagData] = useState<Slag | null>(null);

  useEffect(() => {
    const getPost = async () => {
      await getPostData(params.postId);
    };
    getPost();
  }, [params.postId]);

  return (
    <div className="min-h-screen container m-auto flex flex-col md:flex-row gap-4">
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
    // <div className="min-h-screen container m-auto">
    //   {post ? (
    //     <>
    //       <MetaDataComponent postData={post} />
    //       <div className="flex gap-4 md:flex-row flex-col">
    //         <div className="flex flex-col gap-2 w-full md:w-3/4 p-4">
    //           <div className="relative text-center">
    //             <Image
    //               src={`/banner/${post.language}.png`}
    //               alt="banner"
    //               width={1000}
    //               height={1000}
    //               className="w-full h-[300px] object-fill"
    //             />
    //             <div className="absolute top-0 left-0 w-full h-[300px] text-center flex justify-center items-center text-4xl font-bold text-primary">
    //               <h1 className="bg-gradient-to-r from-[#2A42BA] via-[#8142EF] to-[#C521EF] inline-block text-transparent bg-clip-text">
    //                 {post.shortTitle.toUpperCase()}
    //               </h1>
    //             </div>
    //           </div>
    //           <div className="flex flex-col gap-3 my-5">
    //             <h2 className="font-bold text-2xl text-primary">
    //               {post.title}
    //             </h2>
    //             <div className="flex justify-between items-center text-primary/60 font-bold text-sm">
    //               <p>{post.readMin} min read</p>
    //               <p>{post.date}</p>
    //             </div>
    //             <div className="text-lg text-justify">{post.description}</div>
    //             {post.section.map((section, index) => (
    //               <div key={index}>
    //                 <div className="font-semibold text-xl text-black/60 dark:text-white/60 my-4">
    //                   {section.title}
    //                 </div>
    //                 <div
    //                   className="my-4"
    //                   dangerouslySetInnerHTML={{
    //                     __html: section.content,
    //                   }}
    //                 ></div>
    //                 {section.code && (
    //                   <div className="bg-gray-100 p-4 rounded-lg">
    //                     <CodeView code={section.code} />

    //                     {/* <div
    //                     dangerouslySetInnerHTML={{
    //                       __html: section.code,
    //                     }}
    //                   ></div> */}
    //                   </div>
    //                 )}
    //                 {/* {section.image && (
    //                 <div className="flex justify-center">
    //                   <Image
    //                     src={section.image}
    //                     alt={section.imageAlt || ''}
    //                     width={1000}
    //                     height={1000}
    //                     className="w-full h-auto"
    //                     // onError={(e) => {
    //                     //   e.currentTarget.src =
    //                     //     'https://media.istockphoto.com/id/2085507701/photo/close-up-hand-of-asian-prompt-engineer-developer-coding-app-with-software-data-sitting-in.jpg?s=2048x2048&w=is&k=20&c=uLnBYcrt08x0lU4TYs9a3NX_xuzLV26_KfSXbfwH3Ac=';
    //                     // }}
    //                   />
    //                 </div>
    //               )} */}
    //                 {section.videoUrl && (
    //                   <div className="flex justify-center">
    //                     <iframe
    //                       className="w-full h-[500px]"
    //                       src={`https://www.youtube.com/embed/${section.videoUrl}`}
    //                       title={section.videoTitle}
    //                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //                       allowFullScreen
    //                     ></iframe>
    //                   </div>
    //                 )}
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //         <div className="w-full md:w-1/4 h-auto md:min-h-screen bg-primary/10 flex flex-col gap-2 p-4 mt-4">
    //           <div className="flex flex-col gap-2 items-center justify-center">
    //             <h2 className="font-bold text-lg text-primary">News Letter</h2>
    //             <p>
    //               Subscribe to our newsletter to receive the latest news and
    //               updates from our blog. We will send you the .NET Core,
    //               Angular, React, Next Js, and TypeScript news and updates.
    //             </p>
    //             <div className="flex flex-col gap-3 w-full max-w-sm items-center space-x-2">
    //               <Input
    //                 type="email"
    //                 placeholder="Your Email Address"
    //                 className="text-primary placeholder:text-primary border-primary border-2"
    //               />
    //               <Button type="submit" variant={'default'}>
    //                 <MailIcon />
    //                 Subscribe
    //               </Button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </>
    //   ) : (
    //     <div className="container m-auto">
    //       <p>Post not found</p>
    //     </div>
    //   )}
    // </div>
  );
};
export default PostDetail;
