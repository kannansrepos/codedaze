'use client';

import Image from 'next/image';
import { NewsLetter, Footer, SocialLinks } from '@/components';
import { Code2, Rocket, Award, Users, BookOpen, Zap } from 'lucide-react';

const AboutPage = () =>
{
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
    { name: 'C#', color: 'from-green-500/20 to-green-600/20' },
    { name: 'ASP.NET Core', color: 'from-purple-500/20 to-purple-600/20' },
    { name: 'Next.js', color: 'from-slate-700/20 to-slate-900/20' },
    { name: 'React', color: 'from-cyan-500/20 to-blue-500/20' },
    { name: 'TypeScript', color: 'from-blue-500/20 to-blue-600/20' },
    { name: 'Azure', color: 'from-blue-600/20 to-cyan-500/20' },
    { name: 'SQL Server', color: 'from-red-500/20 to-red-600/20' },
    { name: 'Angular', color: 'from-red-600/20 to-pink-600/20' },
    { name: 'PostgreSQL', color: 'from-blue-700/20 to-blue-900/20' },
    { name: 'Docker', color: 'from-blue-500/20 to-cyan-400/20' },
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
    <div className="min-h-screen pt-28">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="mb-20 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Founding Stories</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.9]">
            Meet <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Kannan S</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Empowering Digital Solutions with .NET Full-Stack Expertise
          </p>
        </div>

        {/* Main Content Card - Premium Glassmorphism */}
        <div className="bg-white/[0.02] backdrop-blur-xl rounded-[3rem] border border-white/[0.05] overflow-hidden mb-16 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-12 p-8 md:p-16">
            {/* Profile Section */}
            <div className="text-center space-y-8">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] opacity-40"></div>
                <Image
                  src="/images/profile_n.jpg"
                  height={240}
                  width={240}
                  alt="Kannan S - Lead Software Engineer"
                  className="relative rounded-full w-56 h-56 mx-auto border-2 border-white/10 shadow-3xl object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-black text-white tracking-tight">
                  Kannan S
                </h2>
                <p className="text-primary font-black text-xs uppercase tracking-widest">Lead Software Engineer</p>
              </div>

              {/* Certificates - Minimalist */}
              <div className="flex justify-center gap-4">
                {certificates.map((cert, index) => (
                  <a
                    key={index}
                    href={`https://learn.microsoft.com/en-us/users/kannan-s-299/credentials/${cert.ref}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-primary/50 transition-all duration-500"
                    title={cert.name}
                  >
                    <Image
                      src={cert.image}
                      alt={`${cert.name} Certificate`}
                      width={40}
                      height={40}
                      className="w-10 h-10 transition-transform group-hover:scale-110"
                    />
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="pt-4">
                <div className="inline-block p-4 bg-white/[0.02] rounded-3xl border border-white/[0.05]">
                  <SocialLinks size={24} />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:col-span-2 space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">The Mission</h3>
                </div>
                <div className="space-y-6 text-slate-400 font-medium text-lg leading-relaxed">
                  <p className="text-3xl text-white font-black leading-tight italic opacity-90">👋 Hi, I&apos;m Kannan</p>
                  <p>
                    As a dedicated .NET Full-Stack Developer with <span className="text-white font-black">14+ years of experience</span>,
                    I specialize in crafting robust, scalable, and user-centric applications that bridge the gap between innovative
                    ideas and real-world solutions.
                  </p>
                  <p>
                    I focus on <span className="text-white font-black italic">system architecture</span>,
                    <span className="text-white font-black italic"> performance optimization</span>, and
                    <span className="text-white font-black italic"> clean code principles</span> to deliver
                    exceptional digital experiences.
                  </p>
                </div>
              </div>

              {/* Skills - Modern Pill Style */}
              <div className="space-y-6 pt-6 border-t border-white/[0.05]">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Core Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-slate-300 font-black text-[10px] uppercase tracking-widest hover:border-primary/40 hover:text-white transition-all duration-300`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Grid - Premium Minimalist Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-white/[0.02] border border-white/[0.05] rounded-[2rem] p-8 hover:bg-white/[0.04] hover:border-primary/20 transition-all duration-500"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${highlight.color} flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform`}>
                <highlight.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-black text-white mb-3 tracking-tight">{highlight.title}</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{highlight.description}</p>
            </div>
          ))}
        </div>

        {/* Vision Section */}
        <div className="relative p-12 md:p-20 bg-white/[0.02] rounded-[3rem] border border-white/[0.05] text-center space-y-8 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/5 blur-[100px] pointer-events-none" />
          <div className="relative space-y-4">
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">Crafting the Future of <br /> Engineering Content</h3>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              To empower developers and businesses with cutting-edge .NET solutions, building a community of passionate
              craftsmanship through <span className="text-white font-black italic">Code Daze</span>.
            </p>
          </div>
        </div>
      </div>

      <NewsLetter />
      <Footer />
    </div>
  );
};

export default AboutPage;
