import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';

const markdownToHtml = (markdown: string) => {
  const html = marked(markdown);
  return html;
};

const getMarkdownData = (markdownFileName: string) => {
  if (!markdownFileName) {
    console.error('Missing slug');
  }
  try {
    const folder = 'posts/';
    const file = `${folder}${markdownFileName}.md`;
    const content = fs.readFileSync(file, 'utf8');
    const matterResult = matter(content);
    // Ensure required fields are present
    if (!matterResult.data.title) {
      throw new Error(
        `Missing title in frontmatter for slug: ${markdownFileName}`
      );
    }
    return matterResult;
  } catch (err) {
    console.error(`Error reading post "${markdownFileName}":`, err);
  }
};

const getMarkdownDataList = (markdownFileNames: string[]) => {
  const markdownDataList = markdownFileNames.map((markdownFileName) => {
    return getMarkdownData(markdownFileName);
  });
  return markdownDataList;
};

export { markdownToHtml, getMarkdownData, getMarkdownDataList };
