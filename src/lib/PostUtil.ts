'use server-only';
import fs from 'fs';
import matter from 'gray-matter';

import { PostMetadata } from '@/types/PostMetadata';

const GetPostMetadata = (): PostMetadata[] => {
  const folder = 'posts/';
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith('.md'));

  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`posts/${fileName}`, 'utf8');
    const matterResult = matter(fileContents);
    return {
      title: matterResult.data.title,
      subtitle: matterResult.data.subtitle,
      date: matterResult.data.date,
      readTime: matterResult.data.readTime,
      language: matterResult.data.language,
      meta_description: matterResult.data.meta_description,
      full_blog: matterResult.data.full_blog,
      SEO_Keywords_List: matterResult.data.SEO_Keywords_List,
    };
  });
  return posts;
};

export { GetPostMetadata };
