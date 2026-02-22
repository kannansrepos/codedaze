import { getPostById } from '@/lib/posts';
import { marked } from 'marked';
import ImageWithFallback from '@/components/ImageWithFallback';
import { MailIcon, Calendar, Clock, ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import generate_Metadata from '@/lib/generateMetadata';
import { Metadata } from 'next';
import { getTechConfig } from '@/lib/techCategories';

type Props = {
  params: { postId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata>
{
  const post = await getPostById(params.postId);
  if (!post) return {};

  return generate_Metadata({
    title: post.frontmatter.title,
    description: post.frontmatter.subtitle || post.frontmatter.meta_description || '',
    url: `https://codedaze.tech/blog/${params.postId}`,
    image: `https://codedaze.tech/img/${post.frontmatter.language || 'default'}.png`,
    keywords: (post.frontmatter.SEO_Keywords_List || post.frontmatter.keywords) as string | undefined,
    type: 'article',
  });
}

export default async function PostDetail({ params }: Props)
{
  const post = await getPostById(params.postId);

  if (!post)
  {
    notFound();
  }

  const htmlContent = await marked(post.content);
  const techConfig = getTechConfig(post.frontmatter.language || 'general');

  return (
    <div className="min-h-screen text-gray-100">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background - Subtle ambient glow */}
        <div className="absolute -top-[30%] -right-[15%] w-[50%] h-[70%] rounded-full blur-[150px] opacity-15 pointer-events-none"
          style={{ backgroundColor: techConfig.color }}
        />

        {/* Hero Image - Subtle Background */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={`/img/${post.frontmatter.language}.png`}
            alt={post.frontmatter.title}
            fill
            priority
            fallbackSrc="/img/default.png"
            className="object-cover opacity-[0.04]"
          />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 pt-28 pb-16 md:pt-36 md:pb-24 max-w-5xl">
          <Link
            href="/posts"
            aria-label="Back to all articles"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors font-black group mb-12 text-xs uppercase tracking-[0.2em]"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Articles
          </Link>

          <div className="max-w-4xl space-y-8">
            {/* Tech Badge */}
            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r ${techConfig.gradient} text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg`}>
              {techConfig.name}
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-white">
              {post.frontmatter.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>{new Date(post.frontmatter.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-700" />
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>{post.frontmatter.readTime || '5 min read'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Main Content */}
          <main className="w-full lg:w-3/4">
            <article className="prose prose-invert prose-blue max-w-none bg-white/[0.02] backdrop-blur-sm p-8 md:p-14 lg:p-20 rounded-[2.5rem] border border-white/[0.05]">
              <div
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                className="markdown-content"
              />
            </article>
          </main>

          {/* Sidebar - Refined */}
          <aside className="w-full lg:w-1/4 space-y-8">
            <div className="sticky top-28">
              {/* Newsletter CTA */}
              <div className="bg-white/[0.02] backdrop-blur-sm p-8 rounded-[2rem] border border-white/[0.05] space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-black text-white flex items-center gap-2 tracking-tight">
                    <MailIcon className="text-primary w-5 h-5" />
                    Newsletter
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">
                    Get insights on .NET, cloud architecture, and modern engineering delivered weekly.
                  </p>
                </div>

                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="bg-white/[0.03] border-white/[0.05] text-white placeholder:text-slate-600 rounded-xl h-12 focus:border-primary focus:ring-primary"
                  />
                  <Button className="w-full rounded-xl h-12 bg-primary hover:bg-primary/80 text-white font-black transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)] text-xs uppercase tracking-widest">
                    Subscribe
                  </Button>
                </div>
              </div>

              {/* Related Tech */}
              {post.frontmatter.language && (
                <div className="mt-6 p-8 bg-white/[0.02] backdrop-blur-sm rounded-[2rem] border border-white/[0.05]">
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.15em] mb-4">Topic</h4>
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r ${techConfig.gradient} text-[10px] font-black uppercase tracking-[0.15em] text-white`}>
                    {techConfig.name}
                  </span>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .markdown-content h1 { font-size: 2.25rem; font-weight: 900; margin-top: 2.5rem; margin-bottom: 1rem; color: white; letter-spacing: -0.02em; }
        .markdown-content h2 { font-size: 1.75rem; font-weight: 900; margin-top: 2.5rem; margin-bottom: 1rem; color: white; padding-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .markdown-content h3 { font-size: 1.35rem; font-weight: 700; margin-top: 2rem; margin-bottom: 0.75rem; color: rgba(255,255,255,0.9); }
        .markdown-content p { margin-bottom: 1.5rem; line-height: 1.9; color: #94a3b8; font-size: 1.05rem; }
        .markdown-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .markdown-content li { margin-bottom: 0.5rem; color: #94a3b8; line-height: 1.8; }
        .markdown-content pre { padding: 1.5rem; border-radius: 1rem; background: #0d1117 !important; border: 1px solid rgba(255,255,255,0.06); margin: 2rem 0; }
        .markdown-content pre code { color: #e6edf3; font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace; font-size: 13px; line-height: 1.8; background: transparent !important; }
        .markdown-content code { color: #79c0ff; background: rgba(255,255,255,0.06); padding: 0.15em 0.4em; border-radius: 6px; font-size: 0.88em; }
        .markdown-content a { color: hsl(var(--primary)); text-decoration: none; font-weight: 700; }
        .markdown-content a:hover { text-decoration: underline; }
        .markdown-content blockquote { border-left: 3px solid hsl(var(--primary)); padding: 1.25rem 1.5rem; margin: 1.5rem 0; background: rgba(255,255,255,0.02); border-radius: 0 1rem 1rem 0; }
        .markdown-content blockquote p { color: #94a3b8; }
        .markdown-content img { border-radius: 1rem; border: 1px solid rgba(255,255,255,0.05); margin: 2rem 0; }
        .markdown-content table { width: 100%; border-collapse: collapse; margin: 2rem 0; }
        .markdown-content th { background: rgba(255,255,255,0.04); padding: 0.75rem 1rem; text-align: left; font-weight: 700; color: white; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .markdown-content td { border: 1px solid rgba(255,255,255,0.05); padding: 0.75rem 1rem; color: #94a3b8; }

        /* Scrollbar */
        .markdown-content pre::-webkit-scrollbar { height: 6px; }
        .markdown-content pre::-webkit-scrollbar-track { background: transparent; }
        .markdown-content pre::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }
        .markdown-content pre::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
      `}} />
    </div>
  );
}
