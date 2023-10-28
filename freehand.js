let previousPoint;

let history = [];
let historyIndex = -1;

canvas.addEventListener("mousedown", onMouseDown);

function onMouseDown(event) {
  if (actions.arrow) {
    return;
  }

  redoArray = [];

  previousPoint = [event.clientX, event.clientY];
  startIndex = history.length - 1;

  c.strokeStyle = inputs.color;
  c.lineWidth = inputs.strokeWidth;
  c.globalAlpha = inputs.opacity;

  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);
}

function onMouseMove(e) {
  let currentPoint = [e.clientX, e.clientY];
  if (actions.pencil) {
    drawingFreeHand(currentPoint);
  } else if (actions.square) {
    resetToOriginalImage();
    drawingSquare(currentPoint);
  } else if (actions.circle) {
    resetToOriginalImage();
    drawingCircle(currentPoint);
  } else if (actions.triangle) {
    resetToOriginalImage();
    drawingTriangle(currentPoint);
  } else if (actions.line) {
    resetToOriginalImage();
    drawingLine(currentPoint);
  } else {
    erasing(currentPoint);
  }
}

function drawingFreeHand(currentPoint) {
  c.beginPath();
  c.moveTo(previousPoint[0], previousPoint[1]);
  c.lineTo(...currentPoint);
  c.lineCap = "round";
  c.lineJoin = "round";
  c.closePath();
  c.stroke();
  previousPoint = currentPoint;
}

function resetToOriginalImage() {
  if (startIndex === -1) {
    c.clearRect(0, 0, canvas.width, canvas.height);
  } else {
    c.putImageData(history[startIndex], 0, 0);
  }
}

function drawingSquare(currentPoint) {
  c.beginPath();
  let width = currentPoint[0] - previousPoint[0];
  let height = currentPoint[1] - previousPoint[1];
  c.strokeRect(...previousPoint, width, height);
}

function drawingCircle(currentPoint) {
  c.beginPath();
  const radius = Math.sqrt(
    (currentPoint[0] - previousPoint[0]) ** 2 +
      (currentPoint[1] - previousPoint[1]) ** 2
  );
  c.arc(...previousPoint, radius, 0, 2 * Math.PI, true);
  c.stroke();
}

function drawingTriangle(currentPoint) {
  c.beginPath();
  c.moveTo(previousPoint[0], previousPoint[1]);
  c.lineTo(...currentPoint);
  c.lineTo(
    previousPoint[0] - (currentPoint[0] - previousPoint[0]),
    currentPoint[1]
  );
  // c.lineTo(previousPoint[0], previousPoint[1]);
  c.closePath();
  c.stroke();
  // console.log(previousPoint);
}

function drawingLine(currentPoint) {
  c.beginPath();
  c.moveTo(...previousPoint);
  c.lineTo(...currentPoint);
  c.stroke();
}

function erasing(currentPoint) {
  let x = inputs.strokeWidth;
  c.clearRect(...currentPoint, x, x);
}

function onMouseUp() {
  history.push(c.getImageData(0, 0, canvas.width, canvas.height));
  historyIndex++;
  canvas.removeEventListener("mousemove", onMouseMove);
  canvas.removeEventListener("mouseup", onMouseUp);
}
