const pencil = document.getElementById("pencil");
let isPencilActive = false;
let isMainRemoved = false;

const colorSelector = document.getElementById("color-selector");
colorSelector.addEventListener("change", () => {
    drawingColor = colorSelector.value ;
});

const widthSelector = document.getElementById("width-selector");
widthSelector.addEventListener("change", () => {
    strokeWidth = widthSelector.value ;
});

const opacitySelector = document.getElementById("opacity-selector");
opacitySelector.addEventListener("change", () => {
    opacity = opacitySelector.value ;
});

function onPencilClick() {
  if (!isMainRemoved) {
    const main = document.getElementById("main");
    main.remove();
    isMainRemoved = true;
  }

  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("display");

  pencil.classList.toggle("button-active");
  isPencilActive = !isPencilActive;
  if (isPencilActive) {
    canvas.style.cursor = "crosshair";
    canvas.addEventListener("mousedown", onMouseDown);
  } else {
    canvas.style.cursor = "default";
    canvas.removeEventListener("mousedown", onMouseDown);
  }
}

pencil.addEventListener("click", onPencilClick);
