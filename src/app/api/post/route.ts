/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { AIPrompts } from '@/lib/Prompts';
import { GetAIResponse } from '@/lib/DeepSeekAIService';
import { AIModels } from '@/types/Language';
import { PushToGithub, UploadData } from '@/lib/GithubUtil';
import {
  GetAllPostIndex,
  GetTopThreePostIndexes,
  PushToDatabase,
} from '@/lib/DatabaseUtil';
import { createServer } from '../../../utils/supabase/server';
import matter from 'gray-matter';

const POST = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    switch (action) {
      case 'create':
        return await handleRequest(req);
      case 'generate_markdown':
        return await handleGenerateMarkdown(req);
      case 'upload_document':
        return await handleUploadDocument(req);
      case 'download_document':
        return await handleDownloadDocument(req);
      default:
        return NextResponse.json({ status: 400, error: 'Invalid action' });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: 500, error: e });
  }
};
const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    switch (action) {
      case 'get_top_posts':
        return await handleTopPostRequest(req);
      case 'get_all_posts':
        return await handleGetAllPosts(req);
      default:
        return NextResponse.json({ status: 400, error: 'Invalid action' });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: 500, error: e });
  }
};
const handleRequest = async (req: NextRequest) => {
  const body = await req.json();
  const { model, topic, language } = body;
  switch (model) {
    case AIModels.Gemini:
      return await handleDeepSeekAI(topic, language);
    case AIModels.DeepSeek:
      return await handleGoogleAI(topic, language);
    default:
      return await handleGoogleAI(topic, language);
  }
};
const handleGoogleAI = async (topic: string, language: string) => {
  const getAI = new GoogleGenerativeAI(process.env.API_KEY!);
  const model = getAI.getGenerativeModel({
    model: process.env.GEMINI_AI_MODEL || 'gemini-1.5-flash',
  });
  const prompt = AIPrompts.prompt
    .replace('[CUSTOM_PROMPT]', topic!)
    .replace('[LANGUAGE_ATTR]', language!);
  const result = await model.generateContent(prompt);
  const response = result.response;
  const postData = response?.text();
  return NextResponse.json({
    status: 200,
    text: 'Blog Posted Created',
    data: postData,
  });
};

const handleDeepSeekAI = async (topic: string, language: string) => {
  const apiResponse = await GetAIResponse(
    AIPrompts.prompt
      .replace('[CUSTOM_PROMPT]', topic!)
      .replace('[LANGUAGE_ATTR]', language!)
  );
  if (apiResponse.status !== 200) {
    return NextResponse.json({
      status: apiResponse.status,
      error: apiResponse.data,
    });
  }
  return NextResponse.json({
    status: apiResponse.status,
    text: 'Blog Posted Created',
    data: apiResponse.data,
  });
};

const handleGenerateMarkdown = async (req: NextRequest) => {
  try {
    const { markdownContent, fileName, GITHUB_TOKEN } = await req.json();
    const FILE_PATH = `posts/${fileName}.md`;
    const FILE_CONTENT = markdownContent;
    if (GITHUB_TOKEN == 1) {
      await PushToGithub(FILE_CONTENT, FILE_PATH);
    } else {
      await UploadData(GITHUB_TOKEN, FILE_CONTENT, FILE_PATH);
    }

    await PushToBlobStorage(`${fileName}.md`, FILE_CONTENT);

    await PushToDatabase(fileName);

    return NextResponse.json({
      status: 200,
      text: 'Blog Posted Created',
      data: { fileName, markdownContent },
    });
  } catch (error) {
    console.error('Error generating markdown:', error);
    return NextResponse.json(
      { error: 'Failed to generate markdown file' },
      { status: 500 }
    );
  }
};

const handleTopPostRequest = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const recordCount = Number(searchParams.get('recordCount')) || 3;
    const posts = await GetTopThreePostIndexes(recordCount);
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
const handleGetAllPosts = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const pageSize = Number(searchParams.get('pageSize')) || 9;
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
const handleUploadDocument = async (req: NextRequest) => {
  const { markdownContent, fileName } = await req.json();
  await PushToBlobStorage(fileName, markdownContent);
  return NextResponse.json(
    { error: 'Failed to generate markdown file' },
    { status: 500 }
  );
};
const handleDownloadDocument = async (req: NextRequest) => {
  const { fileName } = await req.json();
  const markdownContent = await GetPostData(fileName);
  if (!markdownContent) {
    return NextResponse.json(
      { error: 'Failed to download markdown file' },
      { status: 500 }
    );
  }
  return NextResponse.json({
    status: 200,
    data: { markdownContent },
  });
};
const PushToBlobStorage = async (fileName: string, markdownContent: any) => {
  try {
    const supabase = createServer();
    const { data, error } = await supabase.storage
      .from('codedaze')
      .upload(`posts/${fileName}`, markdownContent, {
        contentType: 'text/markdown',
      });
    if (error) {
      console.error('Error uploading file:', error);
    } else {
      console.log('File uploaded successfully:', data);
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
  // const supabase = createServer();

  // await supabase.storage.from('posts').upload(fileName, markdownContent, {
  //   contentType: 'text/markdown',
  // });
};

const GetPostData = async (fileName: string) => {
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
export { POST, GET };
