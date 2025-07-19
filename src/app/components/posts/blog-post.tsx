/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Input } from '@/components/ui/input';
import InfiniteScrollPosts from '../InfiniteScrollPosts';
import Logger from '@/lib/Logger';

const BlogPostComponent = () => {
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
              Logger.info(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="col-span-full flex justify-center items-center p-6">
          <InfiniteScrollPosts pageSize={9} />
        </div>
      </div>
    </div>
  );
};

export default BlogPostComponent;
