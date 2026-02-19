import Image from 'next/image';

const Logo = ({ scrolled }: { scrolled?: boolean }) =>
{
  return (
    <div className="flex items-center gap-2">
      <Image
        src={'/logo_round_won.png'}
        alt="logo for codedaze"
        height={32}
        width={32}
      />
      <p className={`font-bold text-lg tracking-wider hidden md:flex transition-colors duration-300 ${scrolled ? 'text-gray-900 dark:text-gray-900' : 'text-white'
        }`}>
        Code Daze
      </p>
    </div>
  );
};

export default Logo;
