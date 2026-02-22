/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { PostIndex } from '@/types/BlogPost';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Calendar, Clock, ChevronRight, TrendingUp } from 'lucide-react';
import { getTechConfig } from '@/lib/techCategories';
import { motion } from 'framer-motion';

const RecentPost = () =>
{
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const formatTitle = (title: string) =>
  {
    if (!title) return '';
    // If it looks like a slug (kebab-case), format it nicely
    if (title.includes('-') && !title.includes(' ') && title === title.toLowerCase())
    {
      return title
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return title;
  };

  useEffect(() =>
  {
    const fetchRecentPosts = async () =>
    {
      try
      {
        setLoading(true);
        // Step 1: Get the IDs for the top 3 posts
        const topPostUrl = '/api/post/data?action=get_top_posts&recordCount=3';
        const res = await fetch(topPostUrl);
        const response = await res.json();

        if (res.ok)
        {
          const postIds = response.data.map((item: PostIndex) => item.postId);

          // Step 2: Get the actual content/frontmatter for these IDs
          const contentResponse = await fetch('/api/post/file?action=get_posts_content', {
            method: 'POST',
            body: JSON.stringify({ postIds }),
          });

          if (contentResponse.ok)
          {
            const contentData = await contentResponse.json();
            setPosts(contentData.data?.downloadResults || []);
          }
        }
      } catch (error)
      {
        console.error('Error fetching recent posts:', error);
        toast.error('Failed to load recent posts');
      } finally
      {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  if (!loading && posts.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <TrendingUp className="w-3 h-3" />
              <span>Curated Insights</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Articles</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl font-medium">
              Deep dives into .NET architecture, cloud patterns, and modern engineering blueprints.
            </p>
          </div>

          <Button asChild className="hidden md:flex rounded-full px-8 h-12 bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all font-bold gap-2 group/btn">
            <Link href="/posts" aria-label="View all articles and tutorials">
              View All Articles
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-[480px] rounded-[2.5rem] bg-white/[0.02] animate-pulse border border-white/10" />
            ))
          ) : (
            posts.map((post, index) =>
            {
              const techConfig = getTechConfig(post.frontmatter?.language || 'general');
              return (
                <motion.div
                  key={post.postId}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={`/blog/${post.postId.replace('.md', '')}`} className="group block h-full">
                    <article className="relative h-full bg-[#0a0f1e] hover:bg-[#0d1428] backdrop-blur-xl rounded-[2.5rem] border border-white/[0.08] hover:border-primary/40 overflow-hidden transition-all duration-500 flex flex-col min-h-[480px] shadow-2xl">

                      {/* Artistic Background Icon */}
                      <div className="absolute top-10 right-10 text-7xl opacity-[0.05] group-hover:opacity-[0.1] group-hover:scale-110 transition-all duration-700 pointer-events-none select-none grayscale group-hover:grayscale-0">
                        {techConfig.icon}
                      </div>

                      {/* Top Accent Line */}
                      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r ${techConfig.gradient} opacity-50 group-hover:w-full transition-all duration-700`} />

                      {/* Content Header */}
                      <div className="p-10 pb-6 relative z-10">
                        <div className="flex items-center justify-between mb-8">
                          <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r ${techConfig.gradient} text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-primary/20`}>
                            {techConfig.name}
                          </span>
                          <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-primary/60" />
                              <span>{new Date(post.frontmatter?.date || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-primary/60" />
                              <span>{post.frontmatter?.readTime || '5m'}</span>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-primary transition-colors duration-500 leading-tight mb-6 tracking-tight xl:min-h-[4.5rem]">
                          {formatTitle(post.frontmatter?.title)}
                        </h3>
                      </div>

                      {/* Content Body */}
                      <div className="px-10 pb-10 flex-grow flex flex-col justify-between relative z-10">
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-4 mb-10 font-medium">
                          {post.frontmatter?.subtitle || post.frontmatter?.meta_description}
                        </p>

                        <div className="pt-8 border-t border-white/[0.03] flex items-center justify-between">
                          <div className="flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
                            <span className="relative">
                              Explore Deep Dive
                              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
                            </span>
                          </div>
                          <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-lg group-hover:shadow-primary/30">
                            <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>

                      {/* Corner Accent */}
                      <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br ${techConfig.gradient} opacity-0 blur-3xl group-hover:opacity-10 transition-opacity duration-1000`} />
                    </article>
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>

        <div className="mt-16 md:hidden flex justify-center">
          <Button asChild className="rounded-full px-10 h-14 bg-primary text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20">
            <Link href="/posts" aria-label="View all articles and tutorials">
              View All Articles
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentPost;
