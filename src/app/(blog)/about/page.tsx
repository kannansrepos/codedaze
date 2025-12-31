'use client';

import Image from 'next/image';
import { NewsLetter, Footer, SocialLinks } from '@/components';
import { Code2, Rocket, Award, Users, BookOpen, Zap } from 'lucide-react';

const AboutPage = () => {
  const certificates = [
    {
      image: '/images/certificates/ai-102.svg',
      ref: '4b0deceb33e5d78a',
      name: 'AI-102'
    },
    {
      image: '/images/certificates/az-102.svg',
      ref: 'd388984d7a2b1cb5',
      name: 'AZ-102'
    },
    {
      image: '/images/certificates/az-900.svg',
      ref: 'a17246d7f465769d',
      name: 'AZ-900'
    },
  ];

  const skills = [
    { name: 'C#', color: 'from-green-500 to-green-600' },
    { name: 'ASP.NET Core', color: 'from-purple-500 to-purple-600' },
    { name: 'Next.js', color: 'from-gray-700 to-gray-900' },
    { name: 'React', color: 'from-cyan-500 to-blue-500' },
    { name: 'TypeScript', color: 'from-blue-500 to-blue-600' },
    { name: 'Azure', color: 'from-blue-600 to-cyan-500' },
    { name: 'SQL Server', color: 'from-red-500 to-red-600' },
    { name: 'Angular', color: 'from-red-600 to-pink-600' },
    { name: 'PostgreSQL', color: 'from-blue-700 to-blue-900' },
    { name: 'Docker', color: 'from-blue-500 to-cyan-400' },
  ];

  const highlights = [
    {
      icon: Code2,
      title: '14+ Years Experience',
      description: 'Hands-on expertise in .NET development and system architecture',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Rocket,
      title: 'Performance Expert',
      description: 'Specializing in optimization and scalable solutions',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Award,
      title: 'Microsoft Certified',
      description: 'Azure AI, Azure Administrator certifications',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Users,
      title: 'Team Leadership',
      description: 'Leading and mentoring development teams',
      color: 'from-indigo-500 to-indigo-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-20">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>About Code Daze</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Meet <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">Kannan S</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Empowering Digital Solutions with .NET Full-Stack Expertise
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden mb-12 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-8 p-8 md:p-12">
            {/* Profile Section */}
            <div className="text-center space-y-6">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50"></div>
                <Image
                  src="/images/profile_n.jpg"
                  height={200}
                  width={200}
                  alt="Kannan S - Lead Software Engineer"
                  className="relative rounded-full w-48 h-48 mx-auto border-4 border-white/20 shadow-xl"
                />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Kannan S
                </h2>
                <p className="text-blue-300 font-semibold mb-4">Lead Software Engineer</p>

                {/* Certificates */}
                <div className="flex justify-center gap-3 mb-6">
                  {certificates.map((cert, index) => (
                    <a
                      key={index}
                      href={`https://learn.microsoft.com/en-us/users/kannan-s-299/credentials/${cert.ref}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      title={cert.name}
                    >
                      <div className="absolute inset-0 bg-blue-500 rounded-lg blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                      <Image
                        src={cert.image}
                        alt={`${cert.name} Certificate`}
                        width={48}
                        height={48}
                        className="relative w-12 h-12 transition-transform group-hover:scale-110"
                      />
                    </a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex justify-center">
                  <SocialLinks size={32} />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-8 h-8 text-yellow-400" />
                  About Me
                </h3>
                <p className="text-4xl mb-6">👋 Hi, I&apos;m Kannan S</p>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  As a dedicated .NET Full-Stack Developer with <span className="text-blue-400 font-semibold">14+ years of experience</span>,
                  I specialize in crafting robust, scalable, and user-centric applications that bridge the gap between innovative
                  ideas and real-world solutions. My journey in software development is driven by a passion for continuous learning
                  and a commitment to excellence in every line of code.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  I focus on <span className="text-purple-400 font-semibold">system architecture</span>,
                  <span className="text-pink-400 font-semibold"> performance optimization</span>, and
                  <span className="text-blue-400 font-semibold"> clean code principles</span> to deliver
                  exceptional digital experiences.
                </p>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Technical Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`group relative px-4 py-2 rounded-lg bg-gradient-to-r ${skill.color} text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-default`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${highlight.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <highlight.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{highlight.title}</h4>
              <p className="text-sm text-gray-400">{highlight.description}</p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12 text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">My Mission</h3>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            To empower developers and businesses with cutting-edge .NET solutions, sharing knowledge through
            <span className="text-blue-400 font-semibold"> Code Daze</span>, and building a community of passionate
            developers who strive for excellence in software craftsmanship.
          </p>
        </div>
      </div>

      <NewsLetter />
      <Footer />
    </div>
  );
};

export default AboutPage;
