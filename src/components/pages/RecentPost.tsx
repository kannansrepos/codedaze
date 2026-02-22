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
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3 h-3" />
              <span>Trending Now</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Featured <span className="text-primary">Articles</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl">
              Deep dives into .NET architecture, cloud patterns, and modern web development best practices.
            </p>
          </div>

          <Button asChild className="hidden md:flex rounded-full px-8 h-12 bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all font-bold gap-2">
            <Link href="/posts" aria-label="View all articles and tutorials">
              View All Articles
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading Skeletons
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-[450px] rounded-2xl bg-white/5 animate-pulse border border-white/10" />
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
                  transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                >
                  <Link href={`/blog/${post.postId.replace('.md', '')}`} className="group block h-full">
                    <article className="relative h-full bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-sm rounded-[2rem] border border-white/5 hover:border-primary/30 overflow-hidden transition-all duration-500 flex flex-col group min-h-[420px]">
                      {/* Refined Category Indicator */}
                      <div className="p-8 pb-0">
                        <div className="flex items-center justify-between mb-6">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${techConfig.gradient} text-[10px] font-black uppercase tracking-widest text-white shadow-lg`}>
                            {techConfig.name}
                          </span>
                          <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(post.frontmatter?.date || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-slate-800" />
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{post.frontmatter?.readTime || '5 min'}</span>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300 leading-tight mb-4 tracking-tight">
                          {post.frontmatter?.title}
                        </h3>
                      </div>

                      <div className="px-8 pb-8 flex-grow flex flex-col justify-between">
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-8 font-medium">
                          {post.frontmatter?.subtitle || post.frontmatter?.meta_description}
                        </p>

                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                            <span className="relative">
                              Read Article
                              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
                            </span>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                            <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>

        <div className="mt-12 md:hidden flex justify-center">
          <Button asChild className="rounded-full px-8 h-12 bg-primary text-white font-bold gap-2">
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
