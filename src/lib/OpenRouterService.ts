import axios from 'axios';
import { ModelRotation } from './ModelRotation';

interface OpenRouterOptions {
  apiKey?: string;
  model?: string;
  useRotation?: boolean;
}

const GetOpenRouterResponse = async (
  prompt: string,
  options?: OpenRouterOptions
) => {
  try {
    let apiKey: string;
    let model: string;
    // Use rotation by default, or if explicitly requested
    if (options?.useRotation !== false && (!options?.apiKey || !options?.model)) {
      const nextModel = await ModelRotation.getNextModel();
      apiKey = nextModel.apiKey;
      model = nextModel.model;
      console.log(`[OpenRouter] Using rotated model: ${nextModel.name} (${model})`);
    } else {
      // Use provided credentials or fallback to env
      apiKey = options?.apiKey || process.env.OPENROUTER_API_KEY || '';
      model = options?.model || process.env.OPENROUTER_API_MODEL || 'openai/gpt-4o-mini';
    }

    if (!apiKey) {
      throw new Error('No API key available. Please configure OPENROUTER_API_KEY or model rotation keys.');
    }

    const apiUrl = "https://openrouter.ai/api/v1";
    const apiHeaders = {
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': process.env.APP_HOST || 'http://localhost:3000',
      'X-Title': 'CodeDaze',
      'Content-Type': 'application/json',
    };

    const api = axios.create({
      baseURL: apiUrl,
      headers: apiHeaders,
      validateStatus: (status) => status < 500, // Handle 4xx errors manually
    });
    console.log(apiKey)
console.log(model)
    const apiResponse = await api.post('/chat/completions', {
      model: model,
      messages: [{ role: 'user', content: prompt }],
    });

    // Axios might still throw if network fails, but validateStatus handles 429
    if (apiResponse.status === 429) {
      return { status: 429, message: 'Rate limit hit. Please try again later.' };
    }

    return { status: apiResponse.status, data: apiResponse.data };
  } catch (error: unknown) {
    const err = error as { response?: { status?: number; data?: { error?: { message?: string } } }; message?: string };
    console.error('OpenRouter Error:', err.response?.data || err.message);
    return {
      status: err.response?.status || 500,
      message: err.response?.data?.error?.message || err.message
    };
  }
};

export { GetOpenRouterResponse };

