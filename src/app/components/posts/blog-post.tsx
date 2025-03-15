'use client';
import { cn } from '@/lib/utils';
import { useDebouncedCallback } from 'use-debounce';
import { BlogPost } from './types/BlogPost';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link2Icon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface BlogPostProps {
  data: BlogPost[];
}

const BlogPostComponent = ({ data }: BlogPostProps) => {
  const [filteredData, setFilteredData] = useState(data);
  const handleSearch = useDebouncedCallback((term) => {
    if (!term) {
      setFilteredData(data);
      return;
    }
    setFilteredData(
      data.filter(
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
    setFilteredData(data);
  }, [data]);
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
                      // `bg-[url('/banner/${
                      //   Language[post.language]
                      //}_short.png')]
                      `relative`
                    )}
                  >
                    <Image
                      src={`/banner/${post.language}.png`}
                      alt={post.language}
                      width={1200}
                      height={1200}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full text-center flex justify-center items-center text-xl font-bold text-primary dark:text-primary-foreground">
                      {post.shortTitle.toUpperCase()}
                    </div>
                  </div>
                </CardTitle>
                <CardHeader className="text-lg font-bold text-primary dark:text-primary-foreground">
                  {post.title}
                </CardHeader>
                <CardContent className="text-justify">
                  {post.description}
                </CardContent>
                <CardFooter className="flex items-end justify-end">
                  <Button className="hover:border-primary border-2 hover:text-primary dark:hover:bg-primary-foreground dark:hover:text-primary">
                    <Link
                      href={`/posts/${post.id}`}
                      className="flex items-center hover:text-primary dark:hover:text-primary-foreground hover:border-primary border-1"
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
