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
import { useSceneMetaData } from "@/app/hooks/useSceneMetaData";
import Pretest from "../pre-test/page";

export default function SingleAudioInputGroup
({nodeId}) {
  const scenes = useSceneMetaData();
  const [pretestDone, setPretestDone] = useState(false);
  const [currentStep, setCurrentStep] = useState("first");
  const { nextGroup, goToGroup } = useVideoGroup();
  const [showAction, setShowAction] = useState(false);
  const [loopSecondVideo, setLoopSecondVideo] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressFinal = 75;

  const currentScene = scenes.find((scene) => scene.id === Number(nodeId));
  const status= currentScene?.status;
  const firstId = currentScene?.story_id;
  console.log("this is current scene", currentScene,status);

  const handleVideoEnd = () => {
    if (currentStep === "first") {
      setCurrentStep("second");
      setShowAction(true);
      setProgress({ progressFinal });
    } else if (currentStep === "second" && !showAction) {
      setLoopSecondVideo(true);
    }
  };

  const handleAudioResult = (result) => {
    if (result === true) {
      goToGroup(6);
    } else {
      goToGroup(3);
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

  if (!pretestDone) {
    return <Pretest nodeId={nodeId} currentScene={currentScene} onDone={() => setPretestDone(true)} />;
  }

  return (
    <BasicLayout className="bg-white">
      <TopBar className="bg-transparent h-[90px]">
        <div className="flex  w-full flex-row gap-6 items-center">
          <CancelVidBtn></CancelVidBtn>
          <ProgressBar progress={progress} />
        </div>
      </TopBar>
      {renderVideo()}
      {showAction && <RecordActionPanel nodeId={firstId} onResultReceived={handleAudioResult} />}
    </BasicLayout>
  );
}
