const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
const Tweakpane = require("tweakpane");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  frame: 0,
  animate: true,
  lineCap: "but",
};

const sketch = () => {
  return ({ context, frame, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;
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

      const frameState = params.animate ? frame : params.frame;

      // const noise2D = random.noise2D(
      //   cellXCoordinate + frame * 20,
      //   cellYCoordinate,
      //   params.freq
      // ); // used to set the angle of rotation of the lines in the grid
      const noise3D = random.noise3D(
        cellXCoordinate,
        cellYCoordinate,
        frameState * 10,
        params.freq
      );
      // const lineAngle = noise2D * Math.PI * params.amp; // noise2D returns -1 to 1
      const lineAngle = noise3D * Math.PI * params.amp; // noise2D returns -1 to 1
      // const scale = (noise2D + 1) / 2 * 30; // to keep number positive
      // const scale = (noise2D * 0.5 + 0.5) * 30; // same as above
      // const scale = math.mapRange(
      //   noise2D,
      //   -1,
      //   1,
      //   params.scaleMin,
      //   params.scaleMax
      // ); // using utility to get the same result as the equations above
      const scale = math.mapRange(
        noise3D,
        -1,
        1,
        params.scaleMin,
        params.scaleMax
      ); // using utility to get the same result as the equations above

      context.save();
      context.translate(cellXCoordinate, cellYCoordinate);
      context.rotate(lineAngle);
      // context.translate(marginX, marginY);
      // context.translate(cellWidth * 0.5, cellHeight * 0.5);

      // context.lineWidth = 4;
      context.lineWidth = scale;
      context.lineCap = params.lineCap;

      context.beginPath();
      context.moveTo(cellLineWidth * -0.5, 0);
      context.lineTo(cellLineHeight * 0.5, 0);
      context.stroke();

      context.restore();
    }
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({ title: "Grid" });
  folder.addInput(params, "lineCap", {
    options: { butt: "butt", round: "round", square: "square" },
  });
  folder.addInput(params, "cols", { min: 2, max: 50, step: 1 });
  folder.addInput(params, "rows", { min: 2, max: 50, step: 1 });
  folder.addInput(params, "scaleMin", { min: 1, max: 100 });
  folder.addInput(params, "scaleMax", { min: 1, max: 100 });

  folder = pane.addFolder({ title: "Noise" });
  folder.addInput(params, "freq", { min: -0.01, max: 0.01 });
  folder.addInput(params, "amp", { min: 0, max: 1 });
  folder.addInput(params, "animate");
  folder.addInput(params, "frame", { min: 0, max: 999 });
};

createPane();
canvasSketch(sketch, settings);
