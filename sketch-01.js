const canvasSketch = require("canvas-sketch");

const settings = {
  domension: [2000, 2000],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
  };
};

canvasSketch(sketch, settings);
