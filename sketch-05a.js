const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

// Drawing a letter on Canvas
let text = "A";
let fontSize = "1200";
let fontFamily = "serif";

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';
    context.font = `${fontSize}px ${fontFamily}`;
    context.textBaseline = "top";

    const metrics = context.measureText(text);
    const metricsXcoord = metrics.actualBoundingBoxLeft * -1;
    const metricsYcoord = metrics.actualBoundingBoxAscent * -1;
    const metricsWidth = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const metricsHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const xCoord = (width - metricsWidth) * 0.5 - metricsXcoord;
    const yCoord = (height - metricsHeight) * 0.5 - metricsYcoord;

    context.save();
    context.translate(xCoord, yCoord);

    context.beginPath();
    context.rect(metricsXcoord, metricsYcoord, metricsWidth, metricsHeight);
    context.stroke();

    context.fillText(text, 0, 0);
    context.restore();
  };
};

canvasSketch(sketch, settings);
