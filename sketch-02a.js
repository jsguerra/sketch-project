const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    const xAxis = width * 0.5;
    const yAxis = height * 0.5;
    const itemWidth = width * 0.3;
    const itemHeight = height * 0.3;

    context.save();
    context.translate(xAxis, yAxis);
    context.rotate(0.3);

    context.beginPath();
    context.rect(-itemWidth * 0.5, -itemHeight * 0.5, itemWidth, itemHeight);
    context.fill();
    context.restore();
  };
};

canvasSketch(sketch, settings);
