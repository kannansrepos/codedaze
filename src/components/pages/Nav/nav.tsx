'use client';

import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Logo from './_components/logo';
import Link from 'next/link';
import MobileNav from './_components/mobile-nav';
import { navMenuData } from '@/lib/data';
import Image from 'next/image';


const Nav = () =>
{
  const { data: session } = useSession();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() =>
  {
    setIsAdminUser(!!session?.user?.email);
  }, [session]);

  useEffect(() =>
  {
    const handleScroll = () =>
    {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () =>
  {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header
      className={`fixed top-0 z-[100] w-full transition-all duration-500 ease-in-out ${scrolled
        ? 'py-3 bg-white/95 dark:bg-white/95 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] border-b border-gray-200/50 dark:border-gray-200/20'
        : 'py-6 bg-transparent'
        }`}
    >
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-6 md:px-8">
        <Link
          href="/"
          className="flex items-center transition-all duration-300 hover:opacity-80 active:scale-95"
          prefetch={false}
        >
          <Logo scrolled={scrolled} />
        </Link>

        <nav className="hidden items-center gap-10 font-medium md:flex">
          {navMenuData.map((item) =>
          {
            if (item.requireAdmin && !isAdminUser) return null;
            return (
              <Link
                key={item.name}
                href={item.href}
                prefetch={false}
                className={`group relative text-sm font-bold tracking-wide transition-all duration-300 ${scrolled
                  ? 'text-gray-800 dark:text-gray-800 hover:text-primary'
                  : 'text-white/90 hover:text-white'
                  }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full`} />
              </Link>
            );
          })}

          {session ? (
            <div className="flex items-center gap-6 pl-4 border-l border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                {session.user?.image && (
                  <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-primary to-purple-500">
                    <Image
                      src={session.user.image}
                      alt="avatar"
                      height={32}
                      width={32}
                      className="rounded-full bg-white dark:bg-gray-900"
                    />
                  </div>
                )}
                <span className={`text-xs font-bold leading-none max-w-[120px] truncate ${scrolled ? 'text-gray-700 dark:text-gray-700' : 'text-white'}`}>
                  {session.user?.email?.split('@')[0]}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-full transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] active:scale-95"
              >
                Logout
              </button>
            </div>
          ) : null}
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <MobileNav scrolled={scrolled} />
        </div>
      </div>
    </header>
  );
};

export default Nav;
