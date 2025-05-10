import PropTypes from "prop-types";
import { useSelectedNode } from "@/app/context/SelectedNodeContext";
import Button from "./Button";
import { useRouter } from "next/navigation";
export default function PopupInfo({ title, desc, children }) {
  const router = useRouter();
  const { selectedNode } = useSelectedNode();
  console.log("PopupInfo: selectedNode =", selectedNode);
  // If there's a selectedNode and it has a 'tema', use that as desc
  const description = selectedNode?.tema || desc;
  const isSelectedNodeNotEmpty = selectedNode && Object.keys(selectedNode).length > 0;

  //  Get user from localStorage
  const storedUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;
  const userId = storedUser?.id || storedUser?.user_id || "guest";

  // Check pretest status
  const hasDonePretest = typeof window !== "undefined" && localStorage.getItem(`pretest_done_${userId}`) === "true";

  // const handlePlayClick = () => {
  //   if (!hasDonePretest) {
  //     window.location.href = "/pre-test";
  //   } else {
  //     console.log("Start playing story:", selectedNode);
  //     // Optionally: navigate or play story
  //   }
  // };
  const handlePlayClick = () => {
    console.log("Play button clicked");
    if (selectedNode?.type === "checkpoint") {
      if (!hasDonePretest) {
        window.location.href = `/pre-test?id=${selectedNode?.id}`;
      } else {
        console.log("Checkpoint node clicked, but pretest already done:", selectedNode);
      }
    } else {
      router.push(`${window.location.pathname}/scene`);

    }
  };
  

  return (
    <div className="w-full absolute px-3 top-[94px] left-0 right-0">
      <div
        className="w-full rounded-3xl bg-[#EBF4FF] py-4 px-3 flex-col items-start justify-start gap-1"
        style={{
          boxShadow: "0px 4px 0px 0px #ADD5FF",
        }}
      >
        <p className="text-body font-semibold text-neutral-900">{title}</p>
        <p className="text-label font-normal text-neutral-900 pb-3">{description}</p>
        {isSelectedNodeNotEmpty && (
          <div>
            <Button onClick={handlePlayClick} className="py-1.2">
              Play
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

PopupInfo.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  children: PropTypes.node,
};
