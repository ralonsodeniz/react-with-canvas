import { useEffect } from "react";

import { dragElementInCanvas } from "./canvas-functions";

export default (elements, setElements, canvasMode, dragMode, canvas) => {
  useEffect(() => {
    const { enabled, dragElement } = dragMode;

    const dragElementInCanvasListener = (event) => {
      dragElementInCanvas(event, canvas, elements, dragElement, setElements);
    };

    dragElement &&
      canvasMode === "move" &&
      enabled === true &&
      canvas.addEventListener("mousemove", dragElementInCanvasListener);

    dragElement &&
      canvasMode === "move" &&
      enabled === false &&
      canvas.removeEventListener("mousemove", dragElementInCanvasListener);

    return () => {
      canvas &&
        canvas.removeEventListener("mousemove", dragElementInCanvasListener);
    };
  }, [canvas, canvasMode, dragMode, elements, setElements]);
};
