import { useEffect } from "react";

import { freeDrawInCanvas } from "./canvas-functions";

export default (
  elements,
  setElements,
  canvasMode,
  freeDrawMode,
  canvas,
  element
) => {
  useEffect(() => {
    const { enabled, freeDrawId } = freeDrawMode;

    const freeDrawInCanvasListener = (event) => {
      freeDrawInCanvas(event, canvas, elements, setElements, freeDrawId);
    };

    canvasMode === "free" &&
      enabled === true &&
      canvas.addEventListener("mousemove", freeDrawInCanvasListener);

    canvasMode === "free" &&
      enabled === false &&
      canvas.removeEventListener("mousemove", freeDrawInCanvasListener);

    return () => {
      canvas &&
        canvas.removeEventListener("mousemove", freeDrawInCanvasListener);
    };
  }, [freeDrawMode, setElements, element, elements, canvasMode, canvas]);
};
