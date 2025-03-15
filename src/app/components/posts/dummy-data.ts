import { BlogPost } from '../../../types/BlogPost';

export const DUMMY_DATA: BlogPost[] = [
  {
    id: 'dotnet-productivity-boosters-short',
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
        videoUrl: '',
        videoTitle: '',
      },
      {
        title: '1. Leverage Code Generation',
        content:
          "<p>Stop writing repetitive boilerplate code manually! Utilize .NET's built-in scaffolding and code generation tools (like Entity Framework Core). This significantly reduces manual effort and minimizes errors, freeing you to focus on core logic.</p>",
        code: 'dotnet ef dbcontext scaffold "Server=(localdb)\\mssqllocaldb;Database=MyDatabase;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -o Models',
        image: 'https://source.unsplash.com/random/800x600/?code,generation', // Replace with a Pexels image
        imageAlt: 'Code generation in action',
        videoUrl: '',
        videoTitle: '',
      },
      {
        title: '2. Master the Debugger',
        content:
          "<p>Become proficient with Visual Studio's debugger.  Efficiently use breakpoints, step-through debugging, watch windows, and exception handling to quickly pinpoint and resolve issues.  This dramatically reduces troubleshooting time.</p>",
        code: '',
        image:
          'https://source.unsplash.com/random/800x600/?debugging,VisualStudio', // Replace with a Pexels image
        imageAlt: 'Visual Studio Debugger',
        videoUrl: '',
        videoTitle: '',
      },
      {
        title: '3. Embrace NuGet Packages',
        content:
          '<p>Take advantage of the extensive .NET ecosystem and leverage NuGet packages.  Use pre-built libraries and components to avoid redundant coding, speeding up development and improving code quality.  Choose well-maintained and reputable packages.</p>',
        code: 'dotnet add package Microsoft.Extensions.Caching.Memory',
        image: 'https://source.unsplash.com/random/800x600/?NuGet,packages', // Replace with a Pexels image
        imageAlt: 'NuGet Package Manager',
        videoUrl: '',
        videoTitle: '',
      },
      {
        title: '4. Implement Unit Testing',
        content:
          '<p>Write unit tests to catch bugs early and ensure code quality.  Testing saves time in the long run by preventing larger issues down the line. Use frameworks like xUnit, NUnit, or MSTest.</p>',
        code: '[Fact]\npublic void MyTest() {\n  //Test assertions here\n}',
        image: 'https://source.unsplash.com/random/800x600/?unit,testing', // Replace with a Pexels image
        imageAlt: 'Unit Testing Example',
        videoUrl: '',
        videoTitle: '',
      },
      {
        title: '5. Utilize IDE Features Effectively',
        content:
          '<p>Visual Studio offers powerful features to boost productivity.  Master IntelliSense, code refactoring, and keyboard shortcuts to write cleaner code faster and more accurately.  Customize your IDE for optimal efficiency.</p>',
        code: '',
        image:
          'https://source.unsplash.com/random/800x600/?visualstudio,productivity', // Replace with a Pexels image
        imageAlt: 'Visual Studio Productivity Features',
        videoUrl: '',
        videoTitle: '',
      },
      {
        title: 'Conclusion:  Unlock Your Potential',
        content:
          '<p>By implementing these five strategies, you can dramatically improve your .NET development workflow.  Focus on these key areas for significant improvements in efficiency and code quality.</p>',
        code: '',
        image: 'https://source.unsplash.com/random/800x600/?developer,success', // Replace with a Pexels image
        imageAlt: 'Successful Developer',
        videoUrl: '',
        videoTitle: '',
      },
    ],
  },
];
