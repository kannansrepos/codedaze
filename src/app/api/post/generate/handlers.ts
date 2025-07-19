import { NextRequest, NextResponse } from 'next/server';
import { AIModels } from '@/types/Language';
import { GeneratePostByDeepSeekAI, GeneratePostByGeminiAI } from './ai_models';

const handleGeneratePost = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { model, topic, language } = body;
    switch (model) {
      case AIModels.Gemini:
        return await GeneratePostByGeminiAI(topic, language);
      case AIModels.DeepSeek:
        return await GeneratePostByDeepSeekAI(topic, language);
      default:
        return await GeneratePostByGeminiAI(topic, language);
    }
  } catch (e) {
    console.error('Error generating post:', e);
    return NextResponse.json({
      status: 500,
      error: 'Internal Server Error',
    });
  }
};

export { handleGeneratePost };
