import Image from 'next/image';
import Link from 'next/link';

const SocialLinks = ({ size = 80 }: { size?: number }) =>
{
  const socialLink = [
    {
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/kanns/',
      icon: '/images/linkedin.png',
    },
    {
      name: 'YouTube',
      link: 'https://www.youtube.com/@CodeDaze',
      icon: '/images/youtube.png',
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com/@KannansMca',
      icon: '/images/twitter.png',
    },
    {
      name: 'GitHub',
      link: 'https://github.com/kannansrepos',
      icon: '/images/github.png',
    },
  ];
  return (
    <div className="flex gap-8">
      {socialLink.map((link) => (
        <Link
          key={link.name}
          href={link.link}
          aria-label={`Visit my ${link.name} profile`}
          className="flex items-center gap-2"
        >
          <Image src={link.icon} alt={link.name} width={size} height={size} />
        </Link>
      ))}
    </div>
  );
};

export default SocialLinks;
