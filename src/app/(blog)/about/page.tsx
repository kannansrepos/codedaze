import Image from 'next/image';
import { NewsLetter, Footer, SocialLinks } from '@/components';

const page = () => {
  const certificate = [
    {
      image: '/images/certificates/ai-102.svg',
      ref: '4b0deceb33e5d78a',
    },
    {
      image: '/images/certificates/az-102.svg',
      ref: 'd388984d7a2b1cb5',
    },
    {
      image: '/images/certificates/az-900.svg',
      ref: 'a17246d7f465769d',
    },
  ];
  const skills = [
    'C#',
    'ASP.NET Core',
    'Next.js',
    'React',
    'TypeScript',
    'Azure',
    'SQL Server',
    'Angular',
    'PostgreSQL',
    'Docker',
  ];
  return (
    <div>
      <div className="bg-[#FEFEFE] rounded-xl shadow-lg w-full p-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 text-center mb-6 md:mb-0">
            <Image
              src="/images/profile_n.jpg"
              height={300}
              width={300}
              alt="Profile Picture"
              className="rounded-full w-32 h-32 mx-auto mb-1"
            />
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#2A42BA] via-[#8142EF] to-[#C521EF] inline-block text-transparent bg-clip-text">
              Kannan S
            </h2>
            <p className="text-gray-600">Lead Software Engineer</p>
            <div className="flex justify-center mt-4">
              {certificate.map((cert, index) => (
                <a
                  key={index}
                  href={`https://learn.microsoft.com/en-us/users/kannan-s-299/credentials/${cert.ref}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-2"
                >
                  <Image
                    src={cert.image}
                    alt="Certificate"
                    width={100}
                    height={100}
                    className="w-10 h-10"
                  />
                </a>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <SocialLinks size={32} />
            </div>
          </div>
          <div className="md:w-2/3 md:pl-8 flex flex-col gap-8">
            <h3 className="text-3xl font-semibold text-[#2A42BA] mb-2">
              About Me
            </h3>
            <p className="text-gray-700 mb-4 text-4xl">
              👋 Hi, I&apos;m Kannan S
            </p>
            <p className="text-2xl font-bold">
              Empowering Digital Solutions with .NET Full-Stack Expertise
            </p>
            <p className="text-xl space-y-2 text-justify tracking-wide leading-loose">
              As a dedicated .NET Full-Stack Developer, I specialize in crafting
              robust, scalable, and user-centric applications that bridge the
              gap between innovative ideas and real-world solutions. My journey
              in software development is driven by a passion for continuous
              learning and a commitment to excellence in every line of code.
            </p>
            <h3 className="text-2xl font-semibold text-[#2A42BA] mb-2">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-indigo-100 text-[#2A42BA] px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default page;
