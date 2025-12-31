import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const POSTS_PATH = path.join(process.cwd(), 'posts');

export type PostData = {
  postId: string;
  content: string;
  frontmatter: {
    title: string;
    subtitle?: string;
    date: string;
    readTime?: string;
    language?: string;
    meta_description?: string;
    keywords?: string;
    [key: string]: unknown;
  };
};

export async function getPostById(postId: string): Promise<PostData | null> {
  try {
    const fullFileName = postId.endsWith('.md') ? postId : `${postId}.md`;
    const filePath = path.join(POSTS_PATH, fullFileName);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);

    return {
      postId: fullFileName,
      content,
      frontmatter: frontmatter as PostData['frontmatter'],
    };
  } catch (error) {
    console.error(`Error reading post ${postId}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<PostData[]> {
  try {
    const files = await fs.readdir(POSTS_PATH);
    const mdFiles = files.filter(file => file.endsWith('.md'));

    const posts = await Promise.all(
      mdFiles.map(async (file) => {
        return getPostById(file);
      })
    );

    return posts.filter((post): post is PostData => post !== null);
  } catch (error) {
    console.error('Error reading all posts:', error);
    return [];
  }
}
