import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex">
      <Image src={'/logo.png'} alt="logo for codedaze" height={80} width={80} />
      <p className="font-bold text-lg py-6 text-blue-900">CodeDaze</p>
    </div>
  );
};

export default Logo;
