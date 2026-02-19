import { NextResponse } from 'next/server';
import { AIPrompts } from '@/lib/Prompts';
import { GetAIResponse } from '@/lib/DeepSeekAIService';
import { GetOpenRouterResponse } from '@/lib/OpenRouterService';

const GeneratePostByGeminiAI = async (topic: string, language: string) => {
  try {
    const prompt = AIPrompts.prompt
      .replace('[CUSTOM_PROMPT]', topic!)
      .replace('[LANGUAGE_ATTR]', language!);

    const apiResponse = await GetOpenRouterResponse(prompt);

    if (apiResponse.status !== 200) {
      return NextResponse.json({
        status: apiResponse.status,
        message: apiResponse.message || 'Failed to generate post from OpenRouter API',
      });
    }

    const content = apiResponse.data?.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({
        status: 500,
        error: 'No content received from OpenRouter API',
      });
    }

    return NextResponse.json({
      status: 200,
      text: 'Blog Post Created',
      data: content,
    });
  } catch (error) {
    console.error('Error generating post with OpenRouter/Gemini:', error);
    return NextResponse.json({
      status: 500,
      error: error instanceof Error ? error.message : 'Internal Server Error',
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

    console.log('DeepSeek API Response:', JSON.stringify(apiResponse.data, null, 2));

    if (apiResponse.status !== 200) {
      return NextResponse.json({
        status: apiResponse.status,
        message: 'Failed to generate post from DeepSeek API',
      });
    }

    // Extract content from DeepSeek response structure
    const content = apiResponse.data?.choices?.[0]?.message?.content;

    if (!content) {
      console.error('No content in DeepSeek response:', apiResponse.data);
      return NextResponse.json({
        status: 500,
        message: 'No content received from DeepSeek API',
      });
    }

    return NextResponse.json({
      status: 200,
      text: 'Blog Post Created',
      data: content,
    });
  } catch (error) {
    console.error('Error generating post with DeepSeek:', error);
    return NextResponse.json({
      status: 500,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export { GeneratePostByGeminiAI, GeneratePostByDeepSeekAI };
