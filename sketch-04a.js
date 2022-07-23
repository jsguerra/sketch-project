const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const sketch = () => {
  return ({ context, frame, width, height }) => {
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
      const cellXCoordinate = col * cellWidth + marginX + cellWidth * 0.5;
      const cellYCoordinate = row * cellHeight + marginY + cellHeight * 0.5;
      const cellLineWidth = cellWidth * 0.8; // 80% of cell width
      const cellLineHeight = cellHeight * 0.8; // 80% of cell height

      const noise2D = random.noise2D(cellXCoordinate + frame * 20, cellYCoordinate, 0.001); // used to set the angle of rotation of the lines in the grid
      const lineAngle = noise2D * Math.PI * 0.2; // noise2D returns -1 to 1
      // const scale = (noise2D + 1) / 2 * 30; // to keep number positive
      // const scale = (noise2D * 0.5 + 0.5) * 30; // same as above
      const scale = math.mapRange(noise2D, -1, 1, 1, 30); // using utility to get the same result as the equations above
      

      context.save();
      context.translate(cellXCoordinate, cellYCoordinate);
      context.rotate(lineAngle);
      // context.translate(marginX, marginY);
      // context.translate(cellWidth * 0.5, cellHeight * 0.5);

      // context.lineWidth = 4;
      context.lineWidth = scale;

      context.beginPath();
      context.moveTo(cellLineWidth * -0.5, 0);
      context.lineTo(cellLineHeight * 0.5, 0);
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
