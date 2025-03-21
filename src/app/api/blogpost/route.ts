import { NextResponse } from 'next/server';
import createNewPost, { getPosts } from '@/db/service';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const pageToken = searchParams.get('pageToken') || '';
  const posts = await getPosts(pageSize, pageToken);
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log('received body: ', body);
  await createNewPost(body);
  return NextResponse.json({ message: 'ok' });
}
