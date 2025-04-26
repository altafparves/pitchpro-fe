import IcCheck from "../../../public/assets/icons/ic_check";
export default function StoryButton({ children, className }) {
  return (
    <button
      className={`w-[80px] h-[80px] shadow-[0px_2px_0px_0px_#85BFFF] rounded-3xl flex items-center justify-center ${className}`}
    >
      {children}
    </button>
  );
}
