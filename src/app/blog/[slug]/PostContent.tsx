'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import
{
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Check
} from 'lucide-react';
import { getTechConfig } from '@/lib/techCategories';

type PostData = {
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  language: string;
  meta_description: string;
  content: string;
};

type PostContentProps = {
  post: PostData;
};

export default function PostContent({ post }: PostContentProps)
{
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const techConfig = getTechConfig(post.language);

  // Reading progress tracker
  useEffect(() =>
  {
    const handleScroll = () =>
    {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / documentHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Copy link to clipboard
  const copyLink = async () =>
  {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share on social media
  const shareOnTwitter = () =>
  {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const shareOnFacebook = () =>
  {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareOnLinkedIn = () =>
  {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Minimal Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-transparent z-[60]">
        <div
          className="h-full bg-primary transition-all duration-150 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Clean Hero Header */}
      <div className="relative overflow-hidden">
        {/* Subtle ambient glow based on tech color */}
        <div className="absolute -top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full blur-[150px] opacity-20 pointer-events-none"
          style={{ backgroundColor: techConfig.color }}
        />

        <div className="relative container mx-auto px-4 pt-28 pb-16 md:pt-36 md:pb-24">
          {/* Back Button - Minimal */}
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors group mb-12 text-xs font-black uppercase tracking-[0.2em]"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>All Articles</span>
          </Link>

          <div className="max-w-4xl space-y-8">
            {/* Tech Badge */}
            <div className="flex items-center gap-4">
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r ${techConfig.gradient} text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg`}>
                {techConfig.name}
              </span>
            </div>

            {/* Title - Clean and Dominant */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight">
              {post.title}
            </h1>

            {/* Subtitle */}
            {post.subtitle && (
              <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl font-medium">
                {post.subtitle}
              </p>
            )}

            {/* Meta Bar */}
            <div className="flex flex-wrap items-center gap-8 pt-4">
              <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-700" />
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Share Buttons - Inline, Minimal */}
              <div className="flex items-center gap-1.5 ml-auto">
                <button
                  onClick={shareOnTwitter}
                  className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] text-slate-500 hover:text-white transition-all flex items-center justify-center"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={shareOnFacebook}
                  className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] text-slate-500 hover:text-white transition-all flex items-center justify-center"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={shareOnLinkedIn}
                  className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] text-slate-500 hover:text-white transition-all flex items-center justify-center"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={copyLink}
                  className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] text-slate-500 hover:text-white transition-all flex items-center justify-center"
                  aria-label="Copy link"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Divider instead of Wave */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-16 md:py-24 max-w-4xl relative z-10">
        <div className="bg-white/[0.02] backdrop-blur-sm rounded-[2.5rem] p-8 md:p-14 lg:p-20 border border-white/[0.05]">
          <div
            className="prose prose-lg prose-invert max-w-none
              prose-headings:font-black prose-headings:tracking-tight
              prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:mb-8 prose-h1:mt-12 prose-h1:text-white
              prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mb-6 prose-h2:mt-14 prose-h2:text-white prose-h2:border-b prose-h2:border-white/[0.05] prose-h2:pb-4
              prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mb-4 prose-h3:mt-10 prose-h3:text-white/90
              prose-p:text-slate-300 prose-p:leading-[1.9] prose-p:mb-6 prose-p:text-[17px]
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-bold prose-a:transition-colors
              prose-strong:text-white prose-strong:font-bold
              prose-code:text-white prose-code:bg-white/[0.06] prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:space-y-2
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:space-y-2
              prose-li:text-slate-300 prose-li:text-[17px] prose-li:leading-relaxed
              prose-blockquote:border-l-[3px] prose-blockquote:border-primary prose-blockquote:pl-8 prose-blockquote:italic prose-blockquote:text-slate-300 prose-blockquote:bg-white/[0.02] prose-blockquote:py-6 prose-blockquote:pr-6 prose-blockquote:rounded-r-2xl prose-blockquote:my-8
              prose-table:border-collapse prose-table:w-full prose-table:my-8
              prose-th:bg-white/[0.04] prose-th:p-4 prose-th:text-left prose-th:font-bold prose-th:text-white prose-th:text-sm prose-th:uppercase prose-th:tracking-wider
              prose-td:border prose-td:border-white/[0.05] prose-td:p-4 prose-td:text-slate-300
              prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-12 prose-img:border prose-img:border-white/[0.05]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Article Footer - Refined CTA */}
        <div className="mt-16 p-10 md:p-14 bg-white/[0.02] rounded-[2.5rem] border border-white/[0.05] text-center space-y-8 overflow-hidden relative">
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/5 blur-[80px] pointer-events-none" />

          <div className="relative space-y-4">
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">Enjoyed this article?</h3>
            <p className="text-slate-400 text-lg font-medium max-w-xl mx-auto">
              Explore more deep dives into architecture, performance, and modern .NET.
            </p>
          </div>
          <div className="relative flex flex-wrap justify-center gap-4">
            <Link
              href="/posts"
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-black rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:scale-[1.02] active:scale-[0.98] text-sm uppercase tracking-widest"
            >
              View All Articles
            </Link>
            <button
              onClick={shareOnTwitter}
              className="px-8 py-4 bg-white/[0.03] border border-white/10 text-white font-black rounded-xl hover:bg-white/[0.06] transition-all text-sm uppercase tracking-widest"
            >
              Share on Twitter
            </button>
          </div>
        </div>
      </article>

      {/* Floating Share Button (Mobile) */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <button
          onClick={copyLink}
          className="p-4 bg-primary text-white rounded-full shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:scale-110 transition-transform active:scale-95"
          aria-label="Share"
        >
          {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
        </button>
      </div>

      {/* VS Code Theme for Code Blocks - Refined */}
      <style jsx global>{`
        /* VS Code Dark Theme - Enhanced */
        .prose pre {
          background-color: #0d1117 !important;
          border: 1px solid rgba(255,255,255,0.06) !important;
          border-radius: 1rem !important;
          position: relative;
          overflow-x: auto;
          padding: 1.5rem !important;
          margin: 2rem 0 !important;
        }

        .prose pre code {
          background-color: transparent !important;
          color: #e6edf3 !important;
          font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace !important;
          font-size: 13px !important;
          line-height: 1.8 !important;
          padding: 0 !important;
          display: block;
        }

        .prose pre code .token.comment,
        .prose pre code .token.prolog,
        .prose pre code .token.doctype,
        .prose pre code .token.cdata {
          color: #8b949e !important;
          font-style: italic;
        }

        .prose pre code .token.keyword,
        .prose pre code .token.selector,
        .prose pre code .token.important,
        .prose pre code .token.atrule {
          color: #ff7b72 !important;
        }

        .prose pre code .token.string,
        .prose pre code .token.char,
        .prose pre code .token.attr-value,
        .prose pre code .token.regex,
        .prose pre code .token.variable {
          color: #a5d6ff !important;
        }

        .prose pre code .token.function,
        .prose pre code .token.function-name {
          color: #d2a8ff !important;
        }

        .prose pre code .token.number,
        .prose pre code .token.boolean,
        .prose pre code .token.constant {
          color: #79c0ff !important;
        }

        .prose pre code .token.operator,
        .prose pre code .token.entity,
        .prose pre code .token.url {
          color: #e6edf3 !important;
        }

        .prose pre code .token.class-name,
        .prose pre code .token.type-name {
          color: #ffa657 !important;
        }

        .prose pre code .token.property,
        .prose pre code .token.attr-name,
        .prose pre code .token.parameter {
          color: #79c0ff !important;
        }

        .prose pre code .token.tag,
        .prose pre code .token.builtin {
          color: #7ee787 !important;
        }

        .prose pre code .token.punctuation,
        .prose pre code .token.symbol {
          color: #e6edf3 !important;
        }

        .prose pre code .token.deleted {
          color: #ffa198 !important;
          background: rgba(248,81,73,0.1);
        }

        .prose pre code .token.inserted {
          color: #7ee787 !important;
          background: rgba(63,185,80,0.1);
        }

        .prose pre code .token.namespace {
          opacity: 0.7;
        }

        .prose pre code .token.decorator,
        .prose pre code .token.annotation {
          color: #d2a8ff !important;
        }

        .prose pre code .token.module {
          color: #ffa657 !important;
        }

        /* Inline code - Premium look */
        .prose code:not(pre code) {
          background-color: rgba(255,255,255,0.06) !important;
          color: #79c0ff !important;
          padding: 0.2em 0.5em !important;
          border-radius: 6px !important;
          font-size: 0.88em !important;
          font-weight: 500;
          border: 1px solid rgba(255,255,255,0.05);
        }

        /* Selection Color */
        .prose pre code ::selection {
          background-color: #264f78 !important;
          color: #ffffff !important;
        }

        /* Custom Scrollbar for Code Blocks */
        .prose pre::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }

        .prose pre::-webkit-scrollbar-track {
          background: transparent;
        }

        .prose pre::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.08);
          border-radius: 10px;
        }

        .prose pre::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.15);
        }
      `}</style>
    </div>
  );
}
