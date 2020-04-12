import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import SVG_PATHS from "../../helpers/svg-paths";
import useDeviceArea from "../../helpers/useDeviceArea";
import useLocalStorage from "../../helpers/useLocalStorage";
import useCanvas from "../../helpers/useCanvas";
import useSelectCanvasElement from "../../helpers/useSelectCanvasElement";
import useDragCanvasElement from "../../helpers/useDragCanvasElement";
import useFreeDrawInCanvas from "../../helpers/useFreeDrawInCanvas";

import {
  addSvgElementToCanvas,
  selectElementFromCanvas,
  dragElementInCanvasStart,
} from "../../helpers/canvas-functions";

import SvgSelector from "../SvgSelector/SvgSelector";
import CanvasControls from "../CanvasControls/CanvasControls";

import { DrawingArea } from "./Canvas.styles";

const elementInitialState = {
  fillColor: "deepskyblue",
  shadowColor: "dodgerblue",
  shadowBlur: 20,
  selected: false,
};

const Canvas = () => {
  const [elements, setElements] = useLocalStorage("canvas-info", []);
  const [element, setElement] = useState(elementInitialState);
  const [canvasMode, setCanvasMode] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [dragMode, setDragMode] = useState({
    enabled: false,
    dragElement: null,
  });
  const [undoneElements, setUndoneElements] = useState([]);
  const [freeDrawMode, setFreeDrawMode] = useState({
    enabled: false,
    freeDrawId: null,
  });
  const { viewportWidth, viewportHeight } = useDeviceArea();
  const canvasRef = useCanvas(elements, viewportWidth, viewportHeight);
  const canvas = canvasRef.current;
  const context = canvas && canvas.getContext("2d");

  useSelectCanvasElement(elements, selectedElement, setElements, canvasMode);

  useDragCanvasElement(elements, setElements, canvasMode, dragMode, canvas);

  useFreeDrawInCanvas(
    elements,
    setElements,
    canvasMode,
    freeDrawMode,
    canvas,
    element
  );

  const areaModifier = 0.5;

  const handleCanvasClick = (event) => {
    const { clientX, clientY } = event;
    const eventX = clientX - canvas.getBoundingClientRect().left;
    const eventY = clientY - canvas.getBoundingClientRect().top;

    switch (canvasMode) {
      case "svg":
        addSvgElementToCanvas(
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

  const handleCanvasMouseDown = (event) => {
    const { clientX, clientY } = event;
    const eventX = clientX - canvas.getBoundingClientRect().left;
    const eventY = clientY - canvas.getBoundingClientRect().top;

    switch (canvasMode) {
      case "move":
        dragElementInCanvasStart(
          context,
          eventX,
          eventY,
          setDragMode,
          elements,
          setSelectedElement
        );
        break;
      case "free":
        const id = uuidv4();
        setElements((prevState) => [
          ...prevState,
          {
            ...element,
            path: [{ x: eventX, y: eventY }],
            type: "free",
            id,
          },
        ]);
        setFreeDrawMode({
          enabled: true,
          freeDrawId: id,
        });
        break;
      default:
        break;
    }
  };

  const handleCanvasMouseUp = (event) => {
    switch (canvasMode) {
      case "move":
        const { enabled } = dragMode;
        enabled && setDragMode({ enabled: false, dragElement: null });
        break;
      case "free":
        freeDrawMode &&
          setFreeDrawMode({
            enabled: false,
            freeDrawId: null,
          });
        break;
      default:
        break;
    }
  };

  const handleCanvasClear = () => {
    setSelectedElement(null);
    setUndoneElements((prevState) => [
      ...prevState,
      ...elements.map((element) => ({ ...element, selected: false })),
    ]);
    setElements([]);
  };

  const handleCanvasUndo = () => {
    if (!elements.length) return;
    const undoneElement = elements.slice(elements.length - 1)[0];
    setUndoneElements((prevState) => [
      ...prevState,
      { ...undoneElement, selected: false },
    ]);
    setElements((prevState) => prevState.slice(0, -1));
  };

  const handleCanvasRedo = () => {
    if (!undoneElements.length) return;
    const redoElement = undoneElements.slice(undoneElements.length - 1)[0];
    setElements((prevState) => [...prevState, redoElement]);
    setUndoneElements((prevState) => prevState.slice(0, -1));
  };

  const handleSetCanvasMode = (event) => {
    setElement(elementInitialState);
    const { id } = event.target;
    setCanvasMode(id);
  };

  const handleSelectSVG = (event) => {
    const { target } = event;
    const { id } = target;
    if (!id) return;

    const { height, width, x, y } = target.getBBox();

    const { scale, path } = SVG_PATHS[id];
    setElement((prevState) => ({
      ...prevState,
      path,
      scale,
      height,
      width,
      name: id,
      type: "svg",
      svgOffset: { x, y },
    }));
  };

  const handleDeleteElementFromCanvas = () => {
    if (!selectedElement) return;
    const deletedElement = elements.find(
      (element) => element.id === selectedElement
    );
    setUndoneElements((prevState) => [
      ...prevState,
      { ...deletedElement, selected: false },
    ]);
    const newElements = elements.filter(
      (element) => element.id !== selectedElement
    );
    setElements(newElements);
    setSelectedElement(null);
  };

  return (
    <>
      <CanvasControls
        handleCanvasClear={handleCanvasClear}
        handleCanvasUndo={handleCanvasUndo}
        handleSetCanvasMode={handleSetCanvasMode}
        canvasMode={canvasMode}
        handleCanvasRedo={handleCanvasRedo}
        handleDeleteElementFromCanvas={handleDeleteElementFromCanvas}
      />
      <SvgSelector handleSelectSVG={handleSelectSVG} />
      <DrawingArea
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseDown={handleCanvasMouseDown}
        onMouseUp={handleCanvasMouseUp}
        width={viewportWidth * areaModifier}
        height={viewportHeight * areaModifier}
      />
    </>
  );
};

export default Canvas;
