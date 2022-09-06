const Seperator = ({
  className = "",
  color = `bg-foundations-purple-shades-80`,
}) => {
  return <div className={` h-1 min-h-1 w-full ${className} ${color}`}></div>;
};
export default Seperator;
