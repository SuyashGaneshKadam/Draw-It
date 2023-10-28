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
  triangle: false,
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
