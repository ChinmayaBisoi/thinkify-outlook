import { MouseEventHandler } from "react";

const Popup = ({
  children,
  close,
  className = "",
}: {
  className?: string;
  children: JSX.Element;
  close: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      style={{ zIndex: 99999 }}
      onClick={close}
      className={`animate-BG h-screen w-screen flex items-center justify-center bg-background-neutral-black fixed top-0 left-0 ${className}`}
    >
      {children}
    </div>
  );
};

export default Popup;
