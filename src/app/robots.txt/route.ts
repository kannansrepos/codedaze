import { NextResponse } from 'next/server';

export async function GET() {
  const content = `
# CodeDaze - Tech Blog Robots Configuration
User-agent: *
Allow: /

# Allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

# Disallow admin and API routes from indexing
Disallow: /admin/
Disallow: /api/
Disallow: /new/

# Disallow draft posts
Disallow: /posts/auto-drafts/
Disallow: /posts/rejected/

# Sitemap location
Sitemap: https://www.codedaze.tech/sitemap.xml
Sitemap: https://www.codedaze.tech/sitemap.xml

# Crawl delay (optional - helps prevent server overload)
Crawl-delay: 1
  `.trim();

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
