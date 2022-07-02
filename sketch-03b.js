const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

// The animate settings calls a function such as the example below
// This is how to animate in javascript without a library
// const exampleAnimateFn = () => {
//   console.log("domestica");
//   requestAnimationFrame(exampleAnimateFn);
// };
// exampleAnimateFn();

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

    // nested loop that creates connected lines
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      // to optimise the nested loop we start at i + 1; this reduces the number of iterations
      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.position.hypotenuse(other.position);

        // Only display lines less than 200
        if (dist > 200) continue;

        // create thick lines when close and thin lines as distance increases
        context.lineWidth = math.mapRange(dist, 0, 200, 12, 1);

        // create lines between points
        context.beginPath();
        context.moveTo(agent.position.xCoordinate, agent.position.yCoordinate);
        context.lineTo(other.position.xCoordinate, other.position.yCoordinate);
        context.stroke();
      }
    }

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);

// class Point {
//   constructor(xParameter, yParameter) {
//     this.xCoordinate = xParameter;
//     this.yCoordinate = yParameter;
//   }
// }

// Refactored class Point to Vector to better describe it
class Vector {
  constructor(xParameter, yParameter) {
    this.xCoordinate = xParameter;
    this.yCoordinate = yParameter;
  }

  // the Pythagorean equation as a function c = a^2 + b^2
  // used to calculate the hypotenuse between points
  hypotenuse(vector) {
    const a = this.xCoordinate - vector.xCoordinate;
    const b = this.yCoordinate - vector.yCoordinate;

    return Math.sqrt(a * a + b * b);
  }
}

class Agent {
  constructor(xParameter, yParameter) {
    this.position = new Vector(xParameter, yParameter);
    this.velocity = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 12); // create random radius
  }

  // Method that sets boundaries and inverts velocity when it hits boundary
  bounce(width, height) {
    if (this.position.xCoordinate <= 0 || this.position.xCoordinate >= width)
      this.velocity.xCoordinate *= -1;
    if (this.position.yCoordinate <= 0 || this.position.yCoordinate >= height)
      this.velocity.yCoordinate *= -1;
  }

  // Method that animates points
  update() {
    this.position.xCoordinate += this.velocity.xCoordinate;
    this.position.yCoordinate += this.velocity.yCoordinate;
  }

  // Method that draws points or objects
  draw(context) {
    // context.fillStyle = "black";

    context.save();
    context.translate(this.position.xCoordinate, this.position.yCoordinate);

    context.lineWidth = 4; // stroke thickness

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke(); // default stroke is black

    context.restore();
  }
}
