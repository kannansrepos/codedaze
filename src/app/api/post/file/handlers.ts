/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { createServer } from '../../../../utils/supabase/server';
import matter from 'gray-matter';

export const handleUploadDocument = async (req: NextRequest) => {
  try {
    const { markdownContent, fileName } = await req.json();

    const uploadResult = await UploadFileToSupabase(fileName, markdownContent);

    if (uploadResult) {
      return NextResponse.json({
        status: 200,
        data: { message: 'File uploaded successfully' },
      });
    }

    return NextResponse.json(
      { error: 'Failed to upload post file' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error uploading document:', error);
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  }
};

export const handleDownloadDocument = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');
    if (!postId) {
      return NextResponse.json(
        { error: 'Post Id is required' },
        { status: 400 }
      );
    }
    const downloadResult = await DownloadFile(postId);
    if (downloadResult) {
      return NextResponse.json({
        status: 200,
        data: { downloadResult },
      });
    }

    return NextResponse.json(
      { error: 'Failed to upload post file' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error uploading document:', error);
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  }
};

export const handleDownloadDocuments = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { postIds } = body;
    if (!postIds || postIds.length === 0) {
      return NextResponse.json({
        status: 400,
        error: 'No postIds provided',
      });
    }
    const downloadResults = await Promise.all(
      postIds.map(async (postId: string) => {
        const downloadResult = await DownloadFile(postId);
        return downloadResult;
      })
    );
    if (downloadResults) {
      return NextResponse.json({
        status: 200,
        data: { downloadResults },
      });
    }

    return NextResponse.json(
      { error: 'Failed to upload post file' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error uploading document:', error);
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  }
};
const UploadFileToSupabase = async (fileName: string, markdownContent: any) => {
  try {
    const supabase = createServer();
    const { data, error } = await supabase.storage
      .from('codedaze')
      .upload(`posts/${fileName}`, markdownContent, {
        contentType: 'text/markdown',
      });
    if (error) {
      console.error('Error uploading file:', error);
      return null;
    }
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const DownloadFile = async (fileName: string) => {
  const supabase = createServer();
  const { data, error } = await supabase.storage
    .from('codedaze')
    .download(`posts/${fileName}`);
  if (error) {
    console.error('Error downloading file:', error);
    return null;
  } else {
    const fileContent = await data.text();
    const { data: fileInfo, content: markdownContent } = matter(fileContent);
    return {
      frontmatter: fileInfo,
      content: markdownContent,
      postId: fileName.replace('.md', ''),
    };
  }
};
