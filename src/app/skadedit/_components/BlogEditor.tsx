'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import TextEditor from './TextEditor';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Language } from '../../components/posts/types/Language';
import { MoveLeftIcon, SaveIcon } from 'lucide-react';
const formSchema = z.object({
  pageId: z.string().min(2).max(50),
  language: z.string(),
  shortTitle: z.string().min(2).max(50),
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(500),
  category: z.string().min(2).max(50),
  date: z.date(),
  readMin: z.coerce.number(),
  tags: z.array(z.string()),
  content: z.string(),
});

const BlogEditor = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pageId: '',
      shortTitle: '',
      title: '',
      description: '',
      category: '',
      date: new Date(),
      readMin: 1,
      content: '',
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.info('values', values);
    console.log(values);
  }
  function onErrors(errors: unknown) {
    console.log('errors', errors);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onErrors)}
        className="space-y-2"
      >
        <div className="flex justify-end items-center bg-primary/10 p-4 gap-3">
          <Button onClick={() => router.push('/skadedit')}>
            <MoveLeftIcon />
            Back To Post
          </Button>
          <Button type="submit">
            <SaveIcon />
            Publish
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="border border-gray-200 p-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="HybridCache in ASP.NET Core - New Caching Library"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is title of the blog.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description for .NET 9 New Feature"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is description of the blog post.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3 flex-col md:flex-row w-full items-center justify-between">
              <FormField
                control={form.control}
                name="pageId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Page Id</FormLabel>
                    <FormControl>
                      <Input placeholder="dotnet-9-new-feature" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is id of the blog post.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shortTitle"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Short Title</FormLabel>
                    <FormControl>
                      <Input placeholder=".NET 9 New Feature" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is short title of the blog post.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-3 flex-col md:flex-row w-full items-center justify-between">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Features" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is category of the blog Post.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(Language)
                            .filter(([key]) => isNaN(Number(key)))
                            .map(([key, value]) => (
                              <SelectItem key={key} value={value.toString()}>
                                {key.toUpperCase()}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Select the language of the blog post.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-3 flex-col md:flex-row w-full items-center justify-between">
              <FormField
                control={form.control}
                name="readMin"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Reading Min</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="5" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is taking minits to read this blog post.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="dotnet, nextjs, react"
                        {...field}
                        value={field.value?.join(', ') || ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value
                              .split(',')
                              .map((tag) => tag.trim())
                              .filter(Boolean)
                          );
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter tags separated by commas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <TextEditor value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>
                    This is taking minits to read this blog post.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default BlogEditor;
