import React, { useState } from "react";

import SVG_PATHS from "../../helpers/svg-paths";
import { drawSvg } from "../../helpers/drawing-functions";
import useDeviceArea from "../../helpers/useDeviceArea";
import useLocalStorage from "../../helpers/useLocalStorage";
import useCanvas from "../../helpers/useCanvas";
import useSelectCanvasElement from "../../helpers/useSelectCanvasElement";
import useDragCanvasElement from "../../helpers/useDragCanvasElement";
import {
  addElementToCanvas,
  selectElementFromCanvas,
} from "../../helpers/canvas-functions";

import SvgSelector from "../SvgSelector/SvgSelector";
import CanvasControls from "../CanvasControls/CanvasControls";

import { DrawingArea } from "./Canvas.styles";

const Canvas = () => {
  const [elements, setElements] = useLocalStorage("canvas-info", []);
  const [element, setElement] = useState({
    path: null,
    scale: null,
    svgOffset: null,
    fillColor: "deepskyblue",
    shadowColor: "dodgerblue",
    shadowBlur: 20,
    height: null,
    width: null,
    selected: false,
    id: null,
    location: null,
  });
  const [canvasMode, setCanvasMode] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [dragMode, setDragMode] = useState({
    enabled: false,
    dragElement: null,
  });

  const { viewportWidth, viewportHeight } = useDeviceArea();
  const canvasRef = useCanvas(
    elements,
    viewportWidth,
    viewportHeight,
    drawSvg,
    SVG_PATHS
  );
  const canvas = canvasRef.current;
  const context = canvas && canvas.getContext("2d");

  useSelectCanvasElement(
    elements,
    selectedElement,
    setElements,
    canvasMode,
    setDragMode
  );

  const { enabled, dragElement } = dragMode;

  useDragCanvasElement(
    elements,
    setElements,
    canvasMode,
    enabled,
    dragElement,
    canvas
  );

  const areaModifier = 0.5;

  const handleCanvasClick = (event) => {
    const { clientX, clientY } = event;
    const eventX = clientX - canvas.getBoundingClientRect().left;
    const eventY = clientY - canvas.getBoundingClientRect().top;

    switch (canvasMode) {
      case "draw":
        addElementToCanvas(
          context,
          eventX,
          eventY,
          elements,
          element,
          setElements,
          setSelectedElement
        );
        break;
      case "select":
        selectElementFromCanvas(
          context,
          eventX,
          eventY,
          elements,
          setSelectedElement
        );
        break;
      default:
        break;
    }
  };

  const handleCanvasDragStart = (event) => {
    if (canvasMode !== "move") return;
    const { clientX, clientY } = event;
    const eventX = clientX - canvas.getBoundingClientRect().left;
    const eventY = clientY - canvas.getBoundingClientRect().top;
    const collidedId = selectElementFromCanvas(
      context,
      eventX,
      eventY,
      elements,
      setSelectedElement
    );

    collidedId
      ? setDragMode({ enabled: true, dragElement: collidedId })
      : setDragMode({ enabled: false, dragElement: null });
  };

  const handleCanvasDragEnd = () => {
    if (canvasMode !== "move") return;
    const { enabled } = dragMode;
    enabled && setDragMode({ enabled: false, dragElement: null });
  };

  const handleCanvasClear = () => {
    setElements([]);
  };

  const handleCanvasUndo = () => {
    setElements((prevState) => prevState.slice(0, -1));
  };

  const handleSetCanvasMode = (event) => {
    const { id } = event.target;
    setCanvasMode(id);
  };

  const handleSelectSVG = (event) => {
    const { target } = event;
    const { id } = target;
    if (!id) return;

    const { height, width, x, y } = target.getBBox();

    const { scale, offset, path } = SVG_PATHS[id];
    setElement((prevState) => ({
      ...prevState,
      path,
      scale,
      offset,
      height,
      width,
      svgOffset: { x, y },
    }));
  };

  return (
    <>
      <CanvasControls
        handleCanvasClear={handleCanvasClear}
        handleCanvasUndo={handleCanvasUndo}
        handleSetCanvasMode={handleSetCanvasMode}
        canvasMode={canvasMode}
      />
      <SvgSelector handleSelectSVG={handleSelectSVG} />
      <DrawingArea
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseDown={handleCanvasDragStart}
        onMouseUp={handleCanvasDragEnd}
        width={viewportWidth * areaModifier}
        height={viewportHeight * areaModifier}
      />
    </>
  );
};

export default Canvas;
