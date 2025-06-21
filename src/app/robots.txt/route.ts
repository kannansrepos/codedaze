import { NextResponse } from 'next/server';

export async function GET() {
  const content = `
User-agent: *
Allow: /

Sitemap: https://codedaze.tech/sitemap.xml
  `.trim();

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
