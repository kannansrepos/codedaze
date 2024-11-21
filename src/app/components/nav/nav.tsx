import React from 'react';
import Logo from './_components/logo';
import Link from 'next/link';
import { PhoneIcon } from 'lucide-react';

import MobileNav from './_components/mobile-nav';

const Nav = () => {
  return (
    <header className="sticky flex top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950">
      <Link
        href="#"
        className="hidden md:flex items-center gap-2"
        prefetch={false}
      >
        <Logo />
      </Link>
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="#"
          className="flex md:hidden items-center gap-2"
          prefetch={false}
        >
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            prefetch={false}
          >
            Services
          </Link>
          <Link
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 text-sm font-medium md:flex">
            <PhoneIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400">
              +91 9369663350
            </span>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Nav;
