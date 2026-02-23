import generate_Metadata from '@/lib/generateMetadata';
import { Slag } from '@/types/BlogPost';

const img = [
  'ai',
  'angular',
  'azure',
  'docker',
  'dotnet',
  'nextjs',
  'postgresql',
  'python',
  'react',
];
const getImage = (language: string) =>
{
  if (img.includes(language)) return language;
  return 'default';
};
const getPostData = async (postId: string) =>
{
  const response = await fetch(`/api/post/file?postId=${postId}`);
  const responseData = await response.json();
  const { downloadResult } = responseData.data;
  return downloadResult;
};
export async function generateMetadata({
  params,
}: {
  params: { postId: string };
})
{
  const { downloadResult } = await getPostData(params.postId);
  const slagData = downloadResult?.frontmatter as Slag;

  return generate_Metadata({
    title: slagData.title,
    description: slagData.subtitle,
    url: `https://www.codedaze.tech/blog/${params.postId}`,
    image: `https://www.codedaze.tech/img/${getImage(slagData?.language)}.png`,
    keywords: slagData.SEO_Keywords_List,
  });
}
const PostMeta = () =>
{
  return <div></div>;
};

export default PostMeta;
