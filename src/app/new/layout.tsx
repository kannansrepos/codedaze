'use client';

import { useEffect, useState } from 'react';
import { Nav } from '@/components';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [docEnv, setDocEnv] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setDocEnv(true);
    }
  }, []);
  return (
    <>
      <Nav />
      {docEnv && children}
    </>
  );
};
export default AppLayout;
