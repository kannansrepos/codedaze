import axios from 'axios';
import { Metadata } from 'next';
import { GetPageTitle } from './utils';

const GetAIResponse = async (prompt: string, metadata?: Metadata) => {
  const apiKey = process.env.DEEP_SEEK_API_KEY;
  const apiUrl = process.env.DEEP_SEEK_API_URL;
  const apiModel =
    process.env.DEEP_SEEK_API_MODEL || 'deepseek/deepseek-r1-0528:free';

  const apiHeaders = {
    Authorization: `Bearer ${apiKey}`,
    'HTTP-Referer': process.env.APP_HOST,
    'X-Title': GetPageTitle(metadata),
    'Content-Type': 'application/json',
  };
  const api = axios.create({
    baseURL: apiUrl,
    headers: apiHeaders,
  });
  console.log('Api is ready to call with headers: ', apiHeaders);
  const apiResponse = await api.post('/chat/completions', {
    model: apiModel,
    messages: [{ role: 'user', content: prompt }],
  });
  console.log('Api Response: ', apiResponse.data);
  return apiResponse;
};

export { GetAIResponse };
