const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = ({ context, width, height }) => {
  const agents = [];

  for (let i = 0; i < 40; i++) {
    const xCoordinate = random.range(0, width);
    const yCoordinate = random.range(0, height);

    agents.push(new Agent(xCoordinate, yCoordinate));
  }

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    agents.forEach((agent) => {
      agent.draw(context);
    });
  };
};

canvasSketch(sketch, settings);

class Point {
  constructor(xParameter, yParameter) {
    this.xCoordinate = xParameter;
    this.yCoordinate = yParameter;
  }
}

class Agent {
  constructor(xParameter, yParameter) {
    this.position = new Point(xParameter, yParameter);
    this.radius = 10;
  }

  draw(context) {
    context.fillStyle = "black";

    context.beginPath();
    context.arc(
      this.position.xCoordinate,
      this.position.yCoordinate,
      this.radius,
      0,
      Math.PI * 2
    );
    context.fill();
  }
}
