import { useState, useEffect } from "react";

export default () => {
  const [viewportWidth, setViewportWidth] = useState(null);
  const [viewportHeight, setViewportHeight] = useState(null);

  const updateDeviceArea = () => {
    setViewportWidth(document.documentElement.clientWidth);
    setViewportHeight(document.documentElement.clientHeight);
  };

  useEffect(() => {
    updateDeviceArea();
    window.addEventListener("resize", updateDeviceArea);
    return () => {
      window.removeEventListener("resize", updateDeviceArea);
    };
  }, []);

  return { viewportWidth, viewportHeight };
};
