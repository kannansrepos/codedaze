import Image from 'next/image';
import { MailIcon } from 'lucide-react';
import Head from 'next/head';

import { DUMMY_DATA } from '@/app/components/posts/dummy-data';
import { Language } from '@/app/components/posts/types/Language';
import CodeView from '@/app/components/posts/_components/code-view';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const PostDetail = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const postId = (await params).postId;
  const post = DUMMY_DATA.find((post) => post.id === postId);

  return (
    <div className="min-h-screen container m-auto">
      {post ? (
        <div className="flex gap-4 md:flex-row flex-col">
          <Head>
            <title>Code Daze: {post.shortTitle}</title>
            <link
              rel="canonical"
              href={`https://codedaze.tech/posts/${postId}`}
              key="canonical"
            />
          </Head>
          <div className="flex flex-col gap-2 w-full md:w-3/4 p-4">
            <div className="relative text-center">
              <Image
                src={`/banner/${Language[post.language]}.png`}
                alt="banner"
                width={1000}
                height={1000}
                className="w-full h-[300px] object-fill"
              />
              <div className="absolute top-0 left-0 w-full h-[300px] text-center flex justify-center items-center text-4xl font-bold text-primary">
                {post.shortTitle.toUpperCase()}
              </div>
            </div>
            <div className="flex flex-col gap-3 my-5">
              <h2 className="font-bold text-2xl text-primary">{post.title}</h2>
              <div className="flex justify-between items-center text-primary/60 font-bold text-sm">
                <p>{post.readMin} min read</p>
                <p>22 November, 2024</p>
              </div>
              <div className="text-lg text-justify">{post.description}</div>
              {post.section.map((section, index) => (
                <div key={index}>
                  <div className="font-semibold text-xl text-black/60 dark:text-white/60 my-4">
                    {section.title}
                  </div>
                  <div
                    className="my-4"
                    dangerouslySetInnerHTML={{
                      __html: section.content,
                    }}
                  ></div>
                  {section.code && (
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <CodeView code={section.code} />

                      {/* <div
                        dangerouslySetInnerHTML={{
                          __html: section.code,
                        }}
                      ></div> */}
                    </div>
                  )}
                  {section.image && (
                    <div className="flex justify-center">
                      <Image
                        src={section.image}
                        alt={section.imageAlt || ''}
                        width={1000}
                        height={1000}
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                  {section.video && (
                    <div className="flex justify-center">
                      <iframe
                        className="w-full h-[500px]"
                        src={`https://www.youtube.com/embed/${section.video.url}`}
                        title={section.video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/4 h-auto md:min-h-screen bg-primary/10 flex flex-col gap-2 p-4 mt-4">
            <div className="flex flex-col gap-2 items-center justify-center">
              <h2 className="font-bold text-lg text-primary">News Letter</h2>
              <p>
                Subscribe to our newsletter to receive the latest news and
                updates from our blog. We will send you the .NET Core, Angular,
                React, Next Js, and TypeScript news and updates.
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
      ) : (
        <div className="container m-auto">
          <p>Post not found</p>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
