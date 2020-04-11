import checkPointInPath from "./checkPointInPath";
import { v4 as uuidv4 } from "uuid";

export const addElementToCanvas = (
  context,
  eventX,
  eventY,
  elements,
  element,
  setElements,
  setSelectedElement
) => {
  const { collided } = checkPointInPath(elements, context, eventX, eventY);

  if (collided) return;

  const { path } = element;
  if (!path) return;
  const id = uuidv4();
  const newElement = {
    ...element,
    location: {
      x: eventX,
      y: eventY,
    },
    id,
    selected: true,
  };
  setElements([...elements, newElement]);
  setSelectedElement(newElement);
};

export const selectElementFromCanvas = (
  context,
  eventX,
  eventY,
  elements,
  setSelectedElement
) => {
  const { collided, collidedId } = checkPointInPath(
    elements,
    context,
    eventX,
    eventY
  );
  collided ? setSelectedElement(collidedId) : setSelectedElement(null);

  return collidedId;
};

export const dragElementInCanvas = (
  event,
  canvas,
  elements,
  dragElement,
  setElements
) => {
  const { clientX, clientY } = event;
  const eventX = clientX - canvas.getBoundingClientRect().left;
  const eventY = clientY - canvas.getBoundingClientRect().top;

  const newArray = elements.map((element) => {
    const { id } = element;
    return id === dragElement
      ? {
          ...element,
          location: { x: eventX, y: eventY },
          selected: true,
        }
      : { ...element, selected: false };
  });

  setElements(newArray);
};
