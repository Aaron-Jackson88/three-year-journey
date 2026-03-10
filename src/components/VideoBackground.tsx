const VideoBackground = () => {
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center bg-black overflow-hidden">
      <video
        className="h-full w-full object-cover grayscale opacity-30 brightness-90"
        style={{ transform: "translateZ(0)" }} // Force hardware acceleration
        autoPlay
        loop
        muted
        playsInline
        poster="/placeholder.svg"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay for contrast instead of expensive blur */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
};

export default VideoBackground;
