let redoArray = [];

function onUndo() {
  if (historyIndex == -1) {
    return;
  } else {
    redoArray.push(history.pop());
    historyIndex--;
    if (historyIndex == -1) {
      c.clearRect(0, 0, canvas.width, canvas.height);
    } else {
      c.putImageData(history[historyIndex], 0, 0);
    }
  }
}

function onRedo() {
  if (redoArray.length == 0) {
    return;
  } else {
    history.push(redoArray.pop());
    historyIndex++;
    c.putImageData(history[historyIndex], 0, 0);
  }
}
