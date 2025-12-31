import { NextResponse } from 'next/server';
import { AIPrompts } from '@/lib/Prompts';
import fs from 'fs/promises';
import path from 'path';
import { Language } from '@/types/Language';
import { GetOpenRouterResponse } from '@/lib/OpenRouterService';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET() {
  const historyPath = path.join(process.cwd(), 'data', 'cron-history.json');
  const startTime = new Date().toISOString();
  const logData = {
    timestamp: startTime,
    tech: '',
    topics: [] as string[],
    files: [] as string[],
    status: 'success',
    error: null as string | null
  };

  try {
    // Ensure data directory exists
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });

    const modelName = process.env.GEMINI_AI_MODEL || 'google/gemini-2.0-flash-exp:free';

    // Get all tech keys from Language enum
    const techKeys = Object.keys(Language).filter(key => isNaN(Number(key)));
    const language = techKeys[Math.floor(Math.random() * techKeys.length)];
    logData.tech = language;

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

    // 1. Get Trends
    const trendPrompt = `Act as a Tech Blog SEO Expert. Give me 1 highly trending and popular blog post title for "${language}" that developers are searching for right now.

    CRITICAL: Exclude the following existing topics:
    [${existingTopics}]

    Make sure the suggestion is completely new and unique.
    Return STRICTLY a JSON array of strings containing exactly 1 topic. Do not use markdown code blocks. Example: ["Topic 1"]`;

    const trendResponse = await GetOpenRouterResponse(trendPrompt, modelName);

    if (trendResponse.status !== 200) {
        const errorMsg = trendResponse.status === 429
          ? 'Rate limit hit (429) on OpenRouter. Please increase your cron interval to more than 5 minutes.'
          : (trendResponse.message || 'Failed to fetch trends from OpenRouter');
        throw new Error(errorMsg);
    }

    const trendText = trendResponse.data?.choices?.[0]?.message?.content;
    let topics: string[] = [];

    try {
        const clean = trendText.replace(/```json/g, '').replace(/```/g, '').trim();
        const start = clean.indexOf('[');
        const end = clean.lastIndexOf(']');
        if (start !== -1) topics = JSON.parse(clean.substring(start, end + 1));
        else topics = JSON.parse(clean);

        // Only take the first topic to ensure only one file is generated
        if (topics.length > 0) {
            topics = [topics[0]];
        }
    } catch (e) {
        console.error("Cron Trend Parse Error", e);
        topics = [`${language} Deep Dive: Latest Trends and Best Practices`];
    }
    logData.topics = topics;

    // Small delay to avoid burst rate limits
    await new Promise(resolve => setTimeout(resolve, 2000));

    const generated = [];

    // 2. Generate Posts
    for (const topic of topics) {
        const postPrompt = AIPrompts.prompt
            .replace('[CUSTOM_PROMPT]', topic)
            .replace('[LANGUAGE_ATTR]', language);

        const postResponse = await GetOpenRouterResponse(postPrompt, modelName);

        if (postResponse.status !== 200) {
            console.error(`Failed to generate post for topic "${topic}":`, postResponse.message);
            if (postResponse.status === 429) {
              logData.status = generated.length > 0 ? 'partial' : 'failed';
              logData.error = 'Rate limit hit during generation. Partial execution logged.';
              break; // Stop loop but continue to save whatever was finished
            }
            continue;
        }

        const content = postResponse.data?.choices?.[0]?.message?.content;

        // Extract Title
        const titleMatch = content.match(/title:\s*["']?(.*?)["']?(\r\n|\n|$)/);
        const title = titleMatch ? titleMatch[1] : topic;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const filename = `${new Date().toISOString().split('T')[0]}-${slug}.md`;

        // Save to drafts
        const fileDir = path.join(process.cwd(), 'posts', 'auto-drafts');
        await fs.mkdir(fileDir, { recursive: true });
        await fs.writeFile(path.join(fileDir, filename), content, 'utf-8');
        generated.push(filename);
    }

    logData.files = generated;

    // Save to history
    let history = [];
    try {
      const existingHistory = await fs.readFile(historyPath, 'utf-8');
      history = JSON.parse(existingHistory);
    } catch {
      // Return empty array if file doesn't exist
    }

    history.unshift(logData);
    await fs.writeFile(historyPath, JSON.stringify(history.slice(0, 50), null, 2));

    return NextResponse.json({
      success: logData.status !== 'failed',
      files: generated,
      message: logData.error
    });
  } catch (error: unknown) {
    console.error('Cron Job Error:', error);
    logData.status = 'failed';
    logData.error = (error as Error).message;

    // Save failed attempt to history
    let history = [];
    try {
      const existingHistory = await fs.readFile(historyPath, 'utf-8');
      history = JSON.parse(existingHistory);
    } catch {
      // Use empty array
    }
    history.unshift(logData);
    await fs.writeFile(historyPath, JSON.stringify(history.slice(0, 50), null, 2));

    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
