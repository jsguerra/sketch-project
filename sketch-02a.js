const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

// Function to convert degrees into radians
const degToRad = (degrees) => {
  return (degrees / 180) * Math.PI;
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    const xCenterAxis = width * 0.5;
    const yCenterAxis = height * 0.5;
    const itemWidth = width * 0.01;
    const itemHeight = height * 0.1;
    let xAxis, yAxis;

    const numOfItems = 12;
    const radius = width * 0.3;

    // Loop and draw item number of times
    for (let i = 0; i < numOfItems; i++) {
      // change the angle of rotation based on the index of the loop
      // A circle is 360 degrees
      const slice = degToRad(360 / numOfItems); // number of slices, converted to radians
      const angle = slice * i; // angle of rotation

      // Trigonometry
      xAxis = xCenterAxis + radius * Math.sin(angle);
      yAxis = yCenterAxis + radius * Math.cos(angle);

      context.save();
      context.translate(xAxis, yAxis);
      // context.rotate(degToRad(45)); // in radians
      context.rotate(-angle); // negative angle to rotate items

      context.beginPath();
      context.rect(-itemWidth * 0.5, -itemHeight * 0.5, itemWidth, itemHeight);
      context.fill();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
