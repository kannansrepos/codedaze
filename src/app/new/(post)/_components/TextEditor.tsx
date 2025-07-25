'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Brain, ExternalLink, Loader2Icon, SaveIcon } from 'lucide-react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AIModels, Language } from '@/types/Language';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { toast } from 'react-toastify';
import {
  CreatePostIndex,
  UploadFileStore,
  UploadFileToGithub,
} from './actions';

const blogEditorFormSchema = z.object({
  model: z.string(),
  topic: z.string(),
  language: z.string(),
});
const blogPublishFormSchema = z.object({
  fileName: z.string(),
  token: z.string(),
});

const TextEditor = () => {
  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const blogEditorForm = useForm<z.infer<typeof blogEditorFormSchema>>({
    resolver: zodResolver(blogEditorFormSchema),
    defaultValues: {
      model: 'Gemini',
      topic: '',
      language: '',
    },
  });
  const blogPublishForm = useForm<z.infer<typeof blogPublishFormSchema>>({
    resolver: zodResolver(blogPublishFormSchema),
    defaultValues: {
      fileName: '',
      token: '',
    },
  });
  const cleanYamlBlock = (data: string): string => {
    return data
      .replace(/^```yaml\s*/i, '') // Remove starting ```yaml (case-insensitive)
      .replace(/```$/, '') // Remove ending ```
      .trim(); // Trim whitespace
  };
  const GeneratePost = async (
    topic: string,
    language: string,
    model: string
  ) => {
    try {
      const apiResponse = await fetch(`/api/post/generate`, {
        method: 'POST',
        body: JSON.stringify({
          model,
          language,
          topic,
        }),
      });
      const responseData = await apiResponse.json();
      if (responseData.status == 200) {
        setMarkdown(cleanYamlBlock(responseData.data));
        toast.success('Post generated successfully');
      } else {
        toast.error(responseData.message);
      }
    } catch {
      toast.error('Error generating post');
    }
  };

  const publishPost = async (fileName: string, GITHUB_TOKEN: string) => {
    try {
      if (fileName.trim() === '') {
        toast.error('Please provide a valid file name to publish the post.');
        return;
      }
      if (GITHUB_TOKEN.trim() === '') {
        toast.error('Please provide a valid GitHub token to publish the post.');
        return;
      }
      if (markdown.trim() === '') {
        toast.error('Please generate the markdown content before publishing.');
        return;
      }
      // Ensure the fileName is sanitized and does not contain invalid characters
      const sanitizedFileName = fileName
        .replace(/[^a-zA-Z0-9-_]/g, '_')
        .toLocaleLowerCase()
        .replace(/_+/g, '_')
        .replaceAll(' ', '-');
      setIsLoading(true);
      await Promise.all([
        UploadFileToGithub(markdown, sanitizedFileName, GITHUB_TOKEN),
        UploadFileStore(markdown, sanitizedFileName),
        CreatePostIndex(sanitizedFileName),
      ]);
      setIsLoading(false);
      setMarkdown('');
      toast.success('Post published successfully');
    } catch {
      toast.error('Error generating post');
    }
  };
  const onSubmit = async (values: z.infer<typeof blogEditorFormSchema>) => {
    setIsLoading(true);
    setMarkdown('');
    await GeneratePost(values.topic, values.language, values.model);
    setIsLoading(false);
  };
  const onPublishFormSubmit = async (
    values: z.infer<typeof blogPublishFormSchema>
  ) => {
    setIsLoading(true);
    await publishPost(values.fileName, values.token);
    setIsLoading(false);
  };
  function onErrors(errors: unknown) {
    console.log('errors', errors);
  }
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Create Post with the help of AI
          </h1>
        </div>
      </div>
      <div className="flex gap-3 flex-col">
        <div className="flex gap-3 flex-col md:flex-row w-full items-center justify-between">
          <Form {...blogEditorForm}>
            <form
              onSubmit={blogEditorForm.handleSubmit(onSubmit, onErrors)}
              className="space-y-2 flex flex-col md:flex-row gap-3 items-end"
            >
              <FormField
                control={blogEditorForm.control}
                name="model"
                render={({ field }) => (
                  <FormItem className="w-40">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Model" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(AIModels)
                            .filter(([key]) => isNaN(Number(key)))
                            .map(([key]) => (
                              <SelectItem key={key} value={key.toString()}>
                                {key.toUpperCase()}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={blogEditorForm.control}
                name="language"
                render={({ field }) => (
                  <FormItem className="w-40">
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
                            .map(([key]) => (
                              <SelectItem key={key} value={key.toString()}>
                                {key.toUpperCase()}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={blogEditorForm.control}
                name="topic"
                render={({ field }) => (
                  <FormItem className="w-96">
                    <FormControl>
                      <Input placeholder="Topic for the post" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <Brain />
                )}
                Generate
              </Button>
            </form>
          </Form>
          <Link
            href={`https://github.com/settings/personal-access-tokens/7207250`}
            target="_blank"
          >
            <Button>
              <ExternalLink />
              Get GitHub Token
            </Button>
          </Link>
        </div>
        {markdown && (
          <div>
            <Form {...blogPublishForm}>
              <form
                onSubmit={blogPublishForm.handleSubmit(onPublishFormSubmit)}
                className="space-y-2 flex flex-col md:flex-row gap-3 items-end"
              >
                <FormField
                  control={blogPublishForm.control}
                  name="fileName"
                  render={({ field }) => (
                    <FormItem className="w-80">
                      <FormLabel>Post Id To Publish</FormLabel>
                      <FormControl>
                        <Input placeholder="Features" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={blogPublishForm.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem className="w-52">
                      <FormLabel>GithubToken</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Github Token"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    <SaveIcon />
                  )}
                  Publish
                </Button>
              </form>
            </Form>
          </div>
        )}
      </div>
      <div>
        <MarkdownEditor
          value={markdown}
          height="200px"
          onChange={(value) => setMarkdown(value)}
        />
      </div>
    </div>
  );
};
export default TextEditor;
