export default function XpChip({children}){
    return (
      <>
        <div className="rounded-full w-fit bg-tertiary-50 py-2 px-3 text-tertiary-700 font-semibold text-title">⭐ {children}</div>
      </>
    );
}