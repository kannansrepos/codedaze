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
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import Image from 'next/image';
import { Input } from '../../../components/ui/input';
import { SearchIcon } from 'lucide-react';

interface BlogPostProps {
  data: BlogPost[];
}

const BlogPostComponent = ({ data }: BlogPostProps) => {
  return (
    <div className="container m-auto flex gap-2 flex-col">
      <div className="flex items-center justify-center bg-primary/10 p-4 mt-4 gap-2 flex-col">
        <p className="text-lg font-bold text-primary p-4">
          Search the Post What you need
        </p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {data.map((post) => {
          return (
            <div key={post.id}>
              <Card className="">
                <CardHeader className="p-8">
                  <div
                    className={cn(
                      `bg-[url('/banner/${
                        Language[post.language]
                      }_short.png')] w-full h-36 bg-cover object-fill bg-center bg-no-repeat flex items-center justify-center text-primary text-3xl font-extrabold`
                    )}
                  >
                    {/* <Image
                    src={`/banner/${Language[post.language]}.png`}
                    alt={Language[post.language]}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  /> */}
                    {post.shortTitle.toUpperCase()}
                  </div>
                </CardHeader>
                <CardHeader className="">{post.title}</CardHeader>
                <CardContent className="text-justify">
                  {post.description}
                </CardContent>
                <CardFooter className="flex items-end justify-end">
                  <Button>Read More...</Button>
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
