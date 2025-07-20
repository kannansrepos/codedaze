import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={'/logo_round_won.png'}
        alt="logo for codedaze"
        height={32}
        width={32}
      />
      <p className="font-bold text-lg text-primary-foreground tracking-wider hidden md:flex">
        Code Daze
      </p>
    </div>
  );
};

export default Logo;
