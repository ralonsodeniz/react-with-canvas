export default (canvas, element) => {
  const { type } = element;
  switch (type) {
    case "svg":
      drawSvg(canvas, element);
      break;
    case "free":
      drawFree(canvas, element);
      break;
    default:
      break;
  }
};

const drawSvg = (canvas, element) => {
  const context = canvas.getContext("2d");
  const {
    location: { x, y },
    scale,
    fillColor,
    path,
    shadowBlur,
    shadowColor,
    height,
    width,
    svgOffset: { x: offsetX, y: offsetY },
    selected,
  } = element;

  context.save();
  context.fillStyle = fillColor;
  context.shadowColor = shadowColor;
  context.shadowBlur = shadowBlur;
  context.scale(scale, scale);
  context.translate(
    x / scale - offsetX - width / 2,
    y / scale - offsetY - height / 2
  );
  const svgPath = new Path2D(path);
  context.fill(svgPath);

  if (selected) {
    context.strokeStyle = fillColor;
    context.strokeRect(offsetX, offsetY, width, height);
  }

  context.restore();
};

const drawFree = (canvas, element) => {
  const context = canvas.getContext("2d");
  const { fillColor, path } = element;
  context.strokeStyle = fillColor;
  context.beginPath();
  context.moveTo(path[0].x, path[0].y);
  for (let point = 1; point < path.length; point++) {
    const nextPoint = path[point];
    context.lineTo(nextPoint.x, nextPoint.y);
  }
  context.stroke();
};
