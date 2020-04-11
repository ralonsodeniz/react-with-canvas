import { useEffect, useRef } from "react";

export default (
  elements,
  viewportWidth,
  viewportHeight,
  drawFunction,
  svgPaths
) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext("2d");
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach((element) => drawFunction(canvas, element, svgPaths));
  }, [elements, viewportWidth, viewportHeight, drawFunction, svgPaths]);

  return canvasRef;
};
