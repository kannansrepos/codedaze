import { NextRequest, NextResponse } from 'next/server';
import { handleGeneratePost } from './handlers';

const POST = async (req: NextRequest) => {
  try {
    const response = await handleGeneratePost(req);
    return response;
  } catch (e) {
    console.error('API POST Error:', e);
    return NextResponse.json({
      status: 500,
      error: e instanceof Error ? e.message : 'Internal Server Error'
    });
  }
};

export { POST };
