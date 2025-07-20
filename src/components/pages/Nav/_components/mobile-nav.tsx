import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { navMenuData } from '@/lib/data';
const MobileNav = () => {
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
            {navMenuData.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={false}
                className="text-sm font-medium hover:font-bold hover:tracking-wider hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNav;
