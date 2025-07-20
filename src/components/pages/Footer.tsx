import { Github, Linkedin, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="w-full h-14 bg-[#111827] text-white items-center flex">
      <div className="flex items-center justify-between px-4 md:px-6 container mx-auto">
        <div>&copy; {new Date().getFullYear()} CodeDaze.tech</div>
        <div className="flex gap-4">
          <p className="hidden lg:inline-block">Connect |</p>
          <Link href="https://www.linkedin.com/in/kanns/">
            <Linkedin />
          </Link>
          <Link href="https://www.youtube.com/@CodeDaze">
            <Youtube />
          </Link>
          <Link href="https://twitter.com/@KannansMca">
            <Twitter />
          </Link>
          <Link href="https://github.com/kannansrepos">
            <Github />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Footer;
