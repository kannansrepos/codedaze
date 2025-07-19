import { NextRequest, NextResponse } from 'next/server';
import { handleGeneratePost } from './handlers';

const POST = async (req: NextRequest) => {
  try {
    return await handleGeneratePost(req);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  }
};

export { POST };
