const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

let previousPoint;
let drawingColor= "black";
let strokeWidth = 5;
let opacity = 1;

function onMouseDown(event){
    previousPoint = [event.clientX, event.clientY];
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
}
function onMouseMove(event){
    let currentPoint = [event.clientX, event.clientY];
    c.beginPath();
    c.moveTo(previousPoint[0],previousPoint[1]);
    c.lineTo(...currentPoint);
    c.strokeStyle = drawingColor;
    c.lineWidth = strokeWidth;
    c.globalAlpha = opacity;
    c.stroke();
    c.closePath();
    previousPoint = currentPoint;
}
function onMouseUp(){
    canvas.removeEventListener("mousemove",onMouseMove);
}