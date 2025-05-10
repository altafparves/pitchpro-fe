"use client";
import { useVideoGroup, VideoGroupProvider } from "@/app/context/VideoGroupContext";
import ClickGroup from "@/app/components/VideoGroup/ClickGroup";
import CutSceneGroup from "@/app/components/VideoGroup/CutSceneGroup";
import AudioInputGroup from "@/app/components/VideoGroup/AudioInputGroup";
function GamePageContent() {
  const { currentGroup } = useVideoGroup();

  const renderGroup = () => {
    switch (currentGroup) {
      case 1:
        return <ClickGroup />;
      case 2:
        return <CutSceneGroup />;
      case 3:
        return <AudioInputGroup />;
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
