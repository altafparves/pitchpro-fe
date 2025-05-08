export default function SceneButton({ children, className, onClick }) {
  return (
    <button onClick={onClick} className={`w-[80px] h-[80px] shadow-[0px_2px_0px_0px_#85BFFF] rounded-3xl flex items-center justify-center ${className}`}>
      {children}
    </button>
  );
}
