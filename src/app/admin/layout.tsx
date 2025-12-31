'use client';

import { Nav } from '@/components';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default AdminLayout;
