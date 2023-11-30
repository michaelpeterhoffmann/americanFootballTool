const socket = io();

let mousePressed = false;
let lastPos = null;
let drawColor = "black";
let lineWidth = 15;
let currentSelectedTool = 0;
let testVariable = 5;
//we define a variable for the current button pressed; 0 means the palette is used


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function toolButtonsInit()
{
    document.querySelectorAll(".btn2").forEach((element) => {
        element.addEventListener("click", () => {
            currentSelectedTool = element.value;
            });
        });
}

toolButtonsInit();
createPalette();

function createPalette() {
    const COLORS = [
        "black",
        "gray",
        "silver",
        "white",
        "lightblue",
        "cyan",
        "blue",
        "darkblue",
        "purple",
        "magenta",
        "red",
        "orange",
        "yellow",
        "lime",
        "green",
        "olive",
        "brown",
        "maroon",
    ];
    const palette = document.getElementById("palette");
    COLORS.forEach((colorName) => {
        const colorElement = document.createElement("div");
        colorElement.classList.add("colorSquare");
        colorElement.style.backgroundColor = colorName;
        palette.appendChild(colorElement);
    });
}


function draw(e) {

    const [x, y] = mousePos(e);
    if (lastPos) {
        socket.emit("drawing", drawColor, lineWidth, lastPos, [x, y], currentSelectedTool);
        lastPos = [x, y];
    } else {
        lastPos = [x, y];
        socket.emit("drawing", drawColor, lineWidth, lastPos, [x, y], currentSelectedTool);
    }
}


function copyImageToCanvas(toolNumber, posX, posY) {
var imgWidth = 0;
var imgHeight = 0;
var playerImg_height = 30;
var playerImg_width = 30;    

if (toolNumber== 1) {
    var img = new Image();
    img = document.getElementById('pfeil_links');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
 
}
if (toolNumber== 2) {
    var img = new Image();
    img = document.getElementById('pfeil_rechts');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}
if (toolNumber== 3) {
    var img = new Image();
    img = document.getElementById('pfeil_runter');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}
if (toolNumber== 4) {
    var img = new Image();
    img = document.getElementById('pfeil_hoch');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}

if (toolNumber== 5) {
    var img = new Image();
    img = document.getElementById('block_1');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
   
}
if (toolNumber== 6) {
    var img = new Image();
    img = document.getElementById('block_2');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}
if (toolNumber== 7) {
    var img = new Image();
    img = document.getElementById('block_3');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}
if (toolNumber== 8) {
    var img = new Image();
    img = document.getElementById('letter_a');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}

if (toolNumber== 9) {
    var img = new Image();
    img = document.getElementById('letter_b');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}
if (toolNumber== 10) {
    var img = new Image();
    img = document.getElementById('letter_c');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}
if (toolNumber== 11) {
    var img = new Image();
    img = document.getElementById('letter_z');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}
//add player symbols
if (toolNumber== 12) {
    var img = new Image();
    img = document.getElementById('circle_empty');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}
if (toolNumber== 13) {
    var img = new Image();
    img = document.getElementById("circle_left");
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}
if (toolNumber== 14) {
    var img = new Image();
    img = document.getElementById('circle_right');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}

if (toolNumber== 15) {
    var img = new Image();
    img = document.getElementById('circle_middle');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}
if (toolNumber== 16) {
    var img = new Image();
    img = document.getElementById('square_empty');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}
if (toolNumber== 17) {
    var img = new Image();
    img = document.getElementById('square_left');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}

if (toolNumber== 18) {
    var img = new Image();
    img = document.getElementById('square_right');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}
if (toolNumber== 19) {
    var img = new Image();
    img = document.getElementById('square_middle');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}

if (toolNumber== 20) {
    var img = new Image();
    img = document.getElementById('full_OL');
    imgWidth = 170;
    imgHeight = playerImg_height;
}

if (toolNumber== 21) {
    var img = new Image();
    img = document.getElementById('template_1');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
    
}
if (toolNumber== 22) {
    var img = new Image();
    img = document.getElementById('template_2');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}
if (toolNumber== 23) {
    var img = new Image();
    img = document.getElementById('template_3');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}
if (toolNumber== 24) {
    var img = new Image();
    img = document.getElementById('text_1');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}
if (toolNumber== 25) {
    var img = new Image();
    img = document.getElementById('text_2');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}
if (toolNumber== 26) {
    var img = new Image();
    img = document.getElementById('text_3');
    imgWidth = playerImg_width;
    imgHeight = playerImg_height;
}

var canvas = document.querySelector("canvas"); 
var ctx = canvas.getContext("2d");

    //copy image to mouse position

    ctx.drawImage( img, posX - (imgWidth / 2), posY - (imgHeight / 2), imgWidth, imgHeight);
    
    
    return;  
 }
 
 



socket.on("drawing", (color, width, startPos, endPos, tool) => {
    if(tool == 0)
    {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineJoin = "round";
        ctx.moveTo(...startPos);
        ctx.lineTo(...endPos);
        ctx.closePath();
        ctx.stroke();
    }
    else{
        copyImageToCanvas(tool, endPos[0], endPos[1]);
    }
});




//zum Ausprobieren - Pfeile sind hart gecoded
function drawArrow(){
    /*
    EXAMPLE-ARROWS:
    ctx.beginPath();
    canvas_arrow(ctx, 10, 30, 200, 150);
    canvas_arrow(ctx, 100, 200, 400, 50);
    canvas_arrow(ctx, 200, 30, 10, 150);
    canvas_arrow(ctx, 400, 200, 100, 50);
    ctx.stroke();*/
    var image = document.querySelector("img");

    var ctx = canvas.getContext("2d");
    
    //copy image to position 50,50
    //ctx.drawImage( image, 100, 100, );
    
    return;


}

//hiermit wird wirklich der Pfeil gemalt
function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  }

//beim Laden der Seite wird das Football-Feld gemalt
window.onload = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    loadBackground();
  };

//Funktion um den Hintergrund wiederherzustellen
function loadBackground(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = new Image();
    img.src = 'images/field_scaled.png';
    img.onload = function() {
        ctx.drawImage(img, 50, 50);
    }
}


function mousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return [
        (e.clientX - rect.left) * (canvas.width / rect.width),
        (e.clientY - rect.top) * (canvas.height / rect.height),
    ];
}

canvas.addEventListener("mousedown", (e) => {
    mousePressed = true;
    draw(e);
});

canvas.addEventListener("mousemove", (e) => {
    if (mousePressed) {
        draw(e);
    }
});

canvas.addEventListener("mouseleave", () => {
    lastPos = null;
});

document.addEventListener("mouseup", (e) => {
    mousePressed = false;
    lastPos = null;
});

//Clear-Button
document.getElementById("clearBtn").addEventListener("click", () => {
    socket.emit("clearCanvas");
});

document.getElementById("arrowBtn").addEventListener("click", () => {
    drawArrow();
});

socket.on("clearCanvas", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    loadBackground();
});

document.querySelectorAll(".colorSquare").forEach((square) => {
    square.addEventListener("click", () => {
        drawColor = square.style.backgroundColor;
        document.querySelectorAll(".widthExample").forEach((ex) => {
            ex.style.backgroundColor = drawColor;
        });
    });
});

document.querySelectorAll(".widthExample").forEach((ex) => {
    ex.addEventListener("click", () => {
        lineWidth = ex.clientWidth;
        document.querySelectorAll(".widthExample").forEach((other) => {
            other.style.opacity = 0.4;
        });
        ex.style.opacity = 1;
    });
});

socket.on("socketNumber", (number) => {
    document.getElementById("counter").innerText = number;
});

