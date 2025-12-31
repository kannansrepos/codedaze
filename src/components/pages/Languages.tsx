import Image from 'next/image';

const Languages = () => {
  const images = [
    { name: 'Azure', file: 'azure.png' },
    { name: 'C#', file: 'c-sharp.png' },
    { name: 'Dotnet', file: 'dotnet.png' },
    { name: 'AI', file: 'ai.png' },
    { name: 'SQL Server', file: 'sql-server.png' },
    { name: 'Angular', file: 'angular.png' },
    { name: 'PostgreSQL', file: 'postgresql.png' },
    { name: 'React', file: 'react.png' },
  ];
  return (
    <div className="w-full py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white/[0.07] backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-10 md:p-14 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          {/* Animated Background Glow */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary/20 rounded-full blur-[100px] opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-24">
            {images.map((image, index) => (
              <div
                key={index}
                className="transition-all duration-500 hover:scale-125 hover:brightness-125 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] opacity-85 hover:opacity-100"
              >
                <Image
                  src={`/images/${image.file}`}
                  alt={image.name}
                  width={100}
                  height={100}
                  className="h-10 w-10 md:h-14 md:w-14 lg:h-20 lg:w-20 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Languages;
