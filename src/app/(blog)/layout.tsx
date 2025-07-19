import Nav from '../components/nav/nav';
import { ThemeProvider } from '@/components/theme-provider';
import { ToastContainer } from 'react-toastify';
import PostContextProvider from '../../providers/PostContextProvider';
import { cookies } from 'next/headers';
const BlogLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const allCookies = cookies();
  console.log('Server cookies:', allCookies.getAll());

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Nav />
      <PostContextProvider>{children}</PostContextProvider>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default BlogLayout;
