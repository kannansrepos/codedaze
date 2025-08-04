const RecentVideos = () => {
  const video = {
    src: 'https://www.youtube.com/embed/mM5icOG7sxI',
    title: 'Build an AI App with Semantic Kernel in C# | Step-by-Step Tutorial',
  };
  return (
    <div className="flex flex-col gap-2 w-full bg-gradient-to-r from-[#2A42BA] via-[#8142EF] to-[#C521EF] max-h-[750px] py-10 my-5 items-center justify-center">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
          🎥 Recent on Youtube
        </div>
        <iframe
          width="850"
          height="550"
          src={video.src}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen={false}
          className="rounded-lg shadow-lg h-72 w-[350px] md:h[450px] md:w-[550px] lg:w-[850px]"
        ></iframe>
      </div>
    </div>
  );
};
export default RecentVideos;
