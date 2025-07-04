import fs from 'fs';
import matter from 'gray-matter';

import { NextRequest, NextResponse } from 'next/server';
const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get('fileName') || '';
  if (fileName === '') {
    return NextResponse.json({
      status: 400,
      error: 'No markdown file name provided',
    });
  }
  const markdownData = getMarkdownData(fileName);
  return NextResponse.json({
    status: 200,
    data: { markdownData },
  });
};
const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { markdownFileNames } = body;
    if (!markdownFileNames || markdownFileNames.length === 0) {
      return NextResponse.json({
        status: 400,
        error: 'No markdown file names provided',
      });
    }
    const markdownDataList = markdownFileNames.map(
      (markdownFileName: string) => {
        return getMarkdownData(markdownFileName);
      }
    );
    return NextResponse.json({
      status: 200,
      data: { markdownDataList },
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: 500, error: e });
  }
};
const getMarkdownData = (markdownFileName: string) => {
  if (!markdownFileName) {
    console.error('Missing slug');
  }
  try {
    const folder = 'posts/';
    const file = `${folder}${markdownFileName}.md`;
    const content = fs.readFileSync(file, 'utf8');
    const { data, content: markdownContent } = matter(content);
    // 'markdownContent' contains the markdown without frontmatter
    return {
      frontmatter: data,
      content: markdownContent,
      postId: markdownFileName,
    };
  } catch (err) {
    console.error(`Error reading post "${markdownFileName}":`, err);
    throw new Error(`Failed to read markdown file: ${markdownFileName}`);
  }
};
export { POST, GET };
