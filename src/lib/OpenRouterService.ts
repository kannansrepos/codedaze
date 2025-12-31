import axios from 'axios';

const GetOpenRouterResponse = async (prompt: string, model: string) => {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
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

    const apiResponse = await api.post('/chat/completions', {
      model: model,
      messages: [{ role: 'user', content: prompt }],
    });

    // Axios might still throw if network fails, but validateStatus handles 429
    if (apiResponse.status === 429) {
      return { status: 429, message: 'Rate limit hit. Please try again later.' };
    }

    return { status: apiResponse.status, data: apiResponse.data };
  } catch (error: any) {
    console.error('OpenRouter Error:', error.response?.data || error.message);
    return {
      status: error.response?.status || 500,
      message: error.response?.data?.error?.message || error.message
    };
  }
};

export { GetOpenRouterResponse };
