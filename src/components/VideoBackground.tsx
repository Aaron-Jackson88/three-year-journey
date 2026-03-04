const VideoBackground = () => {
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center bg-foreground/90">
      {/* Replace the src with your actual vertical video file */}
      <video
        className="h-full w-auto min-h-screen object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/placeholder.svg"
      >
        {/* <source src="/your-video.mp4" type="video/mp4" /> */}
      </video>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-foreground/50" />
    </div>
  );
};

export default VideoBackground;
