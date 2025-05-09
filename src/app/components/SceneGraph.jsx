import SceneButton from "./Buttons/SceneButton";
import IcArrow from "../../../public/assets/icons/ic_arrow";
import { useRouter, usePathname } from "next/navigation";
import IcGraph from "../../../public/assets/icons/ic_graph";
import IcMic from "../../../public/assets/icons/ic_mic";
const sceneData = [
  { id: 1, label: "1", type: "cutscene", status: "unlocked", x: 0, y: 1 },
  { id: 2, label: "2", type: "click", status: "unlocked", x: 1, y: 1 },
  { id: 3, label: "2A", type: "cutscene", status: "locked", x: 2, y: 1 },
  { id: 4, label: "2A1", type: "checkpoint", status: "locked", x: 3, y: 1 },
  { id: 5, label: "2A1A", type: "cutscene", status: "locked", x: 4, y: 1 },
  { id: 6, label: "2A1B", type: "cutscene", status: "locked", x: 3, y: 1.8 },
  { id: 7, label: "2A2", type: "cutscene", status: "locked", x: 5, y: 1 },
  { id: 8, label: "2A3", type: "cutscene", status: "locked", x: 6, y: 1 },
  { id: 9, label: "2A4", type: "cutscene", status: "locked", x: 7, y: 1 },
  { id: 10, label: "2A5", type: "cutscene", status: "locked", x: 8, y: 1 },
  { id: 11, label: "2A73", type: "cutscene", status: "locked", x: 9, y: 1 },
  { id: 12, label: "2B", type: "cutscene", status: "locked", x: 3, y: 2.4 },
  { id: 13, label: "2A61", type: "cutscene", status: "locked", x: 4, y: 2.4 },
  { id: 14, label: "2A62", type: "cutscene", status: "locked", x: 5, y: 2.4 },
  { id: 15, label: "2A63", type: "cutscene", status: "locked", x: 6, y: 2.4 },
  { id: 16, label: "2A7-3", type: "checkpoint", status: "locked", x: 10, y: 1 },
  { id: 17, label: "2A74", type: "cutscene", status: "locked", x: 9, y: 1.8 },
  { id: 18, label: "2A7-4", type: "checkpoint", status: "locked", x: 10, y: 1.8 },
  { id: 19, label: "2A75", type: "cutscene", status: "locked", x: 9, y: 2.6 },
  { id: 20, label: "2A7-5", type: "checkpoint", status: "locked", x: 10, y: 2.6 },
  { id: 21, label: "2A8", type: "cutscene", status: "locked", x: 11, y: 2.6 },
  { id: 22, label: "3", type: "cutscene", status: "locked", x: 12, y: 2.6 },
  { id: 23, label: "3.1", type: "cutscene", status: "locked", x: 13, y: 2.6 },
  { id: 24, label: "3.2", type: "cutscene", status: "locked", x: 14, y: 2.6 },
  { id: 25, label: "3.3", type: "checkpoint", status: "locked", x: 15, y: 2.6 },

  // { id: 5, type: "cutscene", status: "locked", x: 2, y: 2 },
  // { id: 6, type: "cutscene", status: "locked", x: 3, y: 1 },
  // { id: 7, type: "cutscene", status: "locked", x: 4, y: 0 },
  // { id: 8, type: "cutscene", status: "locked", x: 4, y: 2 },
  // { id: 9, type: "cutscene", status: "locked", x: 5, y: 2 },
  // { id: 10, type: "end", status: "locked", x: 6, y: 1 },
];
const edges = [
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [4, 6],
  [5, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],
  [4, 12],
  [12, 13],
  [13, 14],
  [14, 15],
  [11, 16],
  [16, 17],
  [11, 17],
  [17, 18],
  [16, 19],
  [17, 19],
  [19, 20],
  [20, 21],
  [21, 22],
  [22, 23],
  [23, 24],
  [24, 25],
  // [11, 12],
  // [4, 5],
  // [5, 6],
  // [6, 9],
  // [5, 7],
  // [7, 8],
  // [8, 9],
];

const cellSize = 120;
function getIcon(type, status) {
  const baseProps = type === "cutscene" ? { width: 12, height: 12 } : { width: 14, height: 15 };
  const color = status === "locked" ? "#A6A6A6" : "#1F6DC2";
  switch (type) {
    case "click":
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
    <div className="relative w-[2000px] h-[400px] rounded-xl overflow-hidden">
      <svg className="absolute w-full h-full z-0" xmlns="http://www.w3.org/2000/svg">
        {edges.map(([fromId, toId], idx) => {
          const from = getNode(fromId);
          const to = getNode(toId);
          const getCenterOffset = (type) => (type === "cutscene" ? 40 : 40);
          const fromOffset = getCenterOffset(from.type);
          const toOffset = getCenterOffset(to.type);
          const fromX = from.x * cellSize + fromOffset;
          const fromY = from.y * cellSize + fromOffset;
          const toX = to.x * cellSize + toOffset;
          const toY = to.y * cellSize + toOffset;
          const midX = (fromX + toX) / 2;
          const midY = (fromY + toY) / 2;
          const pathD = from.x === to.x || from.y === to.y ? `M${fromX},${fromY} L${toX},${toY}` : `M${fromX},${fromY} L${midX},${fromY} L${midX},${toY} L${toX},${toY}`;

          return <path key={idx} d={pathD} stroke="#E0E0E0" strokeWidth={2} strokeDasharray={from.x === to.x ? "4 4" : ""} fill="transparent" />;
        })}
      </svg>

      {/* Nodes */}
      {sceneData.map((node) => (
        <div
          key={node.id}
          className="absolute z-10"
          style={{
            left: `${node.x * cellSize + +(node.type === "cutscene" ? 20 : 0)}px `,
            // top: `${node.y * cellSize}px`,
            top: `${node.y * cellSize + (node.type === "cutscene" ? 20 : 0)}px`,
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
