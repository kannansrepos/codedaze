import { NextRequest, NextResponse } from 'next/server';
import createNewPost, { getPosts } from '@/db/service';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const pageToken = searchParams.get('pageToken') || '';
  const posts = await getPosts(pageSize, pageToken);
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await createNewPost(body);
  return NextResponse.json({ message: 'ok' });
}
