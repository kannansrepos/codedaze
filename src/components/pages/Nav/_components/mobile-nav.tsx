'use client';
import React, { useEffect, useState } from 'react';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { navMenuData } from '@/lib/data';
import { createClient } from '@/utils/supabase/client';
const MobileNav = () => {
  const [IsAdminUser, setIsAdminUser] = useState(false);
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (
        process.env.NEXT_PUBLIC_ADMIN_USERS?.split(',').includes(
          data.user?.email || ''
        )
      ) {
        setIsAdminUser(true);
      }
    });
  }, []);
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full md:hidden"
          >
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="md:hidden">
          <div className="grid gap-4 p-4">
            {navMenuData.map((item) => {
              if (item.name === 'Create Post' && !IsAdminUser) {
                return null;
              } else {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    prefetch={false}
                    className="text-sm font-medium hover:font-bold hover:tracking-wider hover:text-primary"
                  >
                    {item.name}
                  </Link>
                );
              }
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNav;
