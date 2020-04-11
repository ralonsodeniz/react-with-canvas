import React from "react";

import { CanvasControlsContainer, CustomButton } from "./CanvasControls.styles";

const CanvasControls = ({
  handleCanvasClear,
  handleCanvasUndo,
  handleSetCanvasMode,
  canvasMode,
}) => {
  return (
    <CanvasControlsContainer>
      <CustomButton
        selected={canvasMode === "draw"}
        type="button"
        id="draw"
        onClick={handleSetCanvasMode}
      >
        Draw
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
      <CustomButton type="button" onClick={handleCanvasUndo}>
        Undo
      </CustomButton>
    </CanvasControlsContainer>
  );
};

export default CanvasControls;
