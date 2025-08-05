// Inject style
const style = document.createElement("link");
style.rel = "stylesheet";
style.href = "style.css";
document.head.appendChild(style);

// Create toolbar
const toolbar = document.createElement("div");
toolbar.className = "toolbar";

const title = document.createElement("h1");
title.textContent = "Collaborative Whiteboard";

const penBtn = document.createElement("button");
penBtn.textContent = "Pen";

const rectBtn = document.createElement("button");
rectBtn.textContent = "Rectangle";

const clearBtn = document.createElement("button");
clearBtn.textContent = "Clear";
clearBtn.className = "clear";

toolbar.appendChild(title);
toolbar.appendChild(penBtn);
toolbar.appendChild(rectBtn);
toolbar.appendChild(clearBtn);
document.body.appendChild(toolbar);

// Create canvas
const canvas = document.createElement("canvas");
canvas.id = "whiteboard";
canvas.width = window.innerWidth * 0.95;
canvas.height = window.innerHeight * 0.8;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

// Tool logic
let drawing = false;
let tool = "pen";
let startX = 0;
let startY = 0;

// Tool selection
penBtn.addEventListener("click", () => (tool = "pen"));
rectBtn.addEventListener("click", () => (tool = "rectangle"));
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Drawing events
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  startX = e.offsetX;
  startY = e.offsetY;
  if (tool === "pen") {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  if (tool === "pen") {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
});

canvas.addEventListener("mouseup", (e) => {
  if (!drawing) return;
  drawing = false;

  if (tool === "rectangle") {
    const width = e.offsetX - startX;
    const height = e.offsetY - startY;
    ctx.strokeRect(startX, startY, width, height);
  }
});

canvas.addEventListener("mouseleave", () => {
  drawing = false;
});
