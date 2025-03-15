import React from 'react';
import Logo from './_components/logo';
import Link from 'next/link';
import MobileNav from './_components/mobile-nav';
import { navMenuData } from '@/lib/data';
import { ThemeTogglerButton } from '@/components/theme-toggler';

const Nav = () => {
  return (
    <header className="sticky flex top-0 z-50 w-full border-b border-primary bg-primary backdrop-blur-sm text-primary-foreground text-lg">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center" prefetch={false}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6  font-medium md:flex">
          {navMenuData.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              prefetch={false}
              className="hover:font-bold hover:tracking-wider hover:border-b-2"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <ThemeTogglerButton />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Nav;
