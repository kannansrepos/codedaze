import { BlogPost } from './types/BlogPost';
import { Language } from './types/Language';

export const DUMMY_DATA: BlogPost[] = [
  {
    id: 'dotnet-9-hybrid-cache',
    language: Language.dotnet,
    shortTitle: 'Caching in .NET 9',
    title: 'HybridCache in ASP.NET Core - New Caching Library',
    description:
      'Caching is essential for building fast, scalable applications. ASP.NET Core has traditionally offered two caching options: in-memory caching and distributed caching. Each has its trade-offs. In-memory caching using IMemoryCache is fast but limited to a single server. Distributed caching with IDistributedCache works across multiple servers using a backplane.',
    category: 'Caching',
    date: new Date('2024-11-22'),
    readMin: 5,
    section: [
      {
        title: 'What is HybridCache?',
        content:
          '<p>The traditional caching options in ASP.NET Core have limitations. In-memory caching is fast but limited to one server. Distributed caching works across servers but is slower.</p><p>HybridCache is a new caching library in ASP.NET Core 9 that combines the best of both worlds. It provides a fast, scalable caching solution that works across multiple servers.</p> <ol><li>Two-level caching (L1/L2)</li><li>In-memory caching (L1)</li><li>Distributed caching (L2)</li></ol>',
      },
      {
        title: 'How to Use HybridCache',
        content:
          '<p>To use HybridCache, you need to configure it in your application. Here is an example of how to configure HybridCache in your ASP.NET Core application:</p>',
        code: 'services.AddHybridCache(options => { options.UseInMemoryCache(); options.UseDistributedCache(); });',
        video: {
          url: 'rjMfDUP4-eQ',
          title: 'Introducing HybridCache in ASP.NET Core',
        },
      },
      {
        title: 'Conclusion',
        content:
          '<p>HybridCache is a powerful caching library in ASP.NET Core 9 that combines the best of both in-memory and distributed caching. It provides a fast, scalable caching solution that works across multiple servers.</p>',
        image: '/dotnetnew.png',
        imageAlt: 'HybridCache',
      },
    ],
  },
  {
    id: 'dotnet-9-hybrid-cache_1',
    language: Language.angular,
    shortTitle: 'Caching in .NET 9',
    title: 'HybridCache in ASP.NET Core - New Caching Library',
    description:
      'Caching is essential for building fast, scalable applications. ASP.NET Core has traditionally offered two caching options: in-memory caching and distributed caching. Each has its trade-offs. In-memory caching using IMemoryCache is fast but limited to a single server. Distributed caching with IDistributedCache works across multiple servers using a backplane.',
    category: 'Caching',
    date: new Date('2024-11-22'),
    readMin: 5,
    section: [
      {
        title: 'What is HybridCache?',
        content:
          '<p>The traditional caching options in ASP.NET Core have limitations. In-memory caching is fast but limited to one server. Distributed caching works across servers but is slower.</p><p>HybridCache is a new caching library in ASP.NET Core 9 that combines the best of both worlds. It provides a fast, scalable caching solution that works across multiple servers.</p> <ol><li>Two-level caching (L1/L2)</li><li>In-memory caching (L1)</li><li>Distributed caching (L2)</li></ol>',
      },
      {
        title: 'How to Use HybridCache',
        content:
          '<p>To use HybridCache, you need to configure it in your application. Here is an example of how to configure HybridCache in your ASP.NET Core application:</p>',
        code: '<pre><code>services.AddHybridCache(options => { options.UseInMemoryCache(); options.UseDistributedCache(); });</code></pre>',
        video: {
          url: 'rjMfDUP4-eQ',
          title: 'Introducing HybridCache in ASP.NET Core',
        },
      },
      {
        title: 'Conclusion',
        content:
          '<p>HybridCache is a powerful caching library in ASP.NET Core 9 that combines the best of both in-memory and distributed caching. It provides a fast, scalable caching solution that works across multiple servers.</p>',
        image: '/dotnetnew.png',
        imageAlt: 'HybridCache',
      },
    ],
  },
  {
    id: 'dotnet-9-hybrid-cache_2',
    language: Language.nextjs,
    shortTitle: 'Caching in .NET 9',
    title: 'HybridCache in ASP.NET Core - New Caching Library',
    description:
      'Caching is essential for building fast, scalable applications. ASP.NET Core has traditionally offered two caching options: in-memory caching and distributed caching. Each has its trade-offs. In-memory caching using IMemoryCache is fast but limited to a single server. Distributed caching with IDistributedCache works across multiple servers using a backplane.',
    category: 'Caching',
    date: new Date('2024-11-22'),
    readMin: 5,
    section: [
      {
        title: 'What is HybridCache?',
        content:
          '<p>The traditional caching options in ASP.NET Core have limitations. In-memory caching is fast but limited to one server. Distributed caching works across servers but is slower.</p><p>HybridCache is a new caching library in ASP.NET Core 9 that combines the best of both worlds. It provides a fast, scalable caching solution that works across multiple servers.</p> <ol><li>Two-level caching (L1/L2)</li><li>In-memory caching (L1)</li><li>Distributed caching (L2)</li></ol>',
      },
      {
        title: 'How to Use HybridCache',
        content:
          '<p>To use HybridCache, you need to configure it in your application. Here is an example of how to configure HybridCache in your ASP.NET Core application:</p>',
        code: '<pre><code>services.AddHybridCache(options => { options.UseInMemoryCache(); options.UseDistributedCache(); });</code></pre>',
        video: {
          url: 'rjMfDUP4-eQ',
          title: 'Introducing HybridCache in ASP.NET Core',
        },
      },
      {
        title: 'Conclusion',
        content:
          '<p>HybridCache is a powerful caching library in ASP.NET Core 9 that combines the best of both in-memory and distributed caching. It provides a fast, scalable caching solution that works across multiple servers.</p>',
        image: '/dotnetnew.png',
        imageAlt: 'HybridCache',
      },
    ],
  },
  {
    id: 'dotnet-9-hybrid-cache_3',
    language: Language.react,
    shortTitle: 'Caching in .NET 9',
    title: 'HybridCache in ASP.NET Core - New Caching Library',
    description:
      'Caching is essential for building fast, scalable applications. ASP.NET Core has traditionally offered two caching options: in-memory caching and distributed caching. Each has its trade-offs. In-memory caching using IMemoryCache is fast but limited to a single server. Distributed caching with IDistributedCache works across multiple servers using a backplane.',
    category: 'Caching',
    date: new Date('2024-11-22'),
    readMin: 5,
    section: [
      {
        title: 'What is HybridCache?',
        content:
          '<p>The traditional caching options in ASP.NET Core have limitations. In-memory caching is fast but limited to one server. Distributed caching works across servers but is slower.</p><p>HybridCache is a new caching library in ASP.NET Core 9 that combines the best of both worlds. It provides a fast, scalable caching solution that works across multiple servers.</p> <ol><li>Two-level caching (L1/L2)</li><li>In-memory caching (L1)</li><li>Distributed caching (L2)</li></ol>',
      },
      {
        title: 'How to Use HybridCache',
        content:
          '<p>To use HybridCache, you need to configure it in your application. Here is an example of how to configure HybridCache in your ASP.NET Core application:</p>',
        code: '<pre><code>services.AddHybridCache(options => { options.UseInMemoryCache(); options.UseDistributedCache(); });</code></pre>',
        video: {
          url: 'rjMfDUP4-eQ',
          title: 'Introducing HybridCache in ASP.NET Core',
        },
      },
      {
        title: 'Conclusion',
        content:
          '<p>HybridCache is a powerful caching library in ASP.NET Core 9 that combines the best of both in-memory and distributed caching. It provides a fast, scalable caching solution that works across multiple servers.</p>',
        image: '/dotnetnew.png',
        imageAlt: 'HybridCache',
      },
    ],
  },
  {
    id: 'dotnet-9-hybrid-cache_4',
    language: Language.docker,
    shortTitle: 'Caching in .NET 9',
    title: 'HybridCache in ASP.NET Core - New Caching Library',
    description:
      'Caching is essential for building fast, scalable applications. ASP.NET Core has traditionally offered two caching options: in-memory caching and distributed caching. Each has its trade-offs. In-memory caching using IMemoryCache is fast but limited to a single server. Distributed caching with IDistributedCache works across multiple servers using a backplane.',
    category: 'Caching',
    date: new Date('2024-11-22'),
    readMin: 5,
    section: [
      {
        title: 'What is HybridCache?',
        content:
          '<p>The traditional caching options in ASP.NET Core have limitations. In-memory caching is fast but limited to one server. Distributed caching works across servers but is slower.</p><p>HybridCache is a new caching library in ASP.NET Core 9 that combines the best of both worlds. It provides a fast, scalable caching solution that works across multiple servers.</p> <ol><li>Two-level caching (L1/L2)</li><li>In-memory caching (L1)</li><li>Distributed caching (L2)</li></ol>',
      },
      {
        title: 'How to Use HybridCache',
        content:
          '<p>To use HybridCache, you need to configure it in your application. Here is an example of how to configure HybridCache in your ASP.NET Core application:</p>',
        code: '<pre><code>services.AddHybridCache(options => { options.UseInMemoryCache(); options.UseDistributedCache(); });</code></pre>',
        video: {
          url: 'rjMfDUP4-eQ',
          title: 'Introducing HybridCache in ASP.NET Core',
        },
      },
      {
        title: 'Conclusion',
        content:
          '<p>HybridCache is a powerful caching library in ASP.NET Core 9 that combines the best of both in-memory and distributed caching. It provides a fast, scalable caching solution that works across multiple servers.</p>',
        image: '/dotnetnew.png',
        imageAlt: 'HybridCache',
      },
    ],
  },
  {
    id: 'dotnet-9-hybrid-cache_5',
    language: Language.react,
    shortTitle: 'Caching in .NET 9',
    title: 'HybridCache in ASP.NET Core - New Caching Library',
    description:
      'Caching is essential for building fast, scalable applications. ASP.NET Core has traditionally offered two caching options: in-memory caching and distributed caching. Each has its trade-offs. In-memory caching using IMemoryCache is fast but limited to a single server. Distributed caching with IDistributedCache works across multiple servers using a backplane.',
    category: 'Caching',
    date: new Date('2024-11-22'),
    readMin: 5,
    section: [
      {
        title: 'What is HybridCache?',
        content:
          '<p>The traditional caching options in ASP.NET Core have limitations. In-memory caching is fast but limited to one server. Distributed caching works across servers but is slower.</p><p>HybridCache is a new caching library in ASP.NET Core 9 that combines the best of both worlds. It provides a fast, scalable caching solution that works across multiple servers.</p> <ol><li>Two-level caching (L1/L2)</li><li>In-memory caching (L1)</li><li>Distributed caching (L2)</li></ol>',
      },
      {
        title: 'How to Use HybridCache',
        content:
          '<p>To use HybridCache, you need to configure it in your application. Here is an example of how to configure HybridCache in your ASP.NET Core application:</p>',
        code: '<pre><code>services.AddHybridCache(options => { options.UseInMemoryCache(); options.UseDistributedCache(); });</code></pre>',
        video: {
          url: 'rjMfDUP4-eQ',
          title: 'Introducing HybridCache in ASP.NET Core',
        },
      },
      {
        title: 'Conclusion',
        content:
          '<p>HybridCache is a powerful caching library in ASP.NET Core 9 that combines the best of both in-memory and distributed caching. It provides a fast, scalable caching solution that works across multiple servers.</p>',
        image: '/dotnetnew.png',
        imageAlt: 'HybridCache',
      },
    ],
  },
  {
    id: 'dotnet-9-hybrid-cache_6',
    language: Language.nextjs,
    shortTitle: 'Caching in .NET 9',
    title: 'HybridCache in ASP.NET Core - New Caching Library',
    description:
      'Caching is essential for building fast, scalable applications. ASP.NET Core has traditionally offered two caching options: in-memory caching and distributed caching. Each has its trade-offs. In-memory caching using IMemoryCache is fast but limited to a single server. Distributed caching with IDistributedCache works across multiple servers using a backplane.',
    category: 'Caching',
    date: new Date('2024-11-22'),
    readMin: 5,
    section: [
      {
        title: 'What is HybridCache?',
        content:
          '<p>The traditional caching options in ASP.NET Core have limitations. In-memory caching is fast but limited to one server. Distributed caching works across servers but is slower.</p><p>HybridCache is a new caching library in ASP.NET Core 9 that combines the best of both worlds. It provides a fast, scalable caching solution that works across multiple servers.</p> <ol><li>Two-level caching (L1/L2)</li><li>In-memory caching (L1)</li><li>Distributed caching (L2)</li></ol>',
      },
      {
        title: 'How to Use HybridCache',
        content:
          '<p>To use HybridCache, you need to configure it in your application. Here is an example of how to configure HybridCache in your ASP.NET Core application:</p>',
        code: '<pre><code>services.AddHybridCache(options => { options.UseInMemoryCache(); options.UseDistributedCache(); });</code></pre>',
        video: {
          url: 'rjMfDUP4-eQ',
          title: 'Introducing HybridCache in ASP.NET Core',
        },
      },
      {
        title: 'Conclusion',
        content:
          '<p>HybridCache is a powerful caching library in ASP.NET Core 9 that combines the best of both in-memory and distributed caching. It provides a fast, scalable caching solution that works across multiple servers.</p>',
        image: '/dotnetnew.png',
        imageAlt: 'HybridCache',
      },
    ],
  },
  {
    id: 'dotnet-9-hybrid-cache_7',
    language: Language.angular,
    shortTitle: 'Caching in .NET 9',
    title: 'HybridCache in ASP.NET Core - New Caching Library',
    description:
      'Caching is essential for building fast, scalable applications. ASP.NET Core has traditionally offered two caching options: in-memory caching and distributed caching. Each has its trade-offs. In-memory caching using IMemoryCache is fast but limited to a single server. Distributed caching with IDistributedCache works across multiple servers using a backplane.',
    category: 'Caching',
    date: new Date('2024-11-22'),
    readMin: 5,
    section: [
      {
        title: 'What is HybridCache?',
        content:
          '<p>The traditional caching options in ASP.NET Core have limitations. In-memory caching is fast but limited to one server. Distributed caching works across servers but is slower.</p><p>HybridCache is a new caching library in ASP.NET Core 9 that combines the best of both worlds. It provides a fast, scalable caching solution that works across multiple servers.</p> <ol><li>Two-level caching (L1/L2)</li><li>In-memory caching (L1)</li><li>Distributed caching (L2)</li></ol>',
      },
      {
        title: 'How to Use HybridCache',
        content:
          '<p>To use HybridCache, you need to configure it in your application. Here is an example of how to configure HybridCache in your ASP.NET Core application:</p>',
        code: '<pre><code>services.AddHybridCache(options => { options.UseInMemoryCache(); options.UseDistributedCache(); });</code></pre>',
        video: {
          url: 'rjMfDUP4-eQ',
          title: 'Introducing HybridCache in ASP.NET Core',
        },
      },
      {
        title: 'Conclusion',
        content:
          '<p>HybridCache is a powerful caching library in ASP.NET Core 9 that combines the best of both in-memory and distributed caching. It provides a fast, scalable caching solution that works across multiple servers.</p>',
        image: '/dotnetnew.png',
        imageAlt: 'HybridCache',
      },
    ],
  },
];
