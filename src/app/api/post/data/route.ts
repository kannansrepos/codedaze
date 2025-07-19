import { NextRequest, NextResponse } from 'next/server';
import {
  handleAllTopPostRequest,
  handleCreatePostIndex,
  handleGetTopPostRequest,
} from './handlers';

const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    switch (action) {
      case 'get_top_posts':
        return await handleGetTopPostRequest(req);
      case 'get_all_posts':
        return await handleAllTopPostRequest(req);
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  }
};
const POST = async (req: NextRequest) => {
  try {
    return await handleCreatePostIndex(req);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  }
};

export { GET, POST };
