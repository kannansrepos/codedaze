'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Calendar, Clock, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { getTechConfig } from '@/lib/techCategories';

export type PostMetadata = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  language: string;
  meta_description: string;
};

type PostClientProps = {
  allPosts: PostMetadata[];
};

const POSTS_PER_PAGE = 9;

const PostClientContent = ({ allPosts }: PostClientProps) =>
{
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get('page') ?? '1');
  const selectedLanguage = searchParams.get('category');
  const headingRef = useRef<HTMLDivElement | null>(null);

  const [currentPosts, setCurrentPosts] = useState<PostMetadata[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<PostMetadata[]>([]);

  useEffect(() =>
  {
    let posts = [...allPosts];

    if (selectedLanguage)
    {
      posts = posts.filter(
        (post) =>
          post.language != null &&
          post.language.toLowerCase() === selectedLanguage.toLowerCase()
      );
    }

    if (searchTerm)
    {
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.meta_description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setFilteredPosts(posts);

    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    setCurrentPosts(posts.slice(startIndex, endIndex));
  }, [allPosts, page, selectedLanguage, searchTerm]);

  useEffect(() =>
  {
    if (headingRef.current)
    {
      headingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [page, selectedLanguage]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const changePage = (newPage: number) =>
  {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/posts?${params.toString()}`, { scroll: false });
  };

  const changeLanguage = (newLanguage: string) =>
  {
    const params = new URLSearchParams(searchParams.toString());
    if (newLanguage && newLanguage !== selectedLanguage)
    {
      params.set('category', newLanguage);
    } else
    {
      params.delete('category');
    }
    params.set('page', '1');
    router.push(`/posts?${params.toString()}`, { scroll: false });
  };

  const uniqueLanguages = Array.from(
    new Set(allPosts.map((post) => post.language))
  ).filter(Boolean);

  return (
    <div className="min-h-screen pt-28">

      {/* Hero Section */}
      <div ref={headingRef} className="relative overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <span>{allPosts.length} Articles & Counting</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.9]">
              All <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Articles</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
              Explore technical deep dives, tutorials, and insights on modern development.
            </p>

            {/* Search Bar - Premium Glassmorphism */}
            <div className="max-w-2xl mx-auto mt-10">
              <div className="relative p-1 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by title, topic, or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 rounded-xl bg-transparent text-white placeholder-slate-500 focus:outline-none text-lg font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filters - Minimal Pill Style */}
      <div className="sticky top-[68px] z-50 bg-[#020617]/90 backdrop-blur-xl border-y border-white/[0.05]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => changeLanguage('')}
              className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${!selectedLanguage
                ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : 'bg-white/[0.03] text-slate-400 hover:bg-white/[0.06] border border-white/[0.05] hover:text-white'
                }`}
            >
              All ({allPosts.length})
            </button>
            {uniqueLanguages.map((language) =>
            {
              const count = allPosts.filter(p => p.language === language).length;
              const techConfig = getTechConfig(language);
              return (
                <button
                  key={language}
                  onClick={() => changeLanguage(language)}
                  className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-2 ${selectedLanguage === language
                    ? `bg-gradient-to-r ${techConfig.gradient} text-white shadow-lg`
                    : 'bg-white/[0.03] text-slate-400 hover:bg-white/[0.06] border border-white/[0.05] hover:text-white'
                    }`}
                >
                  <span>{techConfig.name}</span>
                  <span className="opacity-50">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 py-16">
        {currentPosts.length === 0 ? (
          <div className="text-center py-32">
            <div className="inline-block p-8 bg-white/[0.02] rounded-full mb-8 border border-white/[0.05]">
              <Search className="w-12 h-12 text-slate-500" />
            </div>
            <h3 className="text-3xl font-black text-white mb-4 tracking-tight">
              No articles found
            </h3>
            <p className="text-slate-400 text-lg font-medium">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPosts.map((post, index) =>
              {
                const techConfig = getTechConfig(post.language);

                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.08}s both`
                    }}
                  >
                    <article className="relative h-full bg-white/[0.02] hover:bg-white/[0.04] rounded-[2rem] border border-white/[0.05] hover:border-primary/30 overflow-hidden transition-all duration-500 flex flex-col min-h-[380px]">
                      {/* Category & Meta */}
                      <div className="p-8 pb-0">
                        <div className="flex items-center justify-between mb-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${techConfig.gradient} text-[9px] font-black uppercase tracking-[0.15em] text-white shadow-lg`}>
                            {techConfig.name}
                          </span>
                          <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-slate-800" />
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>

                        <h2 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight tracking-tight mb-3">
                          {post.title}
                        </h2>
                      </div>

                      {/* Body */}
                      <div className="px-8 pb-8 flex-grow flex flex-col justify-between">
                        <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed font-medium mb-8">
                          {post.subtitle || post.meta_description}
                        </p>

                        {/* Footer */}
                        <div className="pt-5 border-t border-white/[0.05] flex items-center justify-between">
                          <span className="relative text-primary font-bold text-xs uppercase tracking-widest">
                            Read Article
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
                          </span>
                          <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>

            {/* Pagination - Clean Pill Style */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-20">
                <button
                  onClick={() => changePage(page - 1)}
                  disabled={page === 1}
                  className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] text-white disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/[0.06] transition-all flex items-center justify-center"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => changePage(pageNum)}
                    className={`w-10 h-10 rounded-full text-sm font-black transition-all ${pageNum === page
                      ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'bg-white/[0.03] border border-white/[0.05] text-slate-400 hover:bg-white/[0.06] hover:text-white'
                      }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => changePage(page + 1)}
                  disabled={page === totalPages}
                  className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] text-white disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/[0.06] transition-all flex items-center justify-center"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default function PostClient({ allPosts }: PostClientProps)
{
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020617]" />}>
      <PostClientContent allPosts={allPosts} />
    </Suspense>
  );
}
