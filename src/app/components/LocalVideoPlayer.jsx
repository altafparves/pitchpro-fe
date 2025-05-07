"use client";
import { useRef, useState } from "react";
import IconPlay from "../../../public/assets/icons/ic_play";
import IconSkip from "../../../public/assets/icons/ic_skip";
import IconPause from "../../../public/assets/icons/ic_pause";
export default function LocalVideoPlayer({ storyId, chapterId }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleSkip = (seconds) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime += seconds;
    }
  };

  return (
    <div className="relative w-full h-screen bg-black">
      <video ref={videoRef} autoPlay controls={false} preload="auto" className="w-full h-full object-cover" onLoadedMetadata={() => videoRef.current?.play()}>
        <source src="https://storage.cloud.google.com/assets-pitchpro/(1)Pilih%20belajar(CS).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Custom Controls */}
      <div className="absolute bottom-[100px] left-0 right-0 flex justify-center gap-10 items-center">
        <button onClick={() => handleSkip(-10)} className="bg-white/35 backdrop-blur-md hover:bg-white/50 rounded-full px-4 py-6">
          <IconSkip direction="backward" />
        </button>
        <button onClick={handlePlayPause} className="bg-white/35 hover:bg-white/50 rounded-full w-[57px] flex justify-center items-center h-[66px] backdrop-blur-sm">
          {isPlaying ? <IconPause /> : <IconPlay />}
        </button>
        <button onClick={() => handleSkip(10)} className="bg-white/35 backdrop-blur-md hover:bg-white/50 rounded-full px-4 py-6">
          <IconSkip direction="forward" />
        </button>
      </div>
    </div>
  );
}
