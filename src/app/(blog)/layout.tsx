import { Nav } from '@/components';
const BlogLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default BlogLayout;
