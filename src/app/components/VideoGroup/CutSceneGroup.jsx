"use client";
import { useState } from "react";
import BasicLayout from "@/app/components/BasicLayout";
import LocalVideoPlayer from "@/app/components/LocalVideoPlayer";
import TopBar from "../bar/TopBar";
import CancelVidBtn from "../Buttons/CancelVidBtn";
import ProgressBar from "../ProgressBar";

export default function CutSceneGroup({ onComplete }) {
  const videoSources = [
     "https://storage.cloud.google.com/assets-pitchpro/(2.B)Sendiri(CS).mp4",
     "https://storage.cloud.google.com/assets-pitchpro/(2.A.6.1)OpeningExplanation(CS).mp4",
    "https://storage.cloud.google.com/assets-pitchpro/(2.A.6.2)MainExplanation(CS).mp4",
     "https://storage.cloud.google.com/assets-pitchpro/(2.A.6.3)ClosingExplanation(CS).mp4",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressFinal = 100;

  const handleVideoEnd = () => {
    if (currentIndex < videoSources.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      if (onComplete) onComplete();
    }
  };

  return (
    <BasicLayout className="bg-white">
      <TopBar className="bg-transparent h-[90px]">
        <div className="flex w-full flex-row gap-6 items-center">
          <CancelVidBtn />
          <ProgressBar progress={progress} />
        </div>
      </TopBar>

      <LocalVideoPlayer key={`video-${currentIndex}`} videoSrc={videoSources[currentIndex]} onEnded={handleVideoEnd} onProgress={setProgress} progressFinal={progressFinal} />
    </BasicLayout>
  );
}
