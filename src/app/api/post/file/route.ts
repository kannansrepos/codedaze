import { NextRequest, NextResponse } from 'next/server';
import { handleDownloadDocument, handleUploadDocument } from './handlers';

const POST = async (req: NextRequest) => {
  try {
    return await handleUploadDocument(req);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  }
};

const GET = async (req: NextRequest) => {
  try {
    return await handleDownloadDocument(req);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  }
};
export { POST, GET };
