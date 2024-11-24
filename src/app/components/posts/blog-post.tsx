'use client';
import { cn } from '@/lib/utils';
import { BlogPost } from './types/BlogPost';
import { Language } from './types/Language';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link2Icon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPostProps {
  data: BlogPost[];
}

const BlogPostComponent = ({ data }: BlogPostProps) => {
  return (
    <div className="container m-auto flex gap-2 flex-col">
      <div className="flex items-center justify-center bg-primary/10 p-4 mt-4 gap-2 flex-col">
        <h1 className="text-lg font-bold text-primary p-4">
          Search the Post What you need
        </h1>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Search articles"
            className="text-primary placeholder:text-primary border-primary border-2"
          />
          <Button type="submit" variant={'default'}>
            <SearchIcon />
            Search
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((post) => {
          return (
            <div key={post.id}>
              <Card className="">
                <CardTitle className="p-8">
                  <div
                    className={cn(
                      // `bg-[url('/banner/${
                      //   Language[post.language]
                      //}_short.png')]
                      `relative`
                    )}
                  >
                    <Image
                      src={`/banner/${Language[post.language]}.png`}
                      alt={Language[post.language]}
                      width={1200}
                      height={1200}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full text-center flex justify-center items-center text-4xl font-bold text-primary">
                      {post.shortTitle.toUpperCase()}
                    </div>
                  </div>
                </CardTitle>
                <CardHeader className="text-lg font-bold text-primary">
                  {post.title}
                </CardHeader>
                <CardContent className="text-justify">
                  {post.description}
                </CardContent>
                <CardFooter className="flex items-end justify-end">
                  <Button>
                    <Link
                      href={`/posts/${post.id}`}
                      className="flex items-center"
                    >
                      <Link2Icon className="mr-2 h-4 w-4" />
                      Read More...
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogPostComponent;
