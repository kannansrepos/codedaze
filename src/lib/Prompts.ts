export const AIPrompts = {
  prompt: `Act as a senior technical content strategist and SEO expert with full-stack development knowledge.

I want to write a blog targeting developers about the following topic:

"[CUSTOM_PROMPT]"

Your task is to generate a complete blog content plan optimized for technical audiences and search engines.

Provide the following:

1. SEO-Friendly Blog Title – Engaging and keyword-rich.
2. Subtitle – One-line catchy summary.
3. Estimated Read Time
4. Meta Description – Max 160 characters, optimized for SEO.
5. Full Blog Outline – Logical, structured, beginner-friendly to advanced.
6. In-Depth Blog Content – Explain concepts in clear language with real-world relevance.
7. Code Examples – Add clean, simple code blocks to explain best practices (C#, SQL, Dockerfile, etc. as relevant).
8. Common Pitfalls – Highlight mistakes and how to avoid them.
9. Performance Tips – If applicable.
10. Conclusion – Summary and practical recommendations.
11. SEO Keywords List – For title, headings, and meta description (include short and long-tail keywords).

Notes:
- Use simple developer-friendly language, assume intermediate-level audience.
- Follow markdown formatting.
- All code examples must be properly syntax highlighted.
- Make the post timeless and beginner-accessible while giving enough technical depth for seniors.

example:"
---
title: "Title of the blog"
subtitle: "Sub Title Of the Blog"
readTime: "Read Time Of the Blog"
date:"${new Date().toISOString().split('T')[0]}",
language:"what am passing language"
my language attribute is: [LANGUAGE_ATTR]
meta_description: "Meta Description of the blog"
"SEO_Keywords_List": "Key Word about the POST",
"SEO_Meta_Description": "Meta Description of the blog"
---
full_blog as Markdown content with headings, code blocks, and explanations.",
Now begin.
`,
};
