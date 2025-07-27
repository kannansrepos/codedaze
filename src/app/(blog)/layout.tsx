import { Nav } from '@/components';
import SubscribeNewsletter from '@/components/pages/SubscribeNewsletter';
const BlogLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Nav />
      {children}
      <SubscribeNewsletter />
    </>
  );
};

export default BlogLayout;
