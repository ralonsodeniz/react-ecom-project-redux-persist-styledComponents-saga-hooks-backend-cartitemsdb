import React, { useRef, useEffect } from "react";

const OnClickOutside = ({ children, action, enabled }) => {
  const wrapperRef = useRef(null);

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      if (action !== undefined) {
        action();
      }
    }
  };

  useEffect(() => {
    if (enabled) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }
  });

  return <div ref={wrapperRef}>{children}</div>;
};

export default OnClickOutside;
