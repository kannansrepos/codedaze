import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';
import { setDoc, doc } from 'firebase/firestore';
import { Prompt } from '@/lib/data';
import db from '@/lib/firestore-config';
import { formatDateWithIntl } from '../../../lib/utils';

const collection_name = 'codedaze_posts';

const GET = async (req: Request) => {
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
    const response = result.response;
    const titleText = response.text();
    const title = ParseMardownText(titleText);
    const titleObj = JSON.parse(title);
    console.log(titleObj.title);
    const blogPrompt = Prompt.prompt.replace('{TITLE}', titleObj.title);
    const blogResult = await model.generateContent(blogPrompt + aditinalPrompt);
    const blogResponse = blogResult.response;
    const blogText = blogResponse.text();
    const blogData = ParseMardownText(blogText);
    console.log(blogData);
    const id = uuidv4();
    const blogPost = JSON.parse(blogData);

    // const sanitizedBlogPost = sanitizeFirestoreData(blogData);
    // console.log(sanitizedBlogPost);
    blogPost.date = formatDateWithIntl(new Date());

    const responseFromFirebase = await setDoc(
      doc(db!, collection_name, id),
      blogPost, // Use the sanitized data here
      {
        merge: true,
      }
    );
    return NextResponse.json({
      id,
      text: 'Blog Posted',
      response: responseFromFirebase,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: e, apikey: process.env.API_KEY },
      { status: 500 }
    );
  }
};
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
