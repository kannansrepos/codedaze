import { NextRequest, NextResponse } from 'next/server';
import { GetOpenRouterResponse } from '@/lib/OpenRouterService';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  let language = 'general';
  try {
    const body = await req.json();
    language = body.language;

    if (!language) return NextResponse.json({ status: 400, message: 'Language is required' });

    // Get existing posts to exclude
    const postsDir = path.join(process.cwd(), 'posts');
    const draftsDir = path.join(postsDir, 'auto-drafts');

    let existingFiles: string[] = [];
    try {
      const mainFiles = await fs.readdir(postsDir);
      existingFiles = [...existingFiles, ...mainFiles.filter(f => f.endsWith('.md'))];

      const draftFiles = await fs.readdir(draftsDir);
      existingFiles = [...existingFiles, ...draftFiles.filter(f => f.endsWith('.md'))];
    } catch (e) {
      console.warn('Could not read posts/drafts for exclusion', e);
    }

    const existingTopics = existingFiles
      .map(f => f.replace(/\.md$/, '').replace(/-/g, ' ').replace(/_/g, ' '))
      .join(', ');

    const modelName = process.env.GEMINI_AI_MODEL || 'google/gemini-2.0-flash-exp:free';
    const prompt = `Act as a Tech Blog SEO Expert. Give me 5 highly trending and popular blog post titles/topics for "${language}" that developers are searching for right now.

    CRITICAL: Exclude the following existing topics which we have already covered:
    [${existingTopics}]

    Make sure the new suggestions are unique and different from the ones above.
    Focus on modern features, best practices, or comparison topics.
    Return STRICTLY a JSON array of strings. Do not use markdown code blocks. Example: ["Topic 1", "Topic 2"]`;

    const apiResponse = await GetOpenRouterResponse(prompt, modelName);

    if (apiResponse.status !== 200) {
        throw new Error('Failed to fetch from OpenRouter');
    }

    const text = apiResponse.data?.choices?.[0]?.message?.content;

    let topics;
    try {
        const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const start = clean.indexOf('[');
        const end = clean.lastIndexOf(']');
        if (start !== -1) topics = JSON.parse(clean.substring(start, end + 1));
        else topics = JSON.parse(clean);
    } catch {
        console.error("JSON Parse Error", text);
        throw new Error("Failed to parse AI response");
    }

    return NextResponse.json({ status: 200, data: topics });
  } catch (error) {
    console.error('Error fetching trending topics:', error);

    // Fallback topics when quota is hit or API fails
    const fallbackTopics: Record<string, string[]> = {
      'nextjs': ['Next.js 15 Partial Prerendering', 'Mastering Server Actions', 'Optimize Core Web Vitals in Next.js', 'Middleware Patterns in App Router', 'Comparison: Pages vs App Router'],
      'react': ['React Server Components Guide', 'Understanding useActionState', 'Optimizing Re-renders with useMemo', 'Modern State Management with Zustand', 'React 19 New Architecture'],
      'typescript': ['Advanced Pattern Matching', 'Mastering Utility Types', 'Type-Safe API Integration', 'Conditional Types Explained', 'Strict Mode Best Practices'],
      'default': [`Top 5 Features of ${language} in 2025`, `Modern Development with ${language}`, `${language} Best Practices for Scale`, `Performance Optimization in ${language}`, `Real-world ${language} Architecture`]
    };

    const key = language.toLowerCase().replace(/[^a-z]/g, '');
    const data = fallbackTopics[key] || fallbackTopics['default'];

    return NextResponse.json({
      status: 200, // Return 200 even on error but with fallback data
      data: data,
      message: 'Using fallback topics due to API limits'
    });
  }
}
