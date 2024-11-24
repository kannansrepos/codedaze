import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';
import Nav from './components/nav/nav';
import { ThemeProvider } from '@/components/theme-provider';

const roboto = Roboto({
  weight: ['400', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title:
    'Code Daze - Modern Web Development Tutorials & Best Practices for .NET, React, Angular & Cloud',
  description:
    'Welcome to Code Daze, Discover expert tutorials and guides on .NET, React, Angular, Node.js, and cloud development. Level up your skills with modern web development best practices.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta
          name="title"
          content="Code Daze - Modern Web Development Tutorials & Best Practices for .NET, React, Angular & Cloud"
        />
        <meta
          name="description"
          content="Welcome to Code Daze, Discover expert tutorials and guides on .NET, React, Angular, Node.js, and cloud development. Level up your skills with modern web development best practices."
        />
        <meta
          name="keywords"
          content=".NET, .NET Core, Angular, React.js, Node.js, TypeScript, Next.js, Tailwind CSS, Shadcn, Docker, Microservices, Web Development, Tutorials, JavaScript"
        />
        <meta
          property="og:title"
          content="Code Daze - Modern Web Development Tutorials & Best Practices for .NET, React, Angular & Cloud"
        />
        <meta
          property="og:description"
          content="Welcome to Code Daze, Discover expert tutorials and guides on .NET, React, Angular, Node.js, and cloud development. Level up your skills with modern web development best practices."
        />
        <meta
          property="og:image"
          content="URL_of_an_image_representing_your_blog_content"
        />
        <meta property="og:url" content="URL_of_your_blog_homepage" />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:title"
          content="Code Daze - Modern Web Development Tutorials & Best Practices for .NET, React, Angular & Cloud"
        />
        <meta
          name="twitter:description"
          content="Welcome to Code Daze, Discover expert tutorials and guides on .NET, React, Angular, Node.js, and cloud development. Level up your skills with modern web development best practices."
        />
        <meta name="twitter:image" content="URL_of_an_image_for_Twitter_card" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/logo.png" />
      </head>
      <body className={` ${roboto.className} antialiased bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
