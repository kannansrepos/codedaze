import Image from 'next/image';

const Languages = () => {
  const images = [
    'azure.png',
    'c-sharp.png',
    'dotnet.png',
    'ai.png',
    'sql-server.png',
    'angular.png',
    'postgresql.png',
    'react.png',
  ];
  return (
    <div
      className="bg-white w-full h-32
  rounded-lg  shadow-lg p-4"
    >
      <div className="container mx-auto px-10">
        <div className="flex items-center gap-4 justify-between overflow-x-auto ">
          {images.map((image, index) => (
            <Image
              key={index}
              src={`/images/${image}`}
              alt="logo"
              width={90}
              height={90}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Languages;
