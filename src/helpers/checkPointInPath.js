export default (elements, context, eventX, eventY) => {
  let collidedId;
  const collided = elements.some((element) => {
    if (element.type !== "svg") return false;
    const {
      svgOffset: { x: offsetX, y: offsetY },
      height,
      width,
      id,
      location: { x, y },
      scale,
    } = element;

    context.save();
    context.scale(scale, scale);
    context.translate(
      x / scale - offsetX - width / 2,
      y / scale - offsetY - height / 2
    );
    const selectionRectangle = new Path2D();
    selectionRectangle.rect(offsetX, offsetY, width, height);
    const collided = context.isPointInPath(selectionRectangle, eventX, eventY);
    collidedId = collided && id;
    context.restore();
    return collided;
  });
  return { collided, collidedId };
};
