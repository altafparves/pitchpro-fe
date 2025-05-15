"use client";
import { useRef, useState, useEffect } from "react";
import IconPlay from "../../../public/assets/icons/ic_play";
import IconSkip from "../../../public/assets/icons/ic_skip";
import IconPause from "../../../public/assets/icons/ic_pause";
import { motion } from "framer-motion";

export default function LocalVideoPlayer({ videoSrc, onEnded, onPlay, onProgress, progressFinal }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    const interacted = sessionStorage.getItem("userInteracted") === "true";
    setHasUserInteracted(interacted);

    const video = videoRef.current;
    if (!video) return;

    const handleVideoPlay = () => {
      setIsPlaying(true);
      onPlay?.();
    };

    const handleVideoEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const updateProgress = () => {
      if (video && onProgress) {
        const progress = (video.currentTime / video.duration) * progressFinal;
        onProgress(progress);
      }
    };

    const handleCanPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay blocked by browser:", err);
        });
      }
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("play", handleVideoPlay);
    video.addEventListener("ended", handleVideoEnded);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("play", handleVideoPlay);
      video.removeEventListener("ended", handleVideoEnded);
    };
  }, [videoSrc, onEnded, onPlay, onProgress, progressFinal]);

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
    <motion.div initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }} transition={{ type: "tween", duration: 0.4 }}>
      <div className="relative w-full h-screen bg-black">
        <video
          ref={videoRef}
          autoPlay
          muted={!hasUserInteracted} // Only mute if no interaction
          controls={false}
          preload="auto"
          loop={false}
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
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
    </motion.div>
  );
}
