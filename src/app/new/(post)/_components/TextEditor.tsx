'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import
  {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form';

import { Brain, Loader2Icon, SaveIcon, Wand2, FileText, Sparkles, Zap, Clock, ChevronRight } from 'lucide-react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import
  {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
import { AIModels, Language } from '@/types/Language';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

import { toast } from 'react-toastify';
import
  {
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

const TextEditor = () =>
{
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
  useEffect(() =>
  {
    const envToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    const tokenExpiry = process.env.NEXT_PUBLIC_TOKEN_EXP;

    if (envToken)
    {
      setGithubToken(envToken);
      blogPublishForm.setValue('token', envToken);
    }

    // Check token expiry
    if (tokenExpiry)
    {
      try
      {
        const formattedDate = tokenExpiry.replace(',', ' ');
        const expiryDate = new Date(formattedDate);
        const today = new Date();

        if (!isNaN(expiryDate.getTime()))
        {
          const timeDiff = expiryDate.getTime() - today.getTime();
          const daysUntilExpiry = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

          if (daysUntilExpiry < 0)
          {
            setTokenExpiryWarning('GitHub token has expired! Please renew it immediately.');
          } else if (daysUntilExpiry <= 7)
          {
            setTokenExpiryWarning(`GitHub token expires in ${daysUntilExpiry} day${daysUntilExpiry !== 1 ? 's' : ''}. Please renew it soon.`);
          }
        }
      } catch (error)
      {
        console.error('Error parsing token expiry date:', error);
      }
    }
  }, [blogPublishForm]);

  const cleanYamlBlock = (data: string): string =>
  {
    return data
      .replace(/^```yaml\s*/i, '')
      .replace(/```$/, '')
      .trim();
  };

  const generateSlug = (text: string) =>
  {
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
  ) =>
  {
    try
    {
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

      if (responseData.status == 200)
      {
        setMarkdown(cleanYamlBlock(responseData.data));

        const slug = generateSlug(topic);
        blogPublishForm.setValue('fileName', slug);

        toast.success('Post generated successfully');
      } else
      {
        const errorMessage = responseData.message || responseData.error || 'Failed to generate post';
        toast.error(errorMessage);
        console.error('API Error:', responseData);
      }
    } catch (error)
    {
      console.error('Error generating post:', error);
      toast.error('Error generating post. Please try again.');
    }
  };

  const triggerCron = async () =>
  {
    setIsCronLoading(true);
    try
    {
      const response = await fetch('/api/cron/generate');
      const data = await response.json();
      if (data.success)
      {
        toast.success(`Cron triggered! Generated files: ${data.files.join(', ')}`);
      } else
      {
        toast.error(data.error || 'Cron job failed');
      }
    } catch (error)
    {
      console.error(error);
      toast.error('Error triggering cron job');
    } finally
    {
      setIsCronLoading(false);
    }
  };

  const fetchTrendingTopics = async () =>
  {
    const language = blogEditorForm.getValues('language');
    if (!language)
    {
      toast.error('Please select a Language/Tech first');
      return;
    }

    setIsTrendingLoading(true);
    try
    {
      const response = await fetch('/api/post/trending', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language }),
      });
      const data = await response.json();

      if (data.status === 200)
      {
        setTrendingTopics(data.data);
      } else
      {
        toast.error(data.message || 'Failed to fetch trending topics');
      }
    } catch (error)
    {
      console.error(error);
      toast.error('Error fetching trending topics');
    } finally
    {
      setIsTrendingLoading(false);
    }
  };

  const publishPost = async (fileName: string, GITHUB_TOKEN: string) =>
  {
    try
    {
      if (fileName.trim() === '')
      {
        toast.error('Please provide a valid file name to publish the post.');
        return;
      }
      if (GITHUB_TOKEN.trim() === '')
      {
        toast.error('Please provide a valid GitHub token to publish the post.');
        return;
      }
      if (markdown.trim() === '')
      {
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
    } catch (error)
    {
      setIsLoading(false);
      console.error('Error publishing post:', error);
      toast.error('Error publishing post. Please try again.');
    }
  };

  const onSubmit = async (values: z.infer<typeof blogEditorFormSchema>) =>
  {
    setIsLoading(true);
    setMarkdown('');
    await GeneratePost(values.topic, values.language, values.model);
    setIsLoading(false);
  };

  const onPublishFormSubmit = async (
    values: z.infer<typeof blogPublishFormSchema>
  ) =>
  {
    setIsLoading(true);
    await publishPost(values.fileName, values.token);
    setIsLoading(false);
  };

  function onErrors(errors: unknown)
  {
    console.log('errors', errors);
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Token Expiry Warning Banner */}
      {tokenExpiryWarning && (
        <div className={`rounded-3xl border px-6 py-5 flex items-center gap-4 transition-all animate-in fade-in slide-in-from-top-4 ${tokenExpiryWarning.includes('expired')
            ? 'bg-red-500/5 border-red-500/10'
            : 'bg-amber-500/5 border-amber-500/10'
          }`}>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${tokenExpiryWarning.includes('expired')
              ? 'bg-red-500/10'
              : 'bg-amber-500/10'
            }`}>
            <span className="text-xl">⚠️</span>
          </div>
          <div className="flex-1">
            <p className={`font-black text-sm uppercase tracking-widest ${tokenExpiryWarning.includes('expired')
                ? 'text-red-500'
                : 'text-amber-500'
              }`}>
              {tokenExpiryWarning}
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider leading-relaxed">
              Required action: Renew <span className="text-slate-400">NEXT_PUBLIC_GITHUB_TOKEN</span> in environment configuration.
            </p>
          </div>
        </div>
      )}

      {/* Generation Section */}
      <div className="bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] border border-white/[0.05] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-3xl rounded-full" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Brain className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Generate Brainstorm</h2>
              <p className="text-xs text-slate-500 font-black uppercase tracking-widest mt-1">AI Content Pipeline</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {process.env.NEXT_PUBLIC_CRON_SCHEDULE && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-[10px] font-black uppercase tracking-widest text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                <span>Schedule: {process.env.NEXT_PUBLIC_CRON_SCHEDULE}</span>
              </div>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={triggerCron}
              disabled={isCronLoading}
              className="bg-primary/10 border-primary/20 hover:bg-primary/20 text-primary h-10 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
            >
              {isCronLoading ? (
                <Loader2Icon className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Zap className="w-3.5 h-3.5 mr-2" />
              )}
              Initialize Cron
            </Button>
          </div>
        </div>

        <Form {...blogEditorForm}>
          <form
            onSubmit={blogEditorForm.handleSubmit(onSubmit, onErrors)}
            className="space-y-8 relative z-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={blogEditorForm.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Compute Model</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-white/[0.03] border-white/[0.05] text-white hover:bg-white/[0.05] h-14 rounded-2xl px-6 transition-all">
                          <SelectValue placeholder="Model Architecture" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/[0.05]">
                          {Object.entries(AIModels)
                            .filter(([key]) => isNaN(Number(key)))
                            .map(([key]) => (
                              <SelectItem key={key} value={key.toString()} className="text-xs font-bold py-3 hover:bg-primary/10 focus:bg-primary/10">
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
                    <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Stack Ecosystem</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-white/[0.03] border-white/[0.05] text-white hover:bg-white/[0.05] h-14 rounded-2xl px-6 transition-all">
                          <SelectValue placeholder="Technical Language" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/[0.05]">
                          {Object.entries(Language)
                            .filter(([key]) => isNaN(Number(key)))
                            .map(([key]) => (
                              <SelectItem key={key} value={key.toString()} className="text-xs font-bold py-3 hover:bg-primary/10 focus:bg-primary/10">
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
                      <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Subject Matter</FormLabel>
                      <button
                        type="button"
                        onClick={fetchTrendingTopics}
                        disabled={isTrendingLoading}
                        className="text-[9px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-all flex items-center gap-1.5"
                      >
                        {isTrendingLoading ? (
                          <Loader2Icon className="w-3 h-3 animate-spin" />
                        ) : (
                          <Sparkles className="w-3 h-3" />
                        )}
                        Explore Trends
                      </button>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="System Architecture in .NET..."
                        {...field}
                        className="bg-white/[0.03] border-white/[0.05] text-white placeholder:text-slate-600 hover:bg-white/[0.05] h-14 rounded-2xl px-6 transition-all"
                      />
                    </FormControl>

                    {/* Trending Topics Suggestions */}
                    {trendingTopics.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2">
                        {trendingTopics.map((topic, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() =>
                            {
                              blogEditorForm.setValue('topic', topic);
                              setTrendingTopics([]);
                            }}
                            className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-slate-400 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
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

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-black h-14 rounded-2xl shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all flex items-center justify-center gap-3 overflow-hidden group"
            >
              <div className="relative z-10 flex items-center gap-3">
                {isLoading ? (
                  <Loader2Icon className="w-5 h-5 animate-spin" />
                ) : (
                  <Brain className="w-5 h-5 group-hover:scale-110 transition-transform" />
                )}
                <span className="uppercase text-xs tracking-[0.2em]">{isLoading ? 'Processing Neural Engine...' : 'Initialize Generation'}</span>
              </div>
            </Button>
          </form>
        </Form>
      </div>

      {/* Publish Section - Only shown when markdown exists */}
      {markdown && (
        <div className="bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] border border-white/[0.05] p-8 md:p-10 shadow-2xl relative overflow-hidden transition-all animate-in zoom-in-95 duration-500">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-3xl rounded-full" />

          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <FileText className="w-7 h-7 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Deployment Terminal</h2>
              <p className="text-xs text-slate-500 font-black uppercase tracking-widest mt-1">Publish to Production</p>
            </div>
          </div>

          <Form {...blogPublishForm}>
            <form
              onSubmit={blogPublishForm.handleSubmit(onPublishFormSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={blogPublishForm.control}
                  name="fileName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Slug Manifest</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="modern-system-design"
                          {...field}
                          className="bg-white/[0.03] border-white/[0.05] text-white placeholder:text-slate-600 hover:bg-white/[0.05] h-14 rounded-2xl px-6 transition-all"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {githubToken ? (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Authentication</FormLabel>
                    <div className="bg-primary/5 border border-primary/10 rounded-2xl h-14 px-6 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-primary font-black text-[10px] uppercase tracking-widest">Environment Token Secured</span>
                    </div>
                  </FormItem>
                ) : (
                  <FormField
                    control={blogPublishForm.control}
                    name="token"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Access Token</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="ghp_••••••••"
                            {...field}
                            className="bg-white/[0.03] border-white/[0.05] text-white placeholder:text-slate-600 hover:bg-white/[0.05] h-14 rounded-2xl px-6 transition-all"
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
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black h-14 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-3 group"
              >
                <div className="relative z-10 flex items-center gap-3">
                  {isLoading ? (
                    <Loader2Icon className="w-5 h-5 animate-spin" />
                  ) : (
                    <SaveIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  )}
                  <span className="uppercase text-xs tracking-[0.2em]">{isLoading ? 'Deploying Manifest...' : 'Execute Deployment'}</span>
                </div>
              </Button>
            </form>
          </Form>
        </div>
      )}

      {/* Markdown Editor Section */}
      <div className="bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] border border-white/[0.05] overflow-hidden shadow-2xl transition-all" data-color-mode="dark">
        <div className="bg-white/[0.03] px-8 py-6 border-b border-white/[0.05] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2 tracking-tight">
              <FileText className="w-5 h-5 text-primary" />
              Source Terminal
            </h3>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
              {markdown ? 'Active Manifest: Editing in progress' : 'Standby: Pending neural generation'}
            </p>
          </div>
        </div>
        <div className="p-1 editor-container relative">
          {!markdown && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <div className="text-center space-y-4 opacity-20">
                <Brain className="w-16 h-16 text-slate-500 mx-auto" />
                <p className="text-sm font-black uppercase tracking-[0.3em] text-slate-500">Awaiting Neural Data</p>
              </div>
            </div>
          )}
          <MarkdownEditor
            value={markdown}
            height="600px"
            onChange={(value) => setMarkdown(value || '')}
            className={`transition-all duration-700 ${!markdown ? 'opacity-5 blur-sm' : 'opacity-100 blur-0'}`}
          />
        </div>

        <style jsx global>{`
          .editor-container .w-md-editor {
            background-color: transparent !important;
            border: none !important;
          }
          .editor-container .w-md-editor-toolbar {
            background-color: rgba(255, 255, 255, 0.02) !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
            padding: 12px 24px !important;
          }
          .editor-container .w-md-editor-toolbar ul li button {
            color: #94a3b8 !important;
            padding: 8px !important;
            border-radius: 12px !important;
            transition: all 0.3s;
          }
          .editor-container .w-md-editor-toolbar ul li button:hover {
            background-color: rgba(59, 130, 246, 0.1) !important;
            color: #3b82f6 !important;
          }
          .editor-container .w-md-editor-content {
            background-color: transparent !important;
          }
          .editor-container .wmde-markdown-var {
            --md-editor-background-color: transparent;
          }
          .editor-container .w-md-editor-input {
            padding: 24px !important;
            font-family: 'JetBrains Mono', 'Fira Code', monospace !important;
            font-size: 14px !important;
            line-height: 1.8 !important;
          }
        `}</style>
      </div>
    </div>
  );
};

export default TextEditor;
