"use client";
import { useVideoGroup, VideoGroupProvider } from "@/app/context/VideoGroupContext";
import ClickGroup from "@/app/components/VideoGroup/ClickGroup";
import CutSceneGroup from "@/app/components/VideoGroup/CutSceneGroup";

function GamePageContent() {
  const { currentGroup } = useVideoGroup();

  const renderGroup = () => {
    switch (currentGroup) {
      case 1:
        return <ClickGroup />;
      case 2:
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
