import { NextResponse, NextRequest } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Prompt } from '@/lib/data';
import { formatDateWithIntl } from '@/lib/utils';
import createNewPost from '@/db/service';

const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang');
    const getAI = new GoogleGenerativeAI(process.env.API_KEY!);
    const model = getAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    let aditinalPrompt = '';
    if (['nextjs', 'react'].includes(lang!)) {
      aditinalPrompt = ' Use Typescript base applications';
    }
    const result = await model.generateContent(
      Prompt.titlePrompt.replace('{LANGUAGE}', lang!)
    );
    console.log('Title Requesting');
    const response = result.response;
    const titleText = response.text();
    const title = ParseMardownText(titleText);
    const titleObj = JSON.parse(title);
    const blogPrompt = Prompt.prompt.replace('{TITLE}', titleObj.title);
    const blogResult = await model.generateContent(blogPrompt + aditinalPrompt);
    const blogResponse = blogResult.response;
    const blogText = blogResponse.text();
    const blogData = ParseMardownText(blogText);
    const blogPost = JSON.parse(blogData);
    blogPost.date = formatDateWithIntl(new Date());
    if (!blogPost.url) {
      blogPost.url = createUrlSlug(blogPost.title);
    }
    const responseData = await createNewPost(blogPost);
    return NextResponse.json({
      text: 'Blog Posted',
      response: responseData,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: e, apikey: process.env.API_KEY },
      { status: 500 }
    );
  }
};
function createUrlSlug(title: string): string {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace('.', 'dot')
    .replace(/[^\w\s-]/g, '') // Remove special characters, keep alphanumeric, spaces, and dashes
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple dashes with a single dash
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
}
const ParseMardownText = (data: string) => {
  // Remove markdown code block indicators (```json and ```)
  const result = data
    .replace(/^```json\n/, '') // Remove opening ```json tag
    .replace(/```$/m, '') // Remove closing ``` tag
    .replace(/```\n/g, '') // Remove any other code block markers
    .replace(/&#64;/g, '@') // Replace HTML entity for @ symbol
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width spaces and other invisible characters
    .trim(); // Remove extra whitespace

  return result;
};
export { GET };
