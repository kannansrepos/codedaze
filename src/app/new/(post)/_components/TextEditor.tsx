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

import { Brain, ExternalLink, Loader2Icon, SaveIcon, Wand2, FileText, Sparkles, Zap, Clock } from 'lucide-react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AIModels, Language } from '@/types/Language';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { toast } from 'react-toastify';
import {
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
  const [githubToken, setGithubToken] = useState('');
  const [tokenExpiryWarning, setTokenExpiryWarning] = useState('');
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [isTrendingLoading, setIsTrendingLoading] = useState(false);
  const [isCronLoading, setIsCronLoading] = useState(false);

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
      token: githubToken,
    },
  });

  // Load GitHub token from environment variable and check expiry
  useEffect(() => {
    const envToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    const tokenExpiry = process.env.NEXT_PUBLIC_TOKEN_EXP;

    if (envToken) {
      setGithubToken(envToken);
      blogPublishForm.setValue('token', envToken);
    }

    // Check token expiry
    if (tokenExpiry) {
      try {
        // Improve parsing: replace comma with space and ensure proper format
        const formattedDate = tokenExpiry.replace(',', ' ');
        const expiryDate = new Date(formattedDate);
        const today = new Date();

        if (!isNaN(expiryDate.getTime())) {
          const timeDiff = expiryDate.getTime() - today.getTime();
          const daysUntilExpiry = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

          if (daysUntilExpiry < 0) {
            setTokenExpiryWarning('GitHub token has expired! Please renew it immediately.');
          } else if (daysUntilExpiry <= 7) {
            setTokenExpiryWarning(`GitHub token expires in ${daysUntilExpiry} day${daysUntilExpiry !== 1 ? 's' : ''}. Please renew it soon.`);
          }
        }
      } catch (error) {
        console.error('Error parsing token expiry date:', error);
      }
    }
  }, [blogPublishForm]);

  const cleanYamlBlock = (data: string): string => {
    return data
      .replace(/^```yaml\s*/i, '')
      .replace(/```$/, '')
      .trim();
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const GeneratePost = async (
    topic: string,
    language: string,
    model: string
  ) => {
    try {
      const apiResponse = await fetch(`/api/post/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          language,
          topic,
        }),
      });

      const responseData = await apiResponse.json();

      if (responseData.status == 200) {
        setMarkdown(cleanYamlBlock(responseData.data));

        // Generate SEO-friendly filename based on topic
        const slug = generateSlug(topic);
        blogPublishForm.setValue('fileName', slug);

        toast.success('Post generated successfully');
      } else {
        const errorMessage = responseData.message || responseData.error || 'Failed to generate post';
        toast.error(errorMessage);
        console.error('API Error:', responseData);
      }
    } catch (error) {
      console.error('Error generating post:', error);
      toast.error('Error generating post. Please try again.');
    }
  };

  const triggerCron = async () => {
    setIsCronLoading(true);
    try {
      const response = await fetch('/api/cron/generate');
      const data = await response.json();
      if (data.success) {
        toast.success(`Cron triggered! Generated files: ${data.files.join(', ')}`);
      } else {
        toast.error(data.error || 'Cron job failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error triggering cron job');
    } finally {
      setIsCronLoading(false);
    }
  };

  const fetchTrendingTopics = async () => {
    const language = blogEditorForm.getValues('language');
    if (!language) {
      toast.error('Please select a Language/Tech first');
      return;
    }

    setIsTrendingLoading(true);
    try {
      const response = await fetch('/api/post/trending', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language }),
      });
      const data = await response.json();

      if (data.status === 200) {
        setTrendingTopics(data.data);
      } else {
        toast.error(data.message || 'Failed to fetch trending topics');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error fetching trending topics');
    } finally {
      setIsTrendingLoading(false);
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

      const sanitizedFileName = fileName
        .replace(/[^a-zA-Z0-9-_]/g, '_')
        .toLocaleLowerCase()
        .replace(/_+/g, '_')
        .replaceAll(' ', '-');

      setIsLoading(true);
      await Promise.all([
        UploadFileToGithub(markdown, sanitizedFileName, GITHUB_TOKEN),
        UploadFileStore(markdown, sanitizedFileName),
      ]);

      setIsLoading(false);
      setMarkdown('');
      toast.success('Post published successfully!');
    } catch (error) {
      setIsLoading(false);
      console.error('Error publishing post:', error);
      toast.error('Error publishing post. Please try again.');
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
    <div className="flex flex-col gap-6">
      {/* Token Expiry Warning Banner */}
      {tokenExpiryWarning && (
        <div className={`rounded-2xl border p-4 flex items-center gap-3 ${
          tokenExpiryWarning.includes('expired')
            ? 'bg-red-500/10 border-red-500/20'
            : 'bg-yellow-500/10 border-yellow-500/20'
        }`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            tokenExpiryWarning.includes('expired')
              ? 'bg-red-500/20'
              : 'bg-yellow-500/20'
          }`}>
            <span className="text-2xl">⚠️</span>
          </div>
          <div className="flex-1">
            <p className={`font-semibold ${
              tokenExpiryWarning.includes('expired')
                ? 'text-red-400'
                : 'text-yellow-400'
            }`}>
              {tokenExpiryWarning}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Update NEXT_PUBLIC_GITHUB_TOKEN and NEXT_PUBLIC_TOKEN_EXP in your environment variables.
            </p>
          </div>
        </div>
      )}

      {/* Generation Section */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Generate Content</h2>
            <p className="text-sm text-gray-400">Configure your AI-powered blog post</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {process.env.NEXT_PUBLIC_CRON_SCHEDULE && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                <span>Schedule: {process.env.NEXT_PUBLIC_CRON_SCHEDULE}</span>
              </div>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={triggerCron}
              disabled={isCronLoading}
              className="bg-purple-600 hover:bg-purple-500 text-white border-none shadow-lg shadow-purple-900/40 font-bold"
            >
              {isCronLoading ? (
                <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Zap className="w-4 h-4 mr-2" />
              )}
              Trigger Cron
            </Button>
          </div>
        </div>

        <Form {...blogEditorForm}>
          <form
            onSubmit={blogEditorForm.handleSubmit(onSubmit, onErrors)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={blogEditorForm.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-semibold">AI Model</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors">
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
                  <FormItem>
                    <FormLabel className="text-white font-semibold">Language/Tech</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors">
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
                  <FormItem>
                    <div className="flex justify-between items-center mb-1">
                      <FormLabel className="text-white font-semibold">Topic</FormLabel>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={fetchTrendingTopics}
                        disabled={isTrendingLoading}
                        className="h-6 px-2 text-xs bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-400 hover:text-amber-300 hover:bg-amber-500/20 border border-amber-500/20"
                      >
                        {isTrendingLoading ? (
                          <Loader2Icon className="w-3 h-3 mr-1 animate-spin" />
                        ) : (
                          <Sparkles className="w-3 h-3 mr-1" />
                        )}
                        Get Trending Ideas
                      </Button>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Enter your blog topic..."
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 hover:bg-white/10 transition-colors"
                      />
                    </FormControl>

                    {/* Trending Topics Suggestions */}
                    {trendingTopics.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2">
                        <span className="text-xs text-gray-400 w-full mb-1">Trending now:</span>
                        {trendingTopics.map((topic, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              blogEditorForm.setValue('topic', topic);
                              setTrendingTopics([]); // Clear after selection
                            }}
                            className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-blue-500/20 hover:text-blue-300 hover:border-blue-500/30 transition-all text-left"
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold h-11 shadow-lg hover:shadow-xl transition-all"
              >
                {isLoading ? (
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Brain className="w-4 h-4 mr-2" />
                )}
                Generate with AI
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Publish Section - Only shown when markdown exists */}
      {markdown && (
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Publish Post</h2>
              <p className="text-sm text-gray-400">Save your generated content</p>
            </div>
          </div>

          <Form {...blogPublishForm}>
            <form
              onSubmit={blogPublishForm.handleSubmit(onPublishFormSubmit)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={blogPublishForm.control}
                  name="fileName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold">Post Filename</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="my-awesome-post"
                          {...field}
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 hover:bg-white/10 transition-colors"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {githubToken ? (
                  <FormItem>
                    <FormLabel className="text-white font-semibold">GitHub Token</FormLabel>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-3 flex items-center gap-2">
                      <span className="text-blue-400 text-sm">✓ Using configured Environment Token</span>
                    </div>
                  </FormItem>
                ) : (
                  <FormField
                    control={blogPublishForm.control}
                    name="token"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-semibold">GitHub Token</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="ghp_xxxxxxxxxxxx"
                            {...field}
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 hover:bg-white/10 transition-colors"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold h-11 shadow-lg hover:shadow-xl transition-all"
              >
                {isLoading ? (
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <SaveIcon className="w-4 h-4 mr-2" />
                )}
                Publish to GitHub
              </Button>
            </form>
          </Form>
        </div>
      )}

      {/* Markdown Editor */}
      <div className="bg-[#0f172a] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-2xl" data-color-mode="dark">
        <div className="bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            Markdown Editor
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {markdown ? 'Edit your generated content below' : 'Your generated content will appear here'}
          </p>
        </div>
        <div className="p-4 editor-container">
          <MarkdownEditor
            value={markdown}
            height="500px"
            onChange={(value) => setMarkdown(value)}
            className="rounded-lg overflow-hidden border border-white/5"
          />
        </div>

        <style jsx global>{`
          .editor-container .w-md-editor {
            background-color: transparent !important;
          }
          .editor-container .w-md-editor-toolbar {
            background-color: rgba(255, 255, 255, 0.03) !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
            padding: 8px !important;
          }
          .editor-container .w-md-editor-toolbar ul li button {
            color: #e2e8f0 !important;
            transition: all 0.2s;
          }
          .editor-container .w-md-editor-toolbar ul li button:hover {
            background-color: rgba(59, 130, 246, 0.2) !important;
            color: #60a5fa !important;
          }
          .editor-container .w-md-editor-content {
            background-color: #0f172a !important;
          }
          .editor-container .wmde-markdown-var {
            --md-editor-background-color: #0f172a;
          }
        `}</style>
      </div>
    </div>
  );
};

export default TextEditor;
