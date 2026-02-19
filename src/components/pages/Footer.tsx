import { Github, Linkedin, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

const Footer = () =>
{
  return (
    <footer className="w-full bg-[#020617] border-t border-white/[0.05]">
      <div className="container mx-auto flex items-center justify-between px-6 md:px-8 h-16">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">
          &copy; {new Date().getFullYear()} CodeDaze
        </span>
        <div className="flex items-center gap-1">
          <Link
            href="https://www.linkedin.com/in/kanns/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.05] transition-all"
          >
            <Linkedin className="w-4 h-4" />
          </Link>
          <Link
            href="https://www.youtube.com/@CodeDaze"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.05] transition-all"
          >
            <Youtube className="w-4 h-4" />
          </Link>
          <Link
            href="https://twitter.com/@KannansMca"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.05] transition-all"
          >
            <Twitter className="w-4 h-4" />
          </Link>
          <Link
            href="https://github.com/kannansrepos"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.05] transition-all"
          >
            <Github className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
