import { useEffect, useRef } from "react";

import drawFunction from "./drawing-functions";

export default (elements, viewportWidth, viewportHeight) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext("2d");
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach((element) => drawFunction(canvas, element));
  }, [elements, viewportWidth, viewportHeight]);

  return canvasRef;
};
