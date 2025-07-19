import { NextRequest, NextResponse } from 'next/server';
import { handleUploadFileToGithub } from './handlers';

const POST = async (req: NextRequest) => {
  try {
    return await handleUploadFileToGithub(req);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  }
};

export { POST };
