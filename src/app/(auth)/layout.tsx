import { ThemeProvider } from '@/components/theme-provider';
import { ToastContainer } from 'react-toastify';
const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <ToastContainer />
    </ThemeProvider>
  );
};

export default AuthLayout;
