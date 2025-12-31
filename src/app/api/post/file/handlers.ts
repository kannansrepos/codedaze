import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const POSTS_PATH = path.join(process.cwd(), 'posts');

export const handleUploadDocument = async (req: NextRequest) => {
  try {
    const { fileName, markdownContent } = await req.json();
    if (!fileName || !markdownContent) {
      return NextResponse.json({ status: 400, error: 'FileName and markdownContent are required' });
    }

    const fullFileName = fileName.endsWith('.md') ? fileName : `${fileName}.md`;
    const filePath = path.join(POSTS_PATH, fullFileName);

    await fs.mkdir(POSTS_PATH, { recursive: true });
    await fs.writeFile(filePath, markdownContent, 'utf-8');

    return NextResponse.json({
      status: 200,
      data: { message: 'File uploaded successfully', fileName: fullFileName },
    });

  } catch (error) {
    console.error('Error uploading document:', error);
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  }
};

export const handleDownloadDocument = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');
    if (!postId) {
      return NextResponse.json({ error: 'Post Id is required' }, { status: 400 });
    }

    const filePath = path.join(POSTS_PATH, postId);
    const content = await fs.readFile(filePath, 'utf-8');
    const { data: frontmatter, content: markdown } = matter(content);

    return NextResponse.json({
      status: 200,
      data: { frontmatter, content: markdown, postId },
    });
  } catch (error) {
    console.error('Error downloading document:', error);
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  }
};

export const handleDownloadDocuments = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { postIds } = body;
    if (!postIds || postIds.length === 0) {
      return NextResponse.json({ status: 400, error: 'No postIds provided' });
    }

    const downloadResults = await Promise.all(
      postIds.map(async (postId: string) => {
        try {
          const filePath = path.join(POSTS_PATH, postId);
          const content = await fs.readFile(filePath, 'utf-8');
          const { data: frontmatter, content: markdown } = matter(content);
          return { frontmatter, content: markdown, postId };
        } catch (e) {
          console.warn(`Could not read file for postId: ${postId}`, e);
          return null;
        }
      })
    );

    return NextResponse.json({
      status: 200,
      data: { downloadResults: downloadResults.filter((r) => r !== null) },
    });
  } catch (error) {
    console.error('Error downloading documents:', error);
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  }
};
