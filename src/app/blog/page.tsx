import fs from 'fs';
import path from 'path';
import Link from 'next/link';
// import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Directory where markdown posts are stored (relative to project root)
const POSTS_DIR = path.join(process.cwd(), 'posts');

// Helper to read all posts, sort by creation time (newest first)
async function getAllPosts() {
  try {
    const files = await fs.promises.readdir(POSTS_DIR);
    const posts = await Promise.all(
      files.map(async (file) => {
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
  } catch (e) {
    console.error('Failed to read posts directory', e);
    return [];
  }
}

export const metadata: Metadata = {
  title: 'Blog – CodeDaze',
  description: 'All blog posts sorted by newest first',
};

export default async function BlogPage({ searchParams }: { searchParams?: { [key: string]: string | string[] } }) {
  const pageSize = 10; // Number of posts per page
  const pageParam = Array.isArray(searchParams?.page)
    ? searchParams?.page[0]
    : searchParams?.page;
  const currentPage = Number(pageParam) || 1;

  const allPosts = await getAllPosts();
  if (allPosts.length === 0) {
    return <p className="p-4">No blog posts found.</p>;
  }

  const totalPages = Math.ceil(allPosts.length / pageSize);
  const startIdx = (currentPage - 1) * pageSize;
  const paginated = allPosts.slice(startIdx, startIdx + pageSize);

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <ul className="space-y-4">
        {paginated.map((post) => (
          <li key={post.slug} className="border-b pb-2">
            <Link href={`/blog/${post.slug}`} className="text-xl text-blue-600 hover:underline">
              {post.slug.replace(/_/g, ' ')}
            </Link>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <nav className="flex justify-between items-center mt-8">
        {currentPage > 1 ? (
          <Link
            href={`/blog?page=${currentPage - 1}`}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← Previous
          </Link>
        ) : (
          <span />
        )}
        <span>
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages ? (
          <Link
            href={`/blog?page=${currentPage + 1}`}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </section>
  );
}
