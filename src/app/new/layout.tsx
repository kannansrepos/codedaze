'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import Nav from '../components/nav/nav';
import { ToastContainer } from 'react-toastify';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [docEnv, setDocEnv] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setDocEnv(true);
    }
  }, []);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Nav />
      {docEnv && children}
      <ToastContainer />
    </ThemeProvider>
  );
};
export default AppLayout;
