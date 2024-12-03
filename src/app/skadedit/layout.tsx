'use client';

import { useEffect, useState } from 'react';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [docEnv, setDocEnv] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setDocEnv(true);
    }
  }, []);
  return (
    <div className="relative h-full overflow-hidden bg-background">
      {docEnv && children}
    </div>
  );
};

export default AppLayout;
