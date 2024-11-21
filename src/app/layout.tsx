import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Nav from './components/nav/nav';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title:
    'Ultimate Developer Blog: .NET, Angular, React, Node.js, Microservices, Docker, Tailwind CSS, and More',
  description:
    'Discover the latest tutorials, tips, and in-depth articles on .NET, .NET Core, Angular, React.js, Node.js, TypeScript, Next.js, Tailwind CSS, Docker, Microservices, and modern web development. Stay updated with the newest trends and best practices to level up your skills and build scalable applications.',
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
          content="Ultimate Developer Blog: .NET, Angular, React, Node.js, Microservices, Docker, Tailwind CSS, and More"
        />
        <meta
          name="description"
          content="Discover the latest tutorials, tips, and in-depth articles on .NET, .NET Core, Angular, React.js, Node.js, TypeScript, Next.js, Tailwind CSS, Docker, Microservices, and modern web development. Stay updated with the newest trends and best practices to level up your skills and build scalable applications."
        />
        <meta
          name="keywords"
          content=".NET, .NET Core, Angular, React.js, Node.js, TypeScript, Next.js, Tailwind CSS, Shadcn, Docker, Microservices, Web Development, Tutorials, JavaScript"
        />
        <meta
          property="og:title"
          content="Ultimate Developer Blog: .NET, Angular, React, Node.js, Microservices, Docker, Tailwind CSS, and More"
        />
        <meta
          property="og:description"
          content="Explore tutorials and tips on .NET, Angular, React.js, Node.js, Microservices, Docker, and modern web development to advance your skills."
        />
        <meta
          property="og:image"
          content="URL_of_an_image_representing_your_blog_content"
        />
        <meta property="og:url" content="URL_of_your_blog_homepage" />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:title"
          content="Ultimate Developer Blog: .NET, Angular, React, Node.js, Microservices, Docker, Tailwind CSS, and More"
        />
        <meta
          name="twitter:description"
          content="Stay up-to-date with tutorials and best practices on .NET, Angular, Node.js, Docker, and more to build scalable web applications."
        />
        <meta name="twitter:image" content="URL_of_an_image_for_Twitter_card" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
