"use client";
import { useState } from "react";
import BasicLayout from "@/app/components/BasicLayout";
import LocalVideoPlayer from "@/app/components/LocalVideoPlayer";
import ActionPanel from "@/app/components/ActionPanel/ActionPanel";
import TopBar from "../bar/TopBar";
import CancelVidBtn from "../Buttons/CancelVidBtn";
import ProgressBar from "../ProgressBar";
import LoopingCutScene from "../LoopingCutScene";
import { useVideoGroup } from "@/app/context/VideoGroupContext";
export default function ClickGroup({  }) {
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
      setProgress({progressFinal});
    } else if (currentStep === "second" && !showAction) {
      setLoopSecondVideo(true);
    }
  };

  const handleAction = (actionType) => {
    setLoopSecondVideo(false);
    sessionStorage.setItem("userInteracted", "true");
    if (actionType === "myself") {
      goToGroup(4);
    } else if (actionType === "friend") {
      goToGroup(2);
    } else {
      nextGroup();
    }
  };
  

  const renderVideo = () => {
    if (currentStep === "first") {
      return <LocalVideoPlayer key="first-video" videoSrc="https://storage.cloud.google.com/assets-pitchpro/(1)Pilih%20belajar(CS).mp4" onProgress={setProgress} onEnded={handleVideoEnd} progressFinal={progressFinal} />;
    }

    if (loopSecondVideo) {
      return <LoopingCutScene key="looping-second-video" videoSrc="https://storage.cloud.google.com/assets-pitchpro/(2)StudyWith(CLICK).mp4" />;
    }

    return <LoopingCutScene key="looping-second-video" videoSrc="https://storage.cloud.google.com/assets-pitchpro/(2)StudyWith(CLICK).mp4" />;
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
      {showAction && <ActionPanel onAction={handleAction} />}
    </BasicLayout>
  );
}

