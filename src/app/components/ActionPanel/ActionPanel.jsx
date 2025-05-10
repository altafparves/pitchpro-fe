import Button from "../Button";
import Line from "../Line";
import SlideUpAnimation from "@/app/animation/SlideUpAnimation";

// export default function ActionPanel({ onAction }) {
//   const handleClick = () => {
//     if (onAction) onAction();
//   };

//   return (
//     <SlideUpAnimation className="flex bottom-0 fixed rounded-t-[20px] bg-neutral-50 flex-col w-full px-5 pt-6 h-auto pb-12">
//       <p className="text-title pb-5 text-neutral-800 font-semibold">What do you want?</p>
//       <div className="buttons flex flex-col w-full gap-6 justify-center">
//         <Button variant="info" className="font-[500]" onClick={handleClick}>
//           Practice With Friend
//         </Button>
//         <Button variant="info" className="font-[500]" onClick={handleClick}>
//           Practice With Myself
//         </Button>
//         <Line />
//         <Button onClick={handleClick}>Next</Button>
//       </div>
//     </SlideUpAnimation>
//   );
// }

export default function ActionPanel({ onAction }) {
  const handleClick = (type) => {
    if (onAction) onAction(type);
  };

  return (
    <SlideUpAnimation className="flex bottom-0 fixed rounded-t-[20px] bg-neutral-50 flex-col w-full px-5 pt-6 h-auto pb-12">
      <p className="text-title pb-5 text-neutral-800 font-semibold">What do you want?</p>
      <div className="buttons flex flex-col w-full gap-6 justify-center">
        <Button variant="info" className="font-[500]" onClick={() => handleClick("friend")}>
          Practice With Friend
        </Button>
        <Button variant="info" className="font-[500]" onClick={() => handleClick("myself")}>
          Practice With Myself
        </Button>
        <Line />
        <Button onClick={() => handleClick("next")}>Next</Button>
      </div>
    </SlideUpAnimation>
  );
}
