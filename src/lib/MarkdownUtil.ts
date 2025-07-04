const markdownToHtml = async (markdown: string) => {
  if (typeof markdown !== 'string') {
    throw new Error('markdownToHtml: input must be a string');
  }
  return markdown;
};

export { markdownToHtml };
