const fs = require('fs');
const path = require('path');

// Configuration
const baseUrl = 'https://codedaze.net';
const directory = 'posts';
const changefreq = 'monthly';
const priority = '0.8';

// Get current date in YYYY-MM-DD
const currentDate = new Date().toISOString().split('T')[0];

// Start the sitemap
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
`;

const postsPath = path.join(process.cwd(), directory);
const files = fs.readdirSync(postsPath);

files.forEach((filename) =>
{
  if (filename.endsWith('.md'))
  {
    const slug = filename.replace('.md', '');
    const fileUrl = `${baseUrl}/blog/${slug}`;
    sitemap += `    <url>
        <loc>${fileUrl}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
    </url>
`;
  }
});

sitemap += '</urlset>';

fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8');
console.log('✅ Sitemap generated successfully at public/sitemap.xml');
