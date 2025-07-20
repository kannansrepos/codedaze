import { NextRequest, NextResponse } from 'next/server';
import {
  GetTopPostIndex,
  GetAllPostIndex,
  CreatePostIndex,
} from '@/db/service';

const handleGetTopPostRequest = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const recordCount = Number(searchParams.get('recordCount')) || 3;
    const posts = await GetTopPostIndex(recordCount);
    return NextResponse.json({
      status: 200,
      text: `Fetched top ${recordCount} posts`,
      data: posts,
    });
  } catch (error) {
    console.error('Error generating markdown:', error);
    return NextResponse.json(
      { error: 'Failed to generate markdown file' },
      { status: 500 }
    );
  }
};
const handleAllTopPostRequest = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const pageSize = Number(searchParams.get('pageSize')) || 3;
    const pageToken = Number(searchParams.get('pageToken')) || 1;
    const posts = await GetAllPostIndex(pageSize, pageToken);
    return NextResponse.json({
      status: 200,
      text: `Fetched posts for page ${pageToken}`,
      data: posts.data,
      nextPageToken: posts.nextPageToken,
    });
  } catch (error) {
    console.error('Error generating markdown:', error);
    return NextResponse.json(
      { error: 'Failed to generate markdown file' },
      { status: 500 }
    );
  }
};
const handleCreatePostIndex = async (req: NextRequest) => {
  try {
    const { postId } = await req.json();
    await CreatePostIndex({ postId });
    return NextResponse.json({
      status: 200,
      text: `Created post index for ${postId}`,
    });
  } catch (error) {
    console.error('Error generating markdown:', error);
    return NextResponse.json(
      { error: 'Failed to generate markdown file' },
      { status: 500 }
    );
  }
};
export {
  handleGetTopPostRequest,
  handleAllTopPostRequest,
  handleCreatePostIndex,
};
