import SceneButton from "./Buttons/SceneButton";
import IcArrow from "../../../public/assets/icons/ic_arrow";
import { useRouter, usePathname } from "next/navigation";
import IcGraph from "../../../public/assets/icons/ic_graph";
import IcMic from "../../../public/assets/icons/ic_mic";
const sceneData = [
  { id: 1, type: "start", status: "unlocked", x: 0, y: 1 },
  { id: 2, type: "checkpoint", status: "unlocked", x: 1, y: 1 },
  { id: 3, type: "cutscene", status: "locked", x: 2, y: 0 },
  { id: 4, type: "cutscene", status: "locked", x: 2, y: 2 },
  { id: 5, type: "cutscene", status: "locked", x: 3, y: 1 },
  { id: 6, type: "cutscene", status: "locked", x: 4, y: 0 },
  { id: 7, type: "cutscene", status: "locked", x: 4, y: 2 },
  { id: 8, type: "cutscene", status: "locked", x: 5, y: 2 },
  { id: 9, type: "end", status: "locked", x: 6, y: 1 },
];

const edges = [
  [1, 2],
  [2, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [5, 6],
  [6, 9],
  [5, 7],
  [7, 8],
  [8, 9],
];

const cellSize = 120;
function getIcon(type, status) {
  const baseProps = type === "cutscene" ? { width: 12, height: 12 } : { width: 14, height: 15 };

  const color = status === "locked" ? "#A6A6A6" : "#1F6DC2";

  switch (type) {
    case "start":
      return <IcGraph {...baseProps} backgroundColor={color} />;
    case "checkpoint":
      return <IcMic {...baseProps} backgroundColor={color} />;
    case "cutscene":
      return <IcArrow {...baseProps} backgroundColor={color} />;
    default:
      return <IcArrow {...baseProps} backgroundColor={color} />;
  }
}

function SceneGraph() {
  const router = useRouter();
  const pathname = usePathname();

  const getNode = (id) => sceneData.find((node) => node.id === id);

  const handleClick = (node) => {
    if (node.status !== "locked") {
      router.push(`${pathname}/${node.id}`);
    }
  };

  return (
    <div className="relative w-[800px] h-[400px] rounded-xl overflow-hidden">
      <svg className="absolute w-full h-full z-0" xmlns="http://www.w3.org/2000/svg">
        {edges.map(([fromId, toId], idx) => {
          const from = getNode(fromId);
          const to = getNode(toId);
          const getCenterOffset = (type) => (type === "cutscene" ? 20 : 40);
          const fromOffset = getCenterOffset(from.type);
          const toOffset = getCenterOffset(to.type);
          const fromX = from.x * cellSize + fromOffset;
          const fromY = from.y * cellSize + fromOffset;
          const toX = to.x * cellSize + toOffset;
          const toY = to.y * cellSize + toOffset;

          const midX = (fromX + toX) / 2;
          const midY = (fromY + toY) / 2;

          const pathD =
            from.x === to.x || from.y === to.y
              ? `M${fromX},${fromY} L${toX},${toY}` // straight line for same row/column
              : `M${fromX},${fromY} L${midX},${fromY} L${midX},${toY} L${toX},${toY}`; // right-angle connector

          return <path key={idx} d={pathD} stroke="#E0E0E0" strokeWidth={2} strokeDasharray={from.x === to.x ? "4 4" : ""} fill="transparent" />;
        })}
      </svg>

      {/* Nodes */}
      {sceneData.map((node) => (
        <div
          key={node.id}
          className="absolute z-10"
          style={{
            left: `${node.x * cellSize}px`,
            top: `${node.y * cellSize}px`,
          }}
        >
          <SceneButton isLocked={node.status === "locked"} type={node.type} onClick={() => handleClick(node)}>
            {getIcon(node.type, node.status)}
          </SceneButton>
        </div>
      ))}
    </div>
  );
}
export default SceneGraph;