const canvasSketch = require("canvas-sketch");
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080],
};

// Canvas sketch is asyncronous so manager allows for trigger re-rendering
let manager;

// Drawing a letter on Canvas
let text = "A";
let fontSize = "1200";
let fontFamily = "serif";

const typeCanvas = document.createElement("canvas");
const typeContext = typeCanvas.getContext("2d");

const sketch = ({ context, width, height }) => {
  const cell = 20;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = "black";
    typeContext.fillRect(0, 0, cols, rows);

    fontSize = cols * 1.2;

    typeContext.fillStyle = "white";
    typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = "top";

    const metrics = typeContext.measureText(text);
    const metricsXcoord = metrics.actualBoundingBoxLeft * -1;
    const metricsYcoord = metrics.actualBoundingBoxAscent * -1;
    const metricsWidth =
      metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const metricsHeight =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const xCoord = (cols - metricsWidth) * 0.5 - metricsXcoord;
    const yCoord = (rows - metricsHeight) * 0.5 - metricsYcoord;

    typeContext.save();
    typeContext.translate(xCoord, yCoord);

    typeContext.beginPath();
    typeContext.rect(metricsXcoord, metricsYcoord, metricsWidth, metricsHeight);
    typeContext.stroke();

    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    // Get image data from typeContext
    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.textBaseline = 'middle';
    context.textAlign = 'center';

    // context.drawImage(typeCanvas, 0, 0);

    for (let i = 0; i < numCells; i++) {
      const column = i % cols;
      const row = Math.floor(i / cols);

      const itemXcoord = column * cell;
      const itemYcoord = row * cell;

      // RGBA values from typeData colour values
      const r = typeData[i * 4 + 0]; // index * number of chanels + reference channel (not needed)
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      // We are using only the r value from rgba
      const glyph = getGlyph(r);

      context.font = `${cell * 2}px ${fontFamily}`;
      if (Math.random() < 0.1) context.font = `${cell * 6}px ${fontFamily}`;

      context.fillStyle = 'white';

      // Draw a new square
      context.save();
      context.translate(itemXcoord, itemYcoord);
      // We add an extra translate to align the cirlces below to the canvas
      context.translate(cell * 0.5, cell * 0.5);
      // context.fillRect(0, 0, cell, cell);

      // If not using squares we can use circles
      // context.beginPath();
      // context.arc(0, 0, cell * 0.5, 0, Math.PI * 2);
      // context.fill();

      // We use glyphs instead of geometric shapes
      context.fillText(glyph, 0, 0);

      context.restore();
    }
  };
};

// The Glyph function
const getGlyph = (rgbaValue) => {
  if (rgbaValue < 50) return '';
  if (rgbaValue < 100) return '.';
  if (rgbaValue < 150) return '-';
  if (rgbaValue < 200) return '+';

  const glyphs = '_= /'.split('');

  return random.pick(glyphs);
}

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
