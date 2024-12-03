'use client';
import { useRouter } from 'next/navigation';
import { PlusIcon } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AdminPage = () => {
  const router = useRouter();
  return (
    <div className="h-screen w-screen flex items-start justify-start p-4 container mx-auto">
      <Card className="w-full">
        <CardHeader>Blog Posts for your Blog</CardHeader>
        <CardContent>
          <div>
            <div className="flex justify-end items-center bg-primary/10 p-4">
              <Button onClick={() => router.push('/skadedit/newpost')}>
                <PlusIcon />
                Add New Post
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
