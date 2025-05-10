"use client";
import { useVideoGroup, VideoGroupProvider } from "@/app/context/VideoGroupContext";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ClickGroup from "@/app/components/VideoGroup/ClickGroup";
import CutSceneGroup from "@/app/components/VideoGroup/CutSceneGroup";
import AudioInputGroup from "@/app/components/VideoGroup/AudioInputGroup";
function GamePageContent() {
  const searchParams = useSearchParams();
  const nodeId = parseInt(searchParams.get("id")); 
  const { currentGroup, setCurrentGroup } = useVideoGroup();
  useEffect(() => {
    if (nodeId) {
      setCurrentGroup(nodeId); // set currentGroup dynamically
    }
  }, [nodeId]);
  const renderGroup = () => {
    switch (currentGroup) {
      case 1:
        return <ClickGroup />;
      case 2:
        return <AudioInputGroup />;
      case 3:
        return <CutSceneGroup />;
      case 4:
        return <CutSceneGroup />;
      case 5:
        return <CutSceneGroup />;
      case 3:
        return <CutSceneGroup />;
      case 7:
        return <CutSceneGroup />;
      case 8:
        return <CutSceneGroup />;
      case 9:
        return <AudioInputGroup />;
      case 10:
        return <CutSceneGroup />;
      case 11:
        return <AudioInputGroup />;
      case 12:
        return <CutSceneGroup />;

      default:
        return <div>Game Complete</div>;
    }
  };

  return <main className="bg-white">{renderGroup()}</main>;
}

export default function GamePage() {
  return (
    <VideoGroupProvider>
      <GamePageContent />
    </VideoGroupProvider>
  );
}
