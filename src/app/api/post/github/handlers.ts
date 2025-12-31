import { NextRequest, NextResponse } from 'next/server';
import { UploadData } from '@/lib/GithubUtil';

export const handleUploadFileToGithub = async (req: NextRequest) => {
  try {
    const { fileName, GITHUB_TOKEN, markdownContent } = await req.json();
    const FILE_PATH = `posts/${fileName}.md`;
    await UploadData(GITHUB_TOKEN, markdownContent, FILE_PATH);
    return NextResponse.json({
      status: 200,
      text: 'File uploaded successfully',
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  }
};
