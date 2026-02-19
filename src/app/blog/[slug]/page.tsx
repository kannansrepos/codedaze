import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PostContent from './PostContent';
import generate_Metadata from '@/lib/generateMetadata';

const POSTS_DIR = path.join(process.cwd(), 'posts');

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata>
{
  const postPath = path.join(POSTS_DIR, `${params.slug}.md`);
  if (!fs.existsSync(postPath))
  {
    return { title: 'Post Not Found' };
  }
  const fileContent = await fs.promises.readFile(postPath, 'utf-8');
  const { data } = matter(fileContent);
  const title = (data.title as string) ?? params.slug.replace(/_/g, ' ');
  const description = data.subtitle || data.meta_description || '';
  const keywords = data.SEO_Keywords_List || data.keywords || '';

  return generate_Metadata({
    title: `${title} | Code Daze`,
    description,
    url: `https://codedaze.tech/blog/${params.slug}`,
    image: `https://codedaze.tech/img/${data.language || 'default'}.png`,
    keywords,
    type: 'article',
  });
}

export default async function PostPage({ params }: { params: { slug: string } })
{
  const postPath = path.join(POSTS_DIR, `${params.slug}.md`);
  if (!fs.existsSync(postPath))
  {
    notFound();
  }

  const fileContent = await fs.promises.readFile(postPath, 'utf-8');
  const { data, content } = matter(fileContent);
  const html = marked(content);

  const postData = {
    title: data.title || params.slug.replace(/_/g, ' '),
    subtitle: data.subtitle || '',
    date: data.date || new Date().toISOString().split('T')[0],
    readTime: data.readTime || '5 min read',
    language: data.language || 'general',
    meta_description: data.meta_description || data.subtitle || '',
    content: html as string,
  };

  return <PostContent post={postData} />;
}
