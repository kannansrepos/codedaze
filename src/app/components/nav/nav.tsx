'use client';
import React, { useEffect, useState } from 'react';
import { type User } from '@supabase/supabase-js';
import Logo from './_components/logo';
import Link from 'next/link';
import MobileNav from './_components/mobile-nav';
import { navMenuData } from '@/lib/data';
import { createClient } from '@/utils/supabase/client'; // adjust path as needed
import Image from 'next/image';

const Nav = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  };
  return (
    <header className="sticky flex top-0 z-50 w-full  bg-gradient-to-r from-[#2A42BA] via-[#8142EF] to-[#C521EF] backdrop-blur-sm text-primary-foreground text-lg">
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
          {user ? (
            <div className="flex items-center gap-2">
              {user.user_metadata?.avatar_url && (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="avatar"
                  height={32}
                  width={32}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span>{user.user_metadata?.name || user.email}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </nav>
        <div className="flex items-center gap-4">
          {/* <ThemeTogglerButton /> */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Nav;
