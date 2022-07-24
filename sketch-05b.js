const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

// Canvas sketch is asyncronous so manager allows for trigger re-rendering
let manager;

// Drawing a letter on Canvas
let text = "A";
let fontSize = "1200";
let fontFamily = "serif";

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";
    context.font = `${fontSize}px ${fontFamily}`;
    context.textBaseline = "top";

    const metrics = context.measureText(text);
    const metricsXcoord = metrics.actualBoundingBoxLeft * -1;
    const metricsYcoord = metrics.actualBoundingBoxAscent * -1;
    const metricsWidth =
      metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const metricsHeight =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

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

// We listen to our events, assign a new letter and render a new frame
const onKeyUp = (e) => {
  text = e.key.toUpperCase();
  manager.render();
};

// Add an event listener to document to listen to key strokes
document.addEventListener("keyup", onKeyUp);

// We wrap canvasSketch in an async function to await our events
const start = async () => {
  manager = await canvasSketch(sketch, settings);
};

// The function must be executed to work
start();

/*
const url = 'https://picsum.photos/200';

const loadMeSomeImage = (url) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject();
		img.src = url;
	});
};

const start = async () => {
	const img = await loadMeSomeImage(url);
	console.log('image width', img.width);
	console.log('this line');
};

// const start = () => {
// 	loadMeSomeImage(url).then(img => {
// 		console.log('image width', img.width);
// 	});
// 	console.log('this line');
// };


start();
*/
