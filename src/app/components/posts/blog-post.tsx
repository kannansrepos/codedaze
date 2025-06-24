'use client';
import { cn } from '@/lib/utils';
import { useDebouncedCallback } from 'use-debounce';
import { BlogPost } from '../../../types/BlogPost';
import {
  Card,
  // CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePost } from '@/context/PostContext';
import { useRouter } from 'next/navigation';
import ImageWithFallback from '@/components/ImageWithFallback';

const BlogPostComponent = () => {
  const router = useRouter();
  const { setViewPost, posts } = usePost();
  const [filteredData, setFilteredData] = useState(posts);
  const ViewPost = (post: BlogPost) => {
    setViewPost(post);
    router.push(`/posts/${post.url}`);
  };
  const handleSearch = useDebouncedCallback((term) => {
    if (!term) {
      setFilteredData(posts);
      return;
    }
    setFilteredData(
      posts.filter(
        (d) =>
          d.title.indexOf(term) >= 0 ||
          d.description.indexOf(term) >= 0 ||
          d.section.findIndex(
            (s) => s.title.indexOf(term) >= 0 || s.content.indexOf(term) >= 0
          ) >= 0
      )
    );
  }, 300);
  useEffect(() => {
    setFilteredData(posts);
  }, [posts]);
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
        {filteredData.length === 0 && (
          <div className="col-span-full flex justify-center items-center">
            <p className="text-primary text-lg">No data found</p>
          </div>
        )}
        {filteredData.map((post: BlogPost) => {
          return (
            <div key={post.id}>
              <Card className="">
                <CardTitle className="p-8">
                  <div
                    className={cn(
                      'relative'
                    )}
                  >
                    <ImageWithFallback
                      src={`/banner/${post.language}.png`}
                      alt={post.language}
                      width={1200}
                      height={1200}
                      fallbackSrc="/banner/codedaze.png"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full text-center flex justify-center items-center text-xl font-bold text-primary dark:text-primary-foreground ">
                      <h1 className="bg-gradient-to-r from-[#2A42BA] via-[#8142EF] to-[#C521EF] inline-block text-transparent bg-clip-text">
                        {post.shortTitle.toUpperCase()}
                      </h1>
                    </div>
                  </div>
                </CardTitle>
                <CardHeader className="text-lg font-bold text-primary dark:text-primary-foreground">
                  {post.title}
                </CardHeader>
                {/* <CardContent className="text-justify">
                  {post.description}
                </CardContent> */}
                <CardFooter className="flex items-end justify-end">
                  <Button
                    className="hover:border-primary border-2 hover:text-primary dark:hover:bg-primary-foreground dark:hover:text-primary"
                    onClick={() => ViewPost(post)}
                  >
                    <Link2Icon className="mr-2 h-4 w-4" />
                    Read More...
                  </Button>
                </CardFooter>
              </Card>
            </div>
          );
        })}{' '}
      </div>
    </div>
  );
};

export default BlogPostComponent;
