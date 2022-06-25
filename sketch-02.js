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

    // create a square example
    context.save(); // save the current state of the context
    context.translate(xAxis, yAxis);
    context.rotate(0.3);

    context.beginPath();
    context.rect(-itemWidth * 0.5, -itemHeight * 0.5, itemWidth, itemHeight);
    context.fill();
    context.restore(); // restore the point of origin and begin again
    // without save() and restore() all changes are cumulative and continue from the existing state and origin

    // create a circle example
    context.translate(100, 400);

    context.beginPath();
    context.arc(0, 0, 50, 0, Math.PI * 2);
    context.fill();
  };
};

canvasSketch(sketch, settings);
