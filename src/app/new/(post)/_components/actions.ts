const UploadFileToGithub = async (
  content: string,
  fileName: string,
  GITHUB_TOKEN: string
) => {
  return await fetch(`/api/post/github`, {
    method: 'POST',
    body: JSON.stringify({
      markdownContent: content,
      fileName: fileName,
      GITHUB_TOKEN,
    }),
  });
};

const UploadFileStore = async (content: string, fileName: string) => {
  return await fetch(`/api/post/file`, {
    method: 'POST',
    body: JSON.stringify({
      markdownContent: content,
      fileName: fileName,
    }),
  });
};

export { UploadFileToGithub, UploadFileStore };
