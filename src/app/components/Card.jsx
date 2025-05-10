import PropTypes from "prop-types";
export  function Card({ children, borderColor="border-[#A6A6A6]", padding = "p-6", className = "",title }) {
  return (
    <>
      <div className={`w-full rounded-[24] ${padding}  border-2 ${borderColor} p-6 ${className}`}>
        {title && <p className="text-neutral-900 text-title font-semibold">{title}</p>}
        {children}
      </div>
    </>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  padding: PropTypes.string,
  borderColor: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};


export  function CardFilled({children}){
  return(
    <>
    <div className="flex w-full p-3 rounded-2xl flex-col bg-[#E5F2FF] shadow-[0px_4px_0px_0px_#ADD5FF]">{children}</div></>
  )
}