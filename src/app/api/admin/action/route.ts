import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { UploadData } from '@/lib/GithubUtil';
import { PostToLinkedIn } from '@/lib/LinkedInService';
import { AIPrompts } from '@/lib/Prompts';
import { GetOpenRouterResponse } from '@/lib/OpenRouterService';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const { searchParams } = new URL(req.url);
        const filename = searchParams.get('filename');
        const draftsDir = path.join(process.cwd(), 'posts', 'auto-drafts');

        // Ensure directory exists
        await fs.mkdir(draftsDir, { recursive: true });

        if (filename) {
            const filePath = path.join(draftsDir, filename);
            const content = await fs.readFile(filePath, 'utf-8');
            return NextResponse.json({ content });
        }

        const files = await fs.readdir(draftsDir);
        const drafts = files.filter(f => f.endsWith('.md'));

        return NextResponse.json({ drafts });
    } catch (e: unknown) {
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const body = await req.json();
        const { filename, action } = body;

        if (!filename || !action) {
            return NextResponse.json({ error: 'Missing filename or action' }, { status: 400 });
        }

        const draftsDir = path.join(process.cwd(), 'posts', 'auto-drafts');
        const source = path.join(draftsDir, filename);

        // Check if source exists
        try {
            await fs.access(source);
        } catch {
            return NextResponse.json({ error: `Source file not found: ${filename}` }, { status: 404 });
        }

        if (action === 'approve') {
            // Read content
            const content = await fs.readFile(source, 'utf-8');

            // Clean content: Remove markdown wrappers if any
            let cleanedContent = content.trim();
            if (cleanedContent.startsWith('```markdown')) {
                cleanedContent = cleanedContent.replace(/^```markdown\n?/, '');
            } else if (cleanedContent.startsWith('```')) {
                cleanedContent = cleanedContent.replace(/^```\n?/, '');
            }
            if (cleanedContent.endsWith('```')) {
                cleanedContent = cleanedContent.replace(/\n?```$/, '');
            }

            // Remove date prefix from filename for GitHub path
            const cleanFilename = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '');
            const githubPath = `posts/${cleanFilename}`;
            const slug = cleanFilename.replace('.md', '');
            const publicUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.codedaze.net'}/blog/${slug}`;

            // Push to GitHub
            const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
            if (!GITHUB_TOKEN) {
                throw new Error('GitHub token not configured');
            }

            await UploadData(GITHUB_TOKEN, cleanedContent, githubPath);

            // AUTO-POST TO LINKEDIN
            try {
                const linkedinPrompt = AIPrompts.linkedinPrompt.replace('[BLOG_CONTENT]', cleanedContent.substring(0, 3000));

                console.log('[LinkedIn] Generating AI social post...');
                const aiResponse = await GetOpenRouterResponse(linkedinPrompt);

                if (aiResponse.status === 200) {
                    const liContent = aiResponse.data?.choices?.[0]?.message?.content;
                    if (liContent) {
                        console.log('[LinkedIn] Publishing Post...');
                        const liResult = await PostToLinkedIn(liContent, publicUrl);
                        if (liResult.success) {
                            console.log('[LinkedIn] Successfully posted!');
                        } else {
                            console.warn('[LinkedIn] Posting failed:', liResult.error);
                        }
                    }
                }
            } catch (liError) {
                console.error('[LinkedIn] Integration error:', liError);
                // We don't throw here because we want the GitHub push to be considered the primary success
            }

            // Delete local draft
            await fs.unlink(source);

            console.log(`Approved and pushed to GitHub: ${githubPath}`);
        } else if (action === 'reject') {
            const destDir = path.join(process.cwd(), 'posts', 'rejected');
            await fs.mkdir(destDir, { recursive: true });

            const destPath = path.join(destDir, filename);
            await fs.copyFile(source, destPath);
            await fs.unlink(source);

            console.log(`Rejected and moved draft: ${filename}`);
        } else {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch(e: unknown) {
        console.error('Admin Action Error:', e);
        return NextResponse.json({
            error: (e as Error).message,
            stack: process.env.NODE_ENV === 'development' ? (e as Error).stack : undefined
        }, { status: 500 });
    }
}
