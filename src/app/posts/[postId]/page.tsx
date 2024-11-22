import Image from 'next/image';
import { DUMMY_DATA } from '../../components/posts/dummy-data';
import { Language } from '../../components/posts/types/Language';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { MailIcon } from 'lucide-react';

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
        <div className="flex gap-4 my-4">
          <div className="flex flex-col gap-2  w-3/4">
            <div className="relative text-center">
              <Image
                src={`/banner/${Language[post.language]}.png`}
                alt="banner"
                width={1000}
                height={1000}
                className="w-full h-[450px] object-fill"
              />
              <div className="absolute top-0 left-0 w-full h-[450px] text-center flex justify-center items-center text-4xl font-bold text-primary">
                {post.shortTitle.toUpperCase()}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-2xl text-primary">{post.title}</h2>
              <div className="flex justify-between items-center text-primary/60 font-bold text-sm">
                <p>{post.readMin} min read</p>
                <p>22 November, 2024</p>
              </div>
              <div className="text-lg text-justify">{post.description}</div>
              {post.section.map((section, index) => (
                <div key={index}>
                  <div className="font-semibold text-xl text-black/60 dark:text-white/60">
                    {section.title}
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: section.content,
                    }}
                  ></div>
                  {section.code && (
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: section.code,
                        }}
                      ></div>
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
          <div className="w-1/4 min-h-screen bg-primary/10 flex flex-col gap-2 p-4">
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
