"use client";
import { useState,useEffect } from "react";
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
import PracticeFeedback from "../feedback/PracticeFeedback";
import PostTest from "../PostTest/page";
import PageTransitionWrapper from "@/app/animation/PageTransition";
import { CheckpointProvider } from "@/app/context/CheckpointContext";
export default function SingleAudioInputGroup
({nodeId}) {
  const scenes = useSceneMetaData();
  const [pretestDone, setPretestDone] = useState(false);
  const [AudioInputDone, setAudioInputDone] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [openPosttest, setOpenPosttest] = useState(false);
  const [currentStep, setCurrentStep] = useState("first");
  const { nextGroup, goToGroup } = useVideoGroup();
  const [showAction, setShowAction] = useState(false);
  const [generateResult,setGenerateResult]=useState(null)
  const [loopSecondVideo, setLoopSecondVideo] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressFinal = 75;
  const currentScene = scenes.find((scene) => scene.id === Number(nodeId));
  const firstId = currentScene?.story_id;
  const hasDonePretest = currentScene?.is_pre_test;
  const hasDonePosttest = currentScene?.is_post_test;
  console.log("ini scene saat ini",currentScene);


  const handleVideoEnd = () => {
    if (currentStep === "first") {
      setCurrentStep("second");
      setShowAction(true);
      setProgress({ progressFinal });
    } else if (currentStep === "second" && !showAction) {
      setLoopSecondVideo(true);
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

  // open feedback
  useEffect(() => {
    if (generateResult !== null) {
      setOpenFeedback(true);
    }
  }, [generateResult]);


  if (!pretestDone) {
    return <Pretest nodeId={nodeId} status={hasDonePretest}  currentScene={currentScene} onDone={() => setPretestDone(true)} />;
  }

  if (openFeedback) {
    return (
      <PracticeFeedback
        id={firstId}
        onDone={() => {
          setOpenFeedback(false);
          setOpenPosttest(true);
        }}
      />
    );
  }
  

  if (openPosttest) {
    return (
      <PostTest
        onDone={() => {
          if (generateResult) {
            goToGroup(6);
          } else {
            goToGroup(3);
          }
        }}
        nodeId={nodeId}
        status={hasDonePosttest}
      />
    );
  }

  return (
    <CheckpointProvider story={currentScene?.story}>
      <BasicLayout className="bg-white">
        <TopBar className="bg-transparent h-[90px]">
          <div className="flex  w-full flex-row gap-6 items-center">
            <CancelVidBtn></CancelVidBtn>
            <ProgressBar progress={progress} />
          </div>
        </TopBar>
        {renderVideo()}
        {showAction && <RecordActionPanel nodeId={firstId} generateResult={setGenerateResult} />}
      </BasicLayout>
    </CheckpointProvider>
  );
}
