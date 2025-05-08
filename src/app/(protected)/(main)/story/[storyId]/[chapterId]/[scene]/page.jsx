'use client';
import BasicLayout from "@/app/components/BasicLayout";
import LocalVideoPlayer from "@/app/components/LocalVideoPlayer";
import RecordActionPanel from "@/app/components/ActionPanel/RecordActionPanel";
import ActionPanel from "@/app/components/ActionPanel/ActionPanel";
export default function GamePage() {
  return (
    <>
      <BasicLayout className="bg-primary-300">
        <LocalVideoPlayer autoPauseAt="0:10" />
        {/* <ActionPanel></ActionPanel> */}
        <RecordActionPanel></RecordActionPanel>
      </BasicLayout>
    </>
  );
}
