import PropTypes from "prop-types";
import { useSelectedNode } from "@/app/context/SelectedNodeContext";

export default function PopupInfo({ title, desc, children }) {
  const { selectedNode } = useSelectedNode();
  console.log("PopupInfo: selectedNode =", selectedNode);

  // If there's a selectedNode and it has a 'tema', use that as desc
  const description = selectedNode?.tema || desc;

  return (
    <div className="w-full absolute px-3 top-[112px] left-0 right-0">
      <div
        className="w-full rounded-3xl bg-[#EBF4FF] py-4 px-3 flex-col items-start justify-start gap-1"
        style={{
          boxShadow: "0px 4px 0px 0px #ADD5FF",
        }}
      >
        <p className="text-body font-semibold text-neutral-900">{title}</p>
        <p className="text-label font-normal text-neutral-900 pb-3">{description}</p>
        <div>{children}</div>
      </div>
    </div>
  );
}

PopupInfo.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  children: PropTypes.node,
};
