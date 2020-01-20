export const renderBackground = (canvas, width, height, color) => {
  const ctx = canvas.getContext("2d", { alpha: false });

  ctx.imageSmoothingEnabled = true;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
};

export const renderPieceOnCanvas = (
  canvas,
  x,
  y,
  size,
  color,
  outline = false,
  highlight = false,
  label = undefined
) => {
  const ctx = canvas.getContext("2d", { alpha: false });
  const pieceColor = color === undefined ? "white" : color;
  const width = size;
  const height = size;

  ctx.imageSmoothingEnabled = true;
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, width, height);

  if (outline) {
    ctx.strokeStyle = "rgb(200,200,200)";
    ctx.strokeRect(x, y, width, height);
  }

  var grd = ctx.createRadialGradient(
    x + width / 2,
    y + width / 2,
    width,
    x,
    y,
    0
  );
  grd.addColorStop(0, highlight ? "white" : pieceColor);
  grd.addColorStop(1, highlight ? pieceColor : "white");

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.arc(x + width / 2, y + height / 2, width * 0.45, 0, Math.PI * 2, true); // Outer circle
  ctx.fillStyle = grd;
  ctx.fill();
  ctx.closePath();

  if (label !== undefined) {
    ctx.font = "36px arial";
    ctx.fillStyle = "white";
    const measurement = ctx.measureText(label);
    const txtWidth = measurement.width;

    ctx.fillText(label, x + width / 2 - txtWidth / 2, y + width / 2 + 12);
  }
};
