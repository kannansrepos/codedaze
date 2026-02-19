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

import { Brain, Loader2Icon, SaveIcon, Wand2, FileText, Sparkles, Zap, Clock, ChevronDown, Rocket } from 'lucide-react';
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
    <div className="flex flex-col gap-10">
      {/* Token Expiry Warning Banner */}
      {tokenExpiryWarning && (
        <div className={`group rounded-[2rem] border px-6 py-5 flex items-center gap-5 transition-all animate-in fade-in slide-in-from-top-4 duration-500 ${tokenExpiryWarning.includes('expired')
          ? 'bg-red-500/[0.03] border-red-500/10 hover:border-red-500/20'
          : 'bg-amber-500/[0.03] border-amber-500/10 hover:border-amber-500/20'
          }`}>
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${tokenExpiryWarning.includes('expired')
            ? 'bg-red-500/10'
            : 'bg-amber-500/10'
            }`}>
            <span className="text-2xl">⚠️</span>
          </div>
          <div className="flex-1">
            <p className={`font-black text-xs uppercase tracking-[0.2em] ${tokenExpiryWarning.includes('expired')
              ? 'text-red-500'
              : 'text-amber-500'
              }`}>
              {tokenExpiryWarning}
            </p>
            <p className="text-[11px] text-slate-500 font-bold mt-1.5 uppercase tracking-widest leading-relaxed">
              Required action: Renew <span className="text-slate-400">NEXT_PUBLIC_GITHUB_TOKEN</span> in environment configuration.
            </p>
          </div>
        </div>
      )}

      {/* Generation Section */}
      <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[3rem] border border-white/[0.05] p-10 shadow-3xl relative overflow-hidden group/card transition-all hover:border-white/[0.08]">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full group-hover/card:bg-primary/8 transition-colors" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center group-hover/card:scale-105 transition-all duration-500">
              <Brain className="w-8 h-8 text-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tighter">Brainstorm Hub</h2>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.25em] mt-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse" />
                AI Content Synthesis
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {process.env.NEXT_PUBLIC_CRON_SCHEDULE && (
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-[10px] font-black uppercase tracking-widest text-slate-400">
                <Clock className="w-4 h-4 text-primary" />
                <span>Sync: {process.env.NEXT_PUBLIC_CRON_SCHEDULE}</span>
              </div>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={triggerCron}
              disabled={isCronLoading}
              className="bg-primary/20 border-primary/30 hover:bg-primary border hover:border-primary text-white h-12 px-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 group/cron"
            >
              {isCronLoading ? (
                <Loader2Icon className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Zap className="w-4 h-4 mr-2 text-primary group-hover/cron:text-white" />
              )}
              Execute Cron
            </Button>
          </div>
        </div>

        <Form {...blogEditorForm}>
          <form
            onSubmit={blogEditorForm.handleSubmit(onSubmit, onErrors)}
            className="space-y-10 relative z-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FormField
                control={blogEditorForm.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2 mb-3 block">Neural Architecture</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-white/[0.03] border-white/[0.08] hover:border-primary/30 text-white h-16 rounded-2xl px-6 transition-all shadow-inner group/trigger">
                          <SelectValue placeholder="Select Engine" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/[0.1] rounded-2xl p-2 shadow-3xl text-white outline-none">
                          {Object.entries(AIModels)
                            .filter(([key]) => isNaN(Number(key)))
                            .map(([key]) => (
                              <SelectItem key={key} value={key.toString()} className="text-xs font-black uppercase tracking-widest py-3.5 px-4 rounded-xl text-slate-300 hover:bg-primary/20 hover:text-white focus:bg-primary/20 focus:text-white transition-all cursor-pointer mb-1 last:mb-0">
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
                    <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2 mb-3 block">Core Ecosystem</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-white/[0.03] border-white/[0.08] hover:border-primary/30 text-white h-16 rounded-2xl px-6 transition-all shadow-inner">
                          <SelectValue placeholder="Select Stack" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/[0.1] rounded-2xl p-2 shadow-3xl text-white outline-none">
                          {Object.entries(Language)
                            .filter(([key]) => isNaN(Number(key)))
                            .map(([key]) => (
                              <SelectItem key={key} value={key.toString()} className="text-xs font-black uppercase tracking-widest py-3.5 px-4 rounded-xl text-slate-300 hover:bg-primary/20 hover:text-white focus:bg-primary/20 focus:text-white transition-all cursor-pointer mb-1 last:mb-0">
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
                    <div className="flex justify-between items-center mb-3 px-2">
                      <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Project Scope</FormLabel>
                      <button
                        type="button"
                        onClick={fetchTrendingTopics}
                        disabled={isTrendingLoading}
                        className="text-[9px] font-black uppercase tracking-[0.2em] text-primary hover:text-white transition-all flex items-center gap-1.5 group/trending"
                      >
                        {isTrendingLoading ? (
                          <Loader2Icon className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5 group-hover/trending:scale-110 transition-transform" />
                        )}
                        Research Trends
                      </button>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Advanced Patterns in .NET..."
                        {...field}
                        className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-primary/50 focus:ring-primary/20 h-16 rounded-2xl px-6 transition-all shadow-inner text-sm font-medium"
                      />
                    </FormControl>

                    {/* Trending Topics Suggestions */}
                    {trendingTopics.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 duration-500">
                        {trendingTopics.map((topic, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() =>
                            {
                              blogEditorForm.setValue('topic', topic);
                              setTrendingTopics([]);
                            }}
                            className="text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-slate-400 hover:bg-primary/20 hover:text-white hover:border-primary/40 transition-all shadow-lg hover:-translate-y-0.5"
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
              className="w-full bg-primary hover:bg-primary/90 text-white font-black h-16 rounded-2xl shadow-[0_10px_40px_rgba(var(--primary),0.3)] hover:shadow-[0_15px_50px_rgba(var(--primary),0.4)] transition-all flex items-center justify-center gap-4 group/btn"
            >
              <div className="relative z-10 flex items-center gap-4">
                {isLoading ? (
                  <Loader2Icon className="w-6 h-6 animate-spin" />
                ) : (
                  <Rocket className="w-6 h-6 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform duration-500" />
                )}
                <span className="uppercase text-sm tracking-[0.3em] ml-1">{isLoading ? 'Initializing Neural Matrix...' : 'Generate Article'}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] transition-transform" />
            </Button>
          </form>
        </Form>
      </div>

      {/* Publish Section - Only shown when markdown exists */}
      {markdown && (
        <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[3rem] border border-white/[0.05] p-10 shadow-3xl relative overflow-hidden transition-all animate-in zoom-in-95 duration-700">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full" />

          <div className="flex items-center gap-5 mb-10 text-emerald-500">
            <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tighter leading-none">Final Manifest</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] mt-1.5 opacity-60">Ready for Production</p>
            </div>
          </div>

          <Form {...blogPublishForm}>
            <form
              onSubmit={blogPublishForm.handleSubmit(onPublishFormSubmit)}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={blogPublishForm.control}
                  name="fileName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2 mb-3 block">Deployment Slug</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="architecture-patterns-2024"
                          {...field}
                          className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 h-16 rounded-2xl px-6 transition-all shadow-inner"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2 mb-3 block">Security Protocol</FormLabel>
                  {githubToken ? (
                    <div className="bg-emerald-500/[0.05] border border-emerald-500/10 rounded-2xl h-16 px-6 flex items-center gap-4 shadow-inner">
                      <div className="relative">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 blur-[4px] animate-pulse" />
                      </div>
                      <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.2em]">OAuth Handshake Secured</span>
                    </div>
                  ) : (
                    <FormField
                      control={blogPublishForm.control}
                      name="token"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="ghp_••••••••••••••••••••••••"
                              {...field}
                              className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 h-16 rounded-2xl px-6 transition-all shadow-inner"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black h-16 rounded-2xl shadow-[0_10px_40px_rgba(16,185,129,0.2)] hover:shadow-[0_15px_50px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-4 group/publish"
              >
                <div className="relative z-10 flex items-center gap-4">
                  {isLoading ? (
                    <Loader2Icon className="w-6 h-6 animate-spin" />
                  ) : (
                    <SaveIcon className="w-6 h-6 group-hover/publish:scale-110 transition-transform" />
                  )}
                  <span className="uppercase text-sm tracking-[0.3em]">{isLoading ? 'Deploying Manifest...' : 'Push to Production'}</span>
                </div>
              </Button>
            </form>
          </Form>
        </div>
      )}

      {/* Markdown Editor Section */}
      <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[3rem] border border-white/[0.05] overflow-hidden shadow-3xl transition-all hover:border-white/[0.1] group/editor" data-color-mode="dark">
        <div className="bg-white/[0.03] px-10 py-8 border-b border-white/[0.05] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary group-hover/editor:rotate-3 transition-transform" />
              <h3 className="text-2xl font-black text-white tracking-tight">Source Manifest</h3>
            </div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${markdown ? 'bg-primary animate-pulse' : 'bg-slate-600'}`} />
              {markdown ? 'Active Revision: Synthesis Complete' : 'Awaiting Neural Stream'}
            </p>
          </div>
        </div>
        <div className="p-2 editor-container relative">
          {!markdown && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none p-10">
              <div className="text-center space-y-6 opacity-20">
                <Brain className="w-20 h-20 text-slate-400 mx-auto animate-pulse" />
                <div className="space-y-2">
                  <p className="text-sm font-black uppercase tracking-[0.4em] text-slate-400">Initialize Neural Feed</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Configure parameters above to start generation</p>
                </div>
              </div>
            </div>
          )}
          <MarkdownEditor
            value={markdown}
            height="700px"
            onChange={(value) => setMarkdown(value || '')}
            className={`transition-all duration-1000 ${!markdown ? 'opacity-5 blur-md grayscale' : 'opacity-100 blur-0'}`}
          />
        </div>

        <style jsx global>{`
          .editor-container .w-md-editor {
            background-color: transparent !important;
            border: none !important;
          }
          .editor-container .w-md-editor-toolbar {
            background-color: rgba(255, 255, 255, 0.01) !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.03) !important;
            padding: 16px 32px !important;
          }
          .editor-container .w-md-editor-toolbar ul li button {
            color: #64748b !important;
            padding: 10px !important;
            border-radius: 14px !important;
            transition: all 0.3s;
          }
          .editor-container .w-md-editor-toolbar ul li button:hover {
            background-color: rgba(59, 130, 246, 0.1) !important;
            color: #3b82f6 !important;
            transform: translateY(-1px);
          }
          .editor-container .w-md-editor-content {
            background-color: transparent !important;
          }
          .editor-container .wmde-markdown-var {
            --md-editor-background-color: transparent;
          }
          .editor-container .w-md-editor-input {
            padding: 40px !important;
            font-family: 'JetBrains Mono', 'Fira Code', monospace !important;
            font-size: 15px !important;
            line-height: 2 !important;
            color: #cbd5e1 !important;
          }
           @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default TextEditor;
