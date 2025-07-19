import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { AIPrompts } from '@/lib/Prompts';
import { GetAIResponse } from '@/lib/DeepSeekAIService';

const GeneratePostByGeminiAI = async (topic: string, language: string) => {
  try {
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
  } catch (error) {
    console.error('Error generating post:', error);
    return NextResponse.json({
      status: 500,
      error: 'Internal Server Error',
    });
  }
};
const GeneratePostByDeepSeekAI = async (topic: string, language: string) => {
  try {
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
  } catch (error) {
    console.error('Error generating post:', error);
    return NextResponse.json({
      status: 500,
      error: 'Internal Server Error',
    });
  }
};
export { GeneratePostByGeminiAI, GeneratePostByDeepSeekAI };
