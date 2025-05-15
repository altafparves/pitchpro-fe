"use client";
import { useState } from "react";
import BasicLayout from "@/app/components/BasicLayout";
import LocalVideoPlayer from "@/app/components/LocalVideoPlayer";
import LoopingVideoPlayer from "../LoopingVideoPlayer";
import TopBar from "../bar/TopBar";
import CancelVidBtn from "../Buttons/CancelVidBtn";
import ProgressBar from "../ProgressBar";
import { useVideoGroup } from "@/app/context/VideoGroupContext";
import RecordActionPanel from "../ActionPanel/RecordActionPanel";
export default function MultipleAudioInputGroup({}) {
  const [currentStep, setCurrentStep] = useState("first");
  const { nextGroup, goToGroup } = useVideoGroup();
  const [showAction, setShowAction] = useState(false);
  const [loopSecondVideo, setLoopSecondVideo] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressFinal = 75;
  const handleVideoEnd = () => {
    if (currentStep === "first") {
      setCurrentStep("second");
      setShowAction(true);
      setProgress({ progressFinal });
    } else if (currentStep === "second" && !showAction) {
      setLoopSecondVideo(true);
    }
  };

  const handleAction = (actionType) => {
    setLoopSecondVideo(false);
    sessionStorage.setItem("userInteracted", "true");
    if (actionType === "myself") {
      goToGroup(2);
    } else if (actionType === "friend") {
      goToGroup(3);
    } else {
      nextGroup();
    }
  };

  const renderVideo = () => {
    if (currentStep === "first") {
      return <LocalVideoPlayer key="first-video" videoSrc="https://storage.cloud.google.com/assets-pitchpro/(2.A)Teman(CS).mp4" onProgress={setProgress} onEnded={handleVideoEnd} progressFinal={progressFinal} />;
    }

    if (loopSecondVideo) {
      return <LoopingVideoPlayer key="looping-second-video" videoSrc="https://storage.cloud.google.com/assets-pitchpro/(2.A.1)Persuasive(AUDIO).mp4" />;
    }

    return <LoopingVideoPlayer key="looping-second-video" videoSrc="https://storage.cloud.google.com/assets-pitchpro/(2.A.1)Persuasive(AUDIO).mp4" />;
  };

  return (
    <BasicLayout className="bg-white">
      <TopBar className="bg-transparent h-[90px]">
        <div className="flex  w-full flex-row gap-6 items-center">
          <CancelVidBtn></CancelVidBtn>
          <ProgressBar progress={progress} />
        </div>
      </TopBar>
      {renderVideo()}
      {showAction && <RecordActionPanel/>}
    </BasicLayout>
  );
}
