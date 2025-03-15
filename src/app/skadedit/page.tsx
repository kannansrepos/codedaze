'use client';
import { useRouter } from 'next/navigation';
import { PlusIcon } from 'lucide-react';
import { toast } from 'react-toastify';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { useState } from 'react';

const AdminPage = () => {
  const [language, setLanguage] = useState('dotnet');
  const CreateAutoPosts = async () => {
    const res = await fetch(`/api/autopost?lang=${language}`);
    if (res.ok) {
    }
    return [];
  };
  const CreateSamplePosts = async () => {
    const res = await fetch(`/api/blogpost`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
    if (res.ok) {
      toast.success('Created Sample Posts!');
    }
    return [];
  };
  const router = useRouter();
  return (
    <div className="h-screen w-screen flex items-start justify-start p-4 container mx-auto">
      <Card className="w-full">
        <CardHeader>Blog Posts for your Blog</CardHeader>
        <CardContent>
          <div>
            <div className="flex justify-end items-center bg-primary/10 p-4 gap-3">
              <Dialog>
                <DialogTrigger>Create Auto Post</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                      <Label htmlFor="link" className="sr-only">
                        Language
                      </Label>
                      <Input
                        id="language"
                        defaultValue="dotnet"
                        onChange={(e) => {
                          setLanguage(e.target.value);
                        }}
                      />
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      className="px-3"
                      onClick={async () => {
                        await CreateAutoPosts();
                      }}
                    >
                      Create Post
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button onClick={() => router.push('/skadedit/newpost')}>
                <PlusIcon />
                Add New Post
              </Button>
              <Button
                type="button"
                size="sm"
                className="px-3"
                onClick={async () => {
                  await CreateSamplePosts();
                }}
              >
                Create Sample Post
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
