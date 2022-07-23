const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const cols = 10;
    const rows = 10;
    const numCells = cols * rows;

    const gridWidth = width * 0.8; // 80% of the canvas width
    const gridHeight = height * 0.8; // 80% of the canvas height
    const cellWidth = gridWidth / cols;
    const cellHeight = gridHeight / rows;
    const marginX = (width - gridWidth) * 0.5;
    const marginY = (height - gridHeight) * 0.5;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      // const cellXCoordinate = col * cellWidth;
      // const cellYCoordinate = row * cellHeight;
      // combined example instead of calling translate multiple times
      const cellXCoordinate = ((col * cellWidth) + marginX + (cellWidth * 0.5));
      const cellYCoordinate = ((row * cellHeight) + marginY + (cellHeight * 0.5));
      const cellLineWidth = cellWidth * 0.8; // 80% of cell width
      const cellLineHeight = cellHeight * 0.8; // 80% of cell height

      context.save();
      context.translate(cellXCoordinate, cellYCoordinate);
      // context.translate(marginX, marginY);
      // context.translate(cellWidth * 0.5, cellHeight * 0.5);

      context.lineWidth = 4;

      context.beginPath();
      context.moveTo(cellLineWidth * -0.5, 0);
      context.lineTo(cellLineHeight * 0.5, 0);
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
