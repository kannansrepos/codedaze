'use client';
import React, { useEffect, useState } from 'react';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { navMenuData } from '@/lib/data';

const MobileNav = ({ scrolled }: { scrolled?: boolean }) => {
  const { data: session } = useSession();
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    // If user is logged in, they are admin (since only admins can authenticate)
    setIsAdminUser(!!session?.user?.email);
  }, [session]);

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full md:hidden transition-colors duration-300 ${
              scrolled ? 'text-gray-900 dark:text-white' : 'text-white'
            }`}
          >
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="md:hidden">
          <div className="grid gap-4 p-4">
            {navMenuData.map((item) => {
              if (item.requireAdmin && !isAdminUser) {
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
