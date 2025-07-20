import { NextRequest, NextResponse } from 'next/server';
import { handleDownloadDocument, handleDownloadDocuments, handleUploadDocument } from './handlers';

const POST = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    switch (action) {
      case 'get_posts_content':
        return await handleDownloadDocuments(req);
      default:
            return await handleUploadDocument(req);
    }
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
