const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

let nav = document.getElementById("nav-middle-top");
nav.addEventListener("click", onClickNav);
let isMainRemoved = false;

const topButtons = document.querySelectorAll("#nav-middle-top > button");

const actions = {
  arrow: true,
  square: false,
  circle: false,
  line: false,
  pencil: false,
  eraser: false,
};

const inputs = {
  color: "black",
  strokeWidth: 5,
  opacity: 1,
};

function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("display");
}

function onClickNav() {
  if (!isMainRemoved) {
    const main = document.getElementById("main");
    main.remove();
    isMainRemoved = true;
  }
}

function onInput(currentElement) {
  const value = currentElement.value;
  if (currentElement.name === "color") {
    inputs.color = value;
  } else if (currentElement.name === "opacity") {
    inputs.opacity = value;
  } else {
    inputs.strokeWidth = parseInt(value);
  }
  // console.log(inputs);
}

function onActionButtonClick(element) {
  topButtons.forEach((element) => {
    element.classList.remove("button-active");
    actions[element.id] = false;
  });
  element.classList.add("button-active");
  actions[element.id] = true;

  if (actions.arrow) {
    canvas.style.cursor = "default";
  } else if (actions.eraser) {
    canvas.style.cursor = "cell";
  } else {
    canvas.style.cursor = "crosshair";
  }
  // console.log(actions);
}

function resetCanvas() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  history = [];
  historyIndex = -1;
}

// function onMouseDown(event) {
//   previousPoint = [event.clientX, event.clientY];
//   canvas.addEventListener("mousemove", onMouseMove);
//   canvas.addEventListener("mouseup", onMouseUp);
// }
// function onMouseMove(event) {
//   let currentPoint = [event.clientX, event.clientY];
//   c.beginPath();
//   c.moveTo(previousPoint[0], previousPoint[1]);
//   c.lineTo(...currentPoint);
//   c.strokeStyle = drawingColor;
//   c.lineWidth = strokeWidth;
//   c.globalAlpha = opacity;
//   c.closePath();
//   c.stroke();
//   previousPoint = currentPoint;
// }
// function onMouseUp() {
//   canvas.removeEventListener("mousemove", onMouseMove);
// }
