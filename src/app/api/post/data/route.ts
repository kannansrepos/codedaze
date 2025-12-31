import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';


const POSTS_PATH = path.join(process.cwd(), 'posts');

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const recordCount = parseInt(searchParams.get('recordCount') || '3');
    const pageToken = parseInt(searchParams.get('pageToken') || '1');

    // Get all markdown files from the posts directory (excluding subdirectories)
    const files = await fs.readdir(POSTS_PATH, { withFileTypes: true });
    const mdFiles = files
      .filter(file => file.isFile() && file.name.endsWith('.md'))
      .map(file => file.name);

    // Sort by name (which often starts with date in this blog structure) or mtime
    // For now, let's just use the filenames and sort descending
    mdFiles.sort().reverse();

    if (action === 'get_top_posts') {
      const topFiles = mdFiles.slice(0, recordCount);
      const results = topFiles.map(filename => ({
        postId: filename, // In this app, postId is the filename
        id: filename,
        createdAt: new Date().toISOString(), // Mocking date since we're not using DB
      }));
      return NextResponse.json({ status: 200, data: results });
    }

    if (action === 'get_all_posts') {
      const start = (pageToken - 1) * recordCount;
      const end = start + recordCount;
      const paginatedFiles = mdFiles.slice(start, end);

      const results = paginatedFiles.map(filename => ({
        postId: filename,
        id: filename,
      }));

      return NextResponse.json({
        status: 200,
        data: results,
        nextPageToken: end < mdFiles.length ? (pageToken + 1).toString() : undefined
      });
    }

    return NextResponse.json({ status: 400, message: 'Invalid action' });
  } catch (error: unknown) {
    console.error('API Post Data Error:', error);
    return NextResponse.json({
      status: 500,
      error: error instanceof Error ? error.message : 'Internal Server Error'
    });
  }
}
