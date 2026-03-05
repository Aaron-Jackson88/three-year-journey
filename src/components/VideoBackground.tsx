const VideoBackground = () => {
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center bg-black">
      <video
        className="h-full w-full object-cover grayscale contrast-125 opacity-40"
        autoPlay
        loop
        muted
        playsInline
        poster="/placeholder.svg"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      {/* Subtle overlay to ensure text remains the focus */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
    </div>
  );
};

export default VideoBackground;
