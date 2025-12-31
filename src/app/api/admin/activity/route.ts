import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const historyPath = path.join(process.cwd(), 'data', 'cron-history.json');
    let history = [];
    try {
      const data = await fs.readFile(historyPath, 'utf-8');
      history = JSON.parse(data);
    } catch {
      // Return empty array if file doesn't exist
    }
    return NextResponse.json(history);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}
