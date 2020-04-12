import React from "react";

import { CanvasControlsContainer, CustomButton } from "./CanvasControls.styles";

const CanvasControls = ({
  handleCanvasClear,
  handleCanvasUndo,
  handleSetCanvasMode,
  canvasMode,
  handleCanvasRedo,
  handleDeleteElementFromCanvas,
}) => {
  return (
    <CanvasControlsContainer>
      <CustomButton
        selected={canvasMode === "free"}
        type="button"
        id="free"
        onClick={handleSetCanvasMode}
      >
        Free draw
      </CustomButton>
      <CustomButton
        selected={canvasMode === "svg"}
        type="button"
        id="svg"
        onClick={handleSetCanvasMode}
      >
        Draw svg
      </CustomButton>
      <CustomButton
        selected={canvasMode === "select"}
        type="button"
        id="select"
        onClick={handleSetCanvasMode}
      >
        Select
      </CustomButton>
      <CustomButton
        selected={canvasMode === "move"}
        type="button"
        id="move"
        onClick={handleSetCanvasMode}
      >
        Move
      </CustomButton>
      <CustomButton type="button" onClick={handleCanvasClear}>
        Clear canvas
      </CustomButton>
      <CustomButton type="button" onClick={handleDeleteElementFromCanvas}>
        Delete selected element
      </CustomButton>
      <CustomButton type="button" onClick={handleCanvasUndo}>
        Undo
      </CustomButton>
      <CustomButton type="button" onClick={handleCanvasRedo}>
        Redo
      </CustomButton>
    </CanvasControlsContainer>
  );
};

export default CanvasControls;
