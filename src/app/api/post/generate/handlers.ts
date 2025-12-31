import { NextRequest, NextResponse } from 'next/server';
import { AIModels } from '@/types/Language';
import { GeneratePostByDeepSeekAI, GeneratePostByGeminiAI } from './ai_models';

const handleGeneratePost = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { model, topic, language } = body;

    if (!topic || !language) {
      return NextResponse.json({
        status: 400,
        message: 'Topic and Language are required'
      });
    }

    console.log('Generate post request:', { model, topic, language });

    // Handle both string and enum values
    const modelStr = typeof model === 'string' ? model : AIModels[model];

    switch (modelStr) {
      case 'Gemini':
      case AIModels[AIModels.Gemini]:
        return await GeneratePostByGeminiAI(topic, language);
      case 'DeepSeek':
      case AIModels[AIModels.DeepSeek]:
        return await GeneratePostByDeepSeekAI(topic, language);
      default:
        console.log('Using default Gemini model for:', modelStr);
        return await GeneratePostByGeminiAI(topic, language);
    }
  } catch (e) {
    console.error('Error generating post:', e);
    return NextResponse.json({
      status: 500,
      message: e instanceof Error ? e.message : 'Internal Server Error',
    });
  }
};

export { handleGeneratePost };
