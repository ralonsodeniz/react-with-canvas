/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export default (elements, selectedElement, setElements, canvasMode) => {
  useEffect(() => {
    const newArray = selectedElement
      ? elements.map((element) => {
          const { id } = element;
          return id === selectedElement
            ? { ...element, selected: true }
            : { ...element, selected: false };
        })
      : elements.map((element) => ({ ...element, selected: false }));

    setElements(newArray);
  }, [selectedElement, setElements]);
};
