import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PostClient from './PostClient';
import { Metadata } from 'next';

import generate_Metadata from '@/lib/generateMetadata';

const POSTS_DIR = path.join(process.cwd(), 'posts');

export const metadata: Metadata = generate_Metadata({
  title: 'Blog Posts | Code Daze - Modern Web Development Tutorials',
  description: 'Explore our collection of technical articles, tutorials, and insights on .NET, React, Angular, and Cloud architecture.',
  url: 'https://codedaze.tech/posts',
  keywords: 'blog, tutorials, .NET, React, Angular, Next.js, Cloud, Web Development',
});

async function getAllPosts() {
  try {
    const files = await fs.promises.readdir(POSTS_DIR);
    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.md'))
        .map(async (file) => {
          const fullPath = path.join(POSTS_DIR, file);
          const fileContent = await fs.promises.readFile(fullPath, 'utf-8');
          const { data } = matter(fileContent);
          const slug = path.basename(file, '.md');

          return {
            slug,
            title: data.title || slug.replace(/_/g, ' '),
            subtitle: data.subtitle || '',
            date: data.date || new Date().toISOString().split('T')[0],
            readTime: data.readTime || '5 min read',
            language: data.language || 'general',
            meta_description: data.meta_description || data.subtitle || '',
          };
        })
    );

    return posts;
  } catch (e) {
    console.error('Failed to read posts directory', e);
    return [];
  }
}

export default async function PostsPage() {
  const allPosts = await getAllPosts();

  return <PostClient allPosts={allPosts} />;
}
