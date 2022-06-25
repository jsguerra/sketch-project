const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [600, 600],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const itemWidth = 60;
    const itemHeight = 60;
    const gap = 20;
    let xAxis, yAxis;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        xAxis = 100 + (itemWidth + gap) * i;
        yAxis = 100 + (itemHeight + gap) * j;

        context.beginPath();
        context.rect(xAxis, yAxis, itemWidth, itemHeight);
        context.stroke();

        if (Math.random() > 0.5) {
          context.beginPath();
          context.rect(xAxis + 8, yAxis + 8, itemWidth - 16, itemHeight - 16);
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
