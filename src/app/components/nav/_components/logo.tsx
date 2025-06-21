import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={'/m_logo_new.png'}
        alt="logo for codedaze"
        height={40}
        width={40}
      />
      <p className="font-bold text-lg text-primary-foreground tracking-wider hidden md:flex">
        Code Daze
      </p>
    </div>
  );
};

export default Logo;
