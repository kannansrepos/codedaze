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

type Props = {
  params: { postId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostById(params.postId);
  if (!post) return {};

  return generate_Metadata({
    title: post.frontmatter.title,
    description: post.frontmatter.subtitle || post.frontmatter.meta_description || '',
    url: `https://codedaze.net/blog/${params.postId}`,
    image: `https://codedaze.net/img/${post.frontmatter.language || 'default'}.png`,
    keywords: (post.frontmatter.SEO_Keywords_List || post.frontmatter.keywords) as string | undefined,
    type: 'article',
  });
}

export default async function PostDetail({ params }: Props) {
  const post = await getPostById(params.postId);

  if (!post) {
    notFound();
  }

  const htmlContent = marked(post.content);

  return (
    <div className="min-h-screen bg-[#020617] text-gray-100">
      {/* Hero Section for Post */}
      <div className="relative h-[40vh] md:h-[60vh] w-full overflow-hidden">
        <ImageWithFallback
          src={`/img/${post.frontmatter.language}.png`}
          alt={post.frontmatter.title}
          fill
          priority
          fallbackSrc="/img/default.png"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <Link
            href="/posts"
            className="mb-8 flex items-center gap-2 text-primary hover:text-white transition-colors font-bold group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </Link>
          <h1 className="text-4xl md:text-6xl font-black max-w-4xl leading-tight">
            <span className="bg-gradient-to-r from-white via-primary to-purple-400 inline-block text-transparent bg-clip-text">
              {post.frontmatter.title.toUpperCase()}
            </span>
          </h1>

          <div className="mt-8 flex items-center gap-6 text-gray-400 font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>{new Date(post.frontmatter.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>{post.frontmatter.readTime || '5 min read'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <main className="w-full lg:w-3/4">
            <article className="prose prose-invert prose-blue max-w-none bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <div
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                className="markdown-content"
              />
            </article>
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 space-y-8">
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-primary/20 to-purple-600/20 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <MailIcon className="text-primary" />
                    Newsletter
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Join our community of developers and get the latest insights on .NET, React, and Cloud architecture.
                  </p>
                </div>

                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl h-12"
                  />
                  <Button className="w-full rounded-xl h-12 bg-primary hover:bg-primary/80 text-white font-bold transition-all shadow-lg shadow-primary/20">
                    Subscribe Now
                  </Button>
                </div>
              </div>

              {/* Related Tech */}
              {post.frontmatter.language && (
                <div className="mt-8 p-8 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10">
                  <h4 className="text-lg font-bold text-white mb-4">Topic</h4>
                  <span className="inline-flex items-center px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider">
                    {post.frontmatter.language}
                  </span>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .markdown-content h1 { font-size: 2.5rem; font-weight: 800; margin-top: 2rem; margin-bottom: 1rem; color: white; }
        .markdown-content h2 { font-size: 2rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; color: #8142EF; }
        .markdown-content h3 { font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; color: white; }
        .markdown-content p { margin-bottom: 1.25rem; line-height: 1.8; color: #ccc; }
        .markdown-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; }
        .markdown-content li { margin-bottom: 0.5rem; }
        .markdown-content pre { padding: 1.5rem; border-radius: 1rem; background: rgba(0,0,0,0.3) !important; border: 1px solid rgba(255,255,255,0.1); }
        .markdown-content code { color: #f472b6; }
        .markdown-content a { color: #8142EF; text-decoration: underline; }
      `}} />
    </div>
  );
}
