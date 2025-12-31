/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { PostIndex } from '@/types/BlogPost';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Calendar, Clock, ChevronRight, Rocket, TrendingUp } from 'lucide-react';
import { getTechConfig } from '@/lib/techCategories';
import { motion } from 'framer-motion';

const RecentPost = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        setLoading(true);
        // Step 1: Get the IDs for the top 3 posts
        const topPostUrl = '/api/post/data?action=get_top_posts&recordCount=3';
        const res = await fetch(topPostUrl);
        const response = await res.json();

        if (res.ok) {
          const postIds = response.data.map((item: PostIndex) => item.postId);

          // Step 2: Get the actual content/frontmatter for these IDs
          const contentResponse = await fetch('/api/post/file?action=get_posts_content', {
            method: 'POST',
            body: JSON.stringify({ postIds }),
          });

          if (contentResponse.ok) {
            const contentData = await contentResponse.json();
            setPosts(contentData.data?.downloadResults || []);
          }
        }
      } catch (error) {
        console.error('Error fetching recent posts:', error);
        toast.error('Failed to load recent posts');
      } finally {
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
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

          <Link href="/posts">
            <Button className="hidden md:flex rounded-full px-8 h-12 bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all font-bold gap-2">
              View All Articles
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading Skeletons
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-[450px] rounded-2xl bg-white/5 animate-pulse border border-white/10" />
            ))
          ) : (
            posts.map((post, index) => {
              const techConfig = getTechConfig(post.frontmatter?.language || 'general');
              return (
                <motion.div
                  key={post.postId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.postId.replace('.md', '')}`} className="group block h-full">
                    <article className="h-full bg-white/[0.08] backdrop-blur-3xl rounded-[2.5rem] border border-white/20 overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)] hover:border-primary/60 flex flex-col shadow-2xl">
                      {/* Gradient Visual Header */}
                      <div className={`relative h-48 bg-gradient-to-br ${techConfig.gradient} overflow-hidden`}>
                        {/* Background Decoration */}
                        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,white_0%,transparent_50%)]" />

                        {/* Technology Icon Overlay */}
                        <div className="absolute top-6 right-6 text-7xl opacity-10 transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
                          {techConfig.icon}
                        </div>

                        {/* Category Badge */}
                        <div className="absolute bottom-6 left-6">
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold shadow-lg">
                            <span className="text-lg">{techConfig.icon}</span>
                            {techConfig.name}
                          </span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-8 flex-grow flex flex-col gap-4">
                        <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{new Date(post.frontmatter?.date || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{post.frontmatter?.readTime || '5 min read'}</span>
                          </div>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                          {post.frontmatter?.title}
                        </h3>

                        <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                          {post.frontmatter?.subtitle || post.frontmatter?.meta_description}
                        </p>

                        <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                          <div className="flex items-center gap-2 text-primary font-bold text-sm">
                            <Rocket className="w-4 h-4" />
                            <span>Read Article</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
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
          <Link href="/posts">
            <Button className="rounded-full px-8 h-12 bg-primary text-white font-bold gap-2">
              View All Articles
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentPost;
