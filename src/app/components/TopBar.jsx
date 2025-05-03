import PropTypes from "prop-types";

export default function TopBar({ children, bgColor = "bg-neutral-50", className = "" }) {
  return <div className={`${bgColor} top-0 h-[104px] flex items-end justify-between py-2 fixed w-full z-40 px-6 ${className}`}>{children}</div>;
}

TopBar.propTypes = {
  children: PropTypes.node,
  bgColor: PropTypes.string,
  className: PropTypes.string,
};
