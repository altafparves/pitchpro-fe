export default function Card({ children, padding = "p-6" }) {
  return (
    <>
      <div className={`w-full rounded-[24] ${padding}  border-2 border-[#A6A6A6] p-6 `}>{children}</div>
    </>
  );
}