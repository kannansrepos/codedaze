'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
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

export default function PostContent({ post }: PostContentProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const techConfig = getTechConfig(post.language);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
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
  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share on social media
  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div
          className={`h-full bg-gradient-to-r ${techConfig.gradient} transition-all duration-150`}
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Beautiful Hero Banner - Reduced Height */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${techConfig.gradient}`}>
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: techConfig.pattern === 'dots'
              ? 'radial-gradient(circle, white 1px, transparent 1px)'
              : techConfig.pattern === 'grid'
              ? 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)'
              : techConfig.pattern === 'waves'
              ? 'repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 11px)'
              : 'radial-gradient(circle, white 2px, transparent 2px)',
            backgroundSize: techConfig.pattern === 'grid' ? '30px 30px' : '30px 30px',
          }} />
        </div>

        {/* Floating Tech Icon */}
        <div className="absolute right-10 top-10 text-9xl font-black text-white/50 hidden md:block" style={{
          textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.2)',
          WebkitTextStroke: '2px rgba(255,255,255,0.1)'
        }}>
          {techConfig.icon}
        </div>

        <div className="relative container mx-auto px-4 py-8 md:py-12">
          {/* Back Button */}
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group mb-6"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to all posts</span>
          </Link>

          <div className="max-w-4xl space-y-4">
            {/* Language Badge */}
            <div className="flex items-center gap-2">
              <span className="px-4 py-1.5 text-sm font-bold rounded-full bg-white/90 backdrop-blur-sm shadow-lg" style={{ color: techConfig.color }}>
                {techConfig.icon} {techConfig.name}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
              {post.title}
            </h1>

            {/* Subtitle */}
            {post.subtitle && (
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
                {post.subtitle}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-white/80 pt-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date} className="text-sm">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{post.readTime}</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <span className="text-sm font-medium text-white/80">Share:</span>
              <div className="flex gap-2">
                <button
                  onClick={shareOnTwitter}
                  className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={shareOnFacebook}
                  className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={shareOnLinkedIn}
                  className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={copyLink}
                  className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-colors"
                  aria-label="Copy link"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-8" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50 dark:fill-gray-900"></path>
          </svg>
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 -mt-8 pb-20 max-w-4xl relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
          <div
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-black prose-headings:tracking-tight
              prose-h1:text-4xl md:text-5xl prose-h1:mb-8 prose-h1:mt-12 prose-h1:bg-gradient-to-r prose-h1:from-white prose-h1:via-white/80 prose-h1:to-[#8142EF]/50 prose-h1:inline-block prose-h1:text-transparent prose-h1:bg-clip-text
              prose-h2:text-3xl md:text-4xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:text-[#8142EF] prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4
              prose-h3:text-2xl md:text-3xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-white/90
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
              prose-a:text-[#8142EF] prose-a:no-underline hover:prose-a:underline prose-a:font-bold prose-a:transition-colors
              prose-strong:text-white prose-strong:font-bold
              prose-code:text-white prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:space-y-3
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:space-y-3
              prose-li:text-gray-300 prose-li:text-lg
              prose-blockquote:border-l-4 prose-blockquote:border-[#8142EF] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-white/80 prose-blockquote:bg-white/5 prose-blockquote:py-6 prose-blockquote:rounded-r-2xl
              prose-table:border-collapse prose-table:w-full prose-table:my-8
              prose-th:bg-white/10 prose-th:p-4 prose-th:text-left prose-th:font-black prose-th:text-white
              prose-td:border prose-td:border-white/10 prose-td:p-4 prose-td:text-gray-300
              prose-img:rounded-[2rem] prose-img:shadow-2xl prose-img:my-12 prose-img:border prose-img:border-white/10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Call to Action */}
        <div className={`mt-12 p-8 bg-gradient-to-r ${techConfig.gradient} rounded-2xl text-white text-center shadow-xl`}>
          <h3 className="text-2xl font-bold mb-3">Enjoyed this article?</h3>
          <p className="text-white/90 mb-6">
            Check out more articles on our blog or follow us for updates!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/posts"
              className="px-6 py-3 bg-white font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              style={{ color: techConfig.color }}
            >
              View All Posts
            </Link>
            <button
              onClick={shareOnTwitter}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
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
          className={`p-4 bg-gradient-to-r ${techConfig.gradient} text-white rounded-full shadow-2xl hover:scale-110 transition-transform`}
          aria-label="Share"
        >
          {copied ? <Check className="w-6 h-6" /> : <Share2 className="w-6 h-6" />}
        </button>
      </div>

      {/* VS Code Style for Code Blocks - Enhanced for All Languages */}
      <style jsx global>{`
        /* VS Code Dark Theme for Code Blocks */
        .prose pre {
          background-color: #1e1e1e !important;
          border: 1px solid #333 !important;
          position: relative;
          overflow-x: auto;
          padding: 1.5rem !important;
        }

        .prose pre code {
          background-color: transparent !important;
          color: #d4d4d4 !important;
          font-family: 'Consolas', 'Monaco', 'Courier New', monospace !important;
          font-size: 14px !important;
          line-height: 1.7 !important;
          padding: 0 !important;
          display: block;
        }

        /* Generic Syntax Highlighting (works for all languages) */
        .prose pre code {
          /* Keywords - blue */
          color: #d4d4d4;
        }

        .prose pre code .token.comment,
        .prose pre code .token.prolog,
        .prose pre code .token.doctype,
        .prose pre code .token.cdata {
          color: #6a9955 !important;
          font-style: italic;
        }

        .prose pre code .token.keyword,
        .prose pre code .token.selector,
        .prose pre code .token.important,
        .prose pre code .token.atrule {
          color: #569cd6 !important;
          font-weight: normal;
        }

        .prose pre code .token.string,
        .prose pre code .token.char,
        .prose pre code .token.attr-value,
        .prose pre code .token.regex,
        .prose pre code .token.variable {
          color: #ce9178 !important;
        }

        .prose pre code .token.function,
        .prose pre code .token.function-name {
          color: #dcdcaa !important;
        }

        .prose pre code .token.number,
        .prose pre code .token.boolean,
        .prose pre code .token.constant {
          color: #b5cea8 !important;
        }

        .prose pre code .token.operator,
        .prose pre code .token.entity,
        .prose pre code .token.url {
          color: #d4d4d4 !important;
        }

        .prose pre code .token.class-name,
        .prose pre code .token.type-name {
          color: #4ec9b0 !important;
        }

        .prose pre code .token.property,
        .prose pre code .token.attr-name,
        .prose pre code .token.parameter {
          color: #9cdcfe !important;
        }

        .prose pre code .token.tag,
        .prose pre code .token.builtin {
          color: #569cd6 !important;
        }

        .prose pre code .token.punctuation,
        .prose pre code .token.symbol {
          color: #d4d4d4 !important;
        }

        .prose pre code .token.deleted {
          color: #f44747 !important;
        }

        .prose pre code .token.inserted {
          color: #4ec9b0 !important;
        }

        .prose pre code .token.namespace {
          opacity: 0.7;
        }

        /* Language-specific improvements */
        .prose pre code .token.decorator,
        .prose pre code .token.annotation {
          color: #dcdcaa !important;
        }

        .prose pre code .token.module {
          color: #4ec9b0 !important;
        }

        /* Make inline code stand out */
        .prose code:not(pre code) {
          background-color: #f3f4f6 !important;
          color: #e91e63 !important;
          padding: 0.2em 0.4em !important;
          border-radius: 3px !important;
          font-size: 0.9em !important;
        }

        .dark .prose code:not(pre code) {
          background-color: #374151 !important;
          color: #f472b6 !important;
        }

        /* Selection Color */
        .prose pre code ::selection {
          background-color: #264f78 !important;
          color: #ffffff !important;
        }

        .prose pre code ::-moz-selection {
          background-color: #264f78 !important;
          color: #ffffff !important;
        }

        /* Scrollbar Styling */
        .prose pre::-webkit-scrollbar {
          height: 10px;
          width: 10px;
        }

        .prose pre::-webkit-scrollbar-track {
          background: #1e1e1e;
          border-radius: 4px;
        }

        .prose pre::-webkit-scrollbar-thumb {
          background: #424242;
          border-radius: 4px;
        }

        .prose pre::-webkit-scrollbar-thumb:hover {
          background: #4e4e4e;
        }

        /* Line highlighting on hover */
        .prose pre code:hover {
          background-color: #2a2a2a;
        }
      `}</style>
    </div>
  );
}
