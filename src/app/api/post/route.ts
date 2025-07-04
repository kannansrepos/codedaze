/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { AIPrompts } from '@/lib/Prompts';
import { GetAIResponse } from '@/lib/DeepSeekAIService';
import { AIModels } from '@/types/Language';
import { PushToGithub, UploadData } from '@/lib/GithubUtil';
import { PushToDatabase } from '../../../lib/DatabaseUtil';

const POST = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    switch (action) {
      case 'create':
        return await handleRequest(req);
      case 'generate_markdown':
        return await handleGenerateMarkdown(req);
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
export { POST };
