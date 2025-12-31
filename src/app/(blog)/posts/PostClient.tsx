'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Calendar, Clock, Tag, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
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

const PostClientContent = ({ allPosts }: PostClientProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get('page') ?? '1');
  const selectedLanguage = searchParams.get('category');
  const headingRef = useRef<HTMLDivElement | null>(null);

  const [currentPosts, setCurrentPosts] = useState<PostMetadata[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<PostMetadata[]>([]);

  useEffect(() => {
    let posts = [...allPosts];

    if (selectedLanguage) {
      posts = posts.filter(
        (post) =>
          post.language != null &&
          post.language.toLowerCase() === selectedLanguage.toLowerCase()
      );
    }

    if (searchTerm) {
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

  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [page, selectedLanguage]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/posts?${params.toString()}`, { scroll: false });
  };

  const changeLanguage = (newLanguage: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newLanguage && newLanguage !== selectedLanguage) {
      params.set('category', newLanguage);
    } else {
      params.delete('category');
    }
    params.set('page', '1');
    router.push(`/posts?${params.toString()}`, { scroll: false });
  };

  const uniqueLanguages = Array.from(
    new Set(allPosts.map((post) => post.language))
  ).filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-20">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Hero Section */}
      <div ref={headingRef} className="relative overflow-hidden py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              <span>{allPosts.length} Articles & Counting</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Discover <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">Insights</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Explore technical articles, tutorials, and insights on modern development
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles by title, topic, or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="sticky top-[68px] z-50 bg-[#020617]/80 backdrop-blur-xl border-y border-white/10 shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <Tag className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <button
              onClick={() => changeLanguage('')}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                !selectedLanguage
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              All Posts ({allPosts.length})
            </button>
            {uniqueLanguages.map((language) => {
              const count = allPosts.filter(p => p.language === language).length;
              const techConfig = getTechConfig(language);
              return (
                <button
                  key={language}
                  onClick={() => changeLanguage(language)}
                  className={`px-5 py-2.5 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                    selectedLanguage === language
                      ? `bg-gradient-to-r ${techConfig.gradient} text-white shadow-lg scale-105`
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <span>{techConfig.icon}</span>
                  <span>{techConfig.name} ({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 py-12">
        {currentPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white/5 backdrop-blur-sm rounded-full mb-6 border border-white/10">
              <Search className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">
              No posts found
            </h3>
            <p className="text-gray-400 text-lg">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPosts.map((post, index) => {
                const techConfig = getTechConfig(post.language);

                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group"
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <article className="h-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-white/30">
                      {/* Gradient Header */}
                      <div className={`relative h-40 bg-gradient-to-br ${techConfig.gradient} overflow-hidden`}>
                        {/* Floating Icon */}
                        <div className="absolute top-4 right-4 text-6xl opacity-20 transform rotate-12">
                          {techConfig.icon}
                        </div>

                        {/* Category Badge */}
                        <div className="absolute bottom-4 left-4">
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm text-white text-sm font-semibold">
                            {techConfig.icon} {techConfig.name}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-gray-400 text-sm line-clamp-2">
                          {post.subtitle || post.meta_description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        {/* Read More */}
                        <div className="pt-2">
                          <span className="inline-flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-3 transition-all">
                            Read Article
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => changePage(page - 1)}
                  disabled={page === 1}
                  className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => changePage(pageNum)}
                    className={`min-w-[44px] h-11 rounded-lg font-semibold transition-all ${
                      pageNum === page
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => changePage(page + 1)}
                  disabled={page === totalPages}
                  className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
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

export default function PostClient({ allPosts }: PostClientProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900" />}>
      <PostClientContent allPosts={allPosts} />
    </Suspense>
  );
}
