// 'use client';
// import BasicLayout from "@/app/components/BasicLayout";
// import LocalVideoPlayer from "@/app/components/LocalVideoPlayer";
// import RecordActionPanel from "@/app/components/ActionPanel/RecordActionPanel";
// import ActionPanel from "@/app/components/ActionPanel/ActionPanel";
// export default function GamePage() {
//   return (
//     <>
//       <BasicLayout className="bg-primary-300">
//         <LocalVideoPlayer autoPauseAt="0:10" />
//         {/* <ActionPanel></ActionPanel> */}
//         <RecordActionPanel></RecordActionPanel>
//       </BasicLayout>
//     </>
//   );
// }

"use client";
import { useState } from "react";
import ClickGroup from "@/app/components/VideoGroup/ClickGroup";
export default function GamePage() {
  const [currentGroup, setCurrentGroup] = useState(1);
  const renderGroup = () => {
    switch (currentGroup) {
      case 1:
        return <ClickGroup />;
      // case 2:
      //   return <GroupTwo onComplete={() => setCurrentGroup(3)} />;
      // case 3:
      //   return <GroupThree onComplete={() => setCurrentGroup(4)} />;
      // case 4:
      //   return <GroupFour onComplete={() => console.log("All done")} />;
    }
  };
  return <main className="bg-white">{renderGroup()}</main>;
}
