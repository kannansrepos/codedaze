import { BlogPost } from '../../../types/BlogPost';

export const DUMMY_DATA: BlogPost[] = [
  {
    id: 'dotnet-productivity-boosters-short',
    url: 'dotnet-productivity-boosters-short',
    metadata: 'dotnet-productivity-boosters-short',
    language: 'dotnet',
    shortTitle: 'Boost .NET Productivity',
    title: 'Streamlining .NET Development: Top 5 Productivity Boosters',
    description:
      'Five quick tips to supercharge your .NET development workflow and save valuable time.',
    category: 'ASP.NET Core, .NET, C#, Productivity',
    date: '2024-10-31T14:00:00Z',
    readMin: 7,
    section: [
      {
        title: 'Introduction: Time is of the Essence',
        content:
          "<p>Developer time is precious.  These five tips will help you streamline your .NET development, maximizing efficiency and minimizing wasted time. Let's dive into practical strategies to boost your productivity.</p>",
        code: '',
        image: 'https://source.unsplash.com/random/800x600/?productivity,code', // Replace with a Pexels image
        imageAlt: 'Image representing developer productivity',
        videoUrl: 'xPYDBzfBl1A',
        videoTitle:
          'Building an E-Commerce Catalog Service with Clean Architecture in C# | Microservices Tutorial',
      },
    ],
  },
];
