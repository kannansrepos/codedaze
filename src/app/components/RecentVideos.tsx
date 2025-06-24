const RecentVideos = () => {
  const video = {
    src: 'https://www.youtube.com/embed/xPYDBzfBl1A',
    title:
      'Building an E-Commerce Catalog Service with Clean Architecture in C# | Microservices Tutorial',
  };
  return (
    <div className="flex flex-col gap-2 w-full bg-gradient-to-r from-[#2A42BA] via-[#8142EF] to-[#C521EF] max-h-[700px] py-10 my-5 items-center justify-center">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="text-6xl font-bold text-white">
          🎥 Recent on Youtube
        </div>
        <iframe
          width="850"
          height="450"
          src={video.src}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen={false}
        ></iframe>
      </div>
    </div>
  );
};
export default RecentVideos;
