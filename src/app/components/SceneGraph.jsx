import SceneButton from "./Buttons/SceneButton";
import IcCheck from "../../../public/assets/icons/ic_check";
import IcArrow from "../../../public/assets/icons/ic_arrow";
import { useRouter, usePathname } from "next/navigation";

const sceneData = [
  { id: 1, type: "start", status: "completed", x: 0, y: 1 },
  { id: 2, type: "choice", status: "current", x: 1, y: 1 },
  { id: 3, type: "branch", status: "locked", x: 2, y: 0 },
  { id: 4, type: "branch", status: "locked", x: 2, y: 2 },
  { id: 5, type: "merge", status: "locked", x: 3, y: 1 },
  { id: 6, type: "branch", status: "locked", x: 4, y: 0 },
  { id: 7, type: "branch", status: "locked", x: 4, y: 2 },
  { id: 8, type: "merge", status: "locked", x: 5, y: 2 },
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

const nodeColors = {
  completed: "bg-blue-300",
  current: "bg-blue-300",
  locked: "bg-neutral-400",
};

const cellSize = 120;

function getIcon(type) {
  switch (type) {
    case "start":
      return <IcCheck />;
    case "choice":
      return <IcArrow />;
    default:
      return <span className="text-xl">?</span>;
  }
}

// function SceneGraph() {
//   const getNode = (id) => sceneData.find((node) => node.id === id);

//   return (
//     <div className="relative w-[800px] h-[400px] rounded-xl overflow-hidden">
//       {/* SVG Lines */}
//       <svg className="absolute w-full h-full z-0" xmlns="http://www.w3.org/2000/svg">
//         {edges.map(([fromId, toId], idx) => {
//           const from = getNode(fromId);
//           const to = getNode(toId);

//           const fromX = from.x * cellSize + 40;
//           const fromY = from.y * cellSize + 40;
//           const toX = to.x * cellSize + 40;
//           const toY = to.y * cellSize + 40;

//           const isVertical = from.x === to.x;

//           return (
//             <path
//               key={idx}
//               d={isVertical ? `M${fromX},${fromY} L${toX},${toY}` : `M${fromX},${fromY} C${fromX + 40},${fromY} ${toX - 40},${toY} ${toX},${toY}`}
//               stroke="#E0E0E0"
//               strokeWidth={4}
//               strokeDasharray={isVertical ? "4 4" : ""}
//               fill="transparent"
//             />
//           );
//         })}
//       </svg>

//       {/* Nodes with SceneButton */}
//       {sceneData.map((node) => (
//         <div
//           key={node.id}
//           className="absolute z-10"
//           style={{
//             left: `${node.x * cellSize}px`,
//             top: `${node.y * cellSize}px`,
//           }}
//         >
//           <SceneButton className={nodeColors[node.status]}>{getIcon(node.type)}</SceneButton>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default SceneGraph;
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
          const fromX = from.x * cellSize + 40;
          const fromY = from.y * cellSize + 40;
          const toX = to.x * cellSize + 40;
          const toY = to.y * cellSize + 40;
          const isVertical = from.x === to.x;
          return (
            <path
              key={idx}
              d={isVertical ? `M${fromX},${fromY} L${toX},${toY}` : `M${fromX},${fromY} C${fromX + 40},${fromY} ${toX - 40},${toY} ${toX},${toY}`}
              stroke="#E0E0E0"
              strokeWidth={4}
              strokeDasharray={isVertical ? "4 4" : ""}
              fill="transparent"
            />
          );
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
          <SceneButton className={nodeColors[node.status]} onClick={() => handleClick(node)}>
            {getIcon(node.type)}
          </SceneButton>
        </div>
      ))}
    </div>
  );
}
export default SceneGraph;