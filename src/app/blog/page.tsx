import fs from 'fs';
import path from 'path';
import Link from 'next/link';
// import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

// Directory where markdown posts are stored (relative to project root)
const POSTS_DIR = path.join(process.cwd(), 'posts');

// Helper to read all posts, sort by creation time (newest first)
async function getAllPosts()
{
  try
  {
    const files = await fs.promises.readdir(POSTS_DIR);
    const posts = await Promise.all(
      files.map(async (file) =>
      {
        const fullPath = path.join(POSTS_DIR, file);
        const stats = await fs.promises.stat(fullPath);
        const ext = path.extname(file);
        const slug = path.basename(file, ext);
        return {
          slug,
          filename: file,
          createdAt: stats.birthtimeMs,
        };
      })
    );
    // Sort descending by createdAt
    posts.sort((a, b) => b.createdAt - a.createdAt);
    return posts;
  } catch (e)
  {
    console.error('Failed to read posts directory', e);
    return [];
  }
}

export const metadata: Metadata = {
  title: 'Blog – CodeDaze',
  description: 'All blog posts sorted by newest first',
};

export default async function BlogPage({ searchParams }: { searchParams?: { [key: string]: string | string[] } })
{
  const pageSize = 10; // Number of posts per page
  const pageParam = Array.isArray(searchParams?.page)
    ? searchParams?.page[0]
    : searchParams?.page;
  const currentPage = Number(pageParam) || 1;

  const allPosts = await getAllPosts();
  if (allPosts.length === 0)
  {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400 text-lg font-medium">No blog posts found.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(allPosts.length / pageSize);
  const startIdx = (currentPage - 1) * pageSize;
  const paginated = allPosts.slice(startIdx, startIdx + pageSize);

  return (
    <section className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Blog Posts</h1>
          <p className="text-slate-400 font-medium">All articles sorted by newest first</p>
        </div>

        {/* Post List */}
        <ul className="space-y-1">
          {paginated.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-center justify-between gap-4 py-5 px-6 -mx-6 rounded-2xl hover:bg-white/[0.03] transition-all"
              >
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-white group-hover:text-primary transition-colors tracking-tight">
                    {post.slug.replace(/_/g, ' ')}
                  </h2>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(post.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        <nav className="flex justify-between items-center mt-16 gap-4">
          {currentPage > 1 ? (
            <Link
              href={`/blog?page=${currentPage - 1}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-white font-bold text-sm hover:bg-white/[0.06] transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Link>
          ) : (
            <span />
          )}
          <span className="text-xs font-black text-slate-500 uppercase tracking-[0.15em]">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages ? (
            <Link
              href={`/blog?page=${currentPage + 1}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-white font-bold text-sm hover:bg-white/[0.06] transition-all"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </section>
  );
}
