var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function drawBoard() {
  // canvas grid
  var bw = canvas.width; // Box width
  var bh = canvas.height; // Box height
  var p = 10; // Padding

  for (var x = 0; x <= bw; x += 30) {
    ctx.moveTo(0.5 + x + p, p);
    ctx.lineTo(0.5 + x + p, bh + p);
  }

  for (var x = 0; x <= bh; x += 30) {
    ctx.moveTo(p, 0.5 + x + p);
    ctx.lineTo(bw + p, 0.5 + x + p);
  }
  ctx.strokeStyle = "lightblue";
  ctx.stroke();
}

drawBoard();

function fillCanvasBorder() {
  // fill grid colors to canvas
  //top
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, 55);
  ctx.fillStyle = "#FFFFDA";
  ctx.fill();

  //bottom
  ctx.beginPath();
  ctx.rect(0, canvas.height - 50, canvas.width, 55);
  ctx.fillStyle = "#FFFFDA";
  ctx.fill();

  //left
  ctx.beginPath();
  ctx.rect(0, 0, 55, 555);
  ctx.fillStyle = "#FFFFDA";
  ctx.fill();

  //right
  ctx.beginPath();
  ctx.rect(canvas.width - 55, 0, 55, 555);
  ctx.fillStyle = "#FFFFDA";
  ctx.fill();
}

fillCanvasBorder();

// let img = document.createElement("img");
// img.src = "/web.jpg";
// img.addEventListener("load", () => {
//   for (let x = 210; x < 400; x += 30) {
//     ctx.drawImage(img, x, 10);
//   }
// });

//report the mouse position on click
canvas.addEventListener(
  "click",
  function (evt) {
    var mousePos = getMousePos(canvas, evt);
    document.getElementById("x-axis").value = mousePos.x;
    document.getElementById("y-axis").value = mousePos.y;
  },
  false
);

//Get Mouse Position
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}
// var img = new Image();
// function createImage() {
//   //var img = new Image();
//   img.onload = function () {
//     ctx.drawImage(
//       img,
//       canvas.width / 2 - 150,
//       canvas.height / 2 - 150,
//       img.width,
//       img.height
//     );
//   };
//   img.src = "/web.jpg";
// }

// createImage();

var isDraggable;
var star_img = new Image();

currentX = canvas.width / 2;
currentY = canvas.height / 2;

star_img.src = "/web.jpg";

console.log(star_img.width)
console.log(star_img.height)

setInterval(function () {
  _ResetCanvas();
  _DrawImage();
}, 1000 / 30);

function _ResetCanvas() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fillCanvasBorder();
  drawBoard();
}

function _DrawImage() {
  let x = currentX - star_img.width / 2;
  let y = currentY - star_img.height / 2;
  ctx.drawImage(star_img, x, y);
}

function _Go() {
  setInterval(function () {
    _DrawImage();
  }, 1000 / 30);
}

star_img.onload = function () {
  _Go();
};

canvas.onmousedown = function (e) {
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  if (
    mouseX >= currentX - star_img.width / 2 &&
    mouseX <= currentX + star_img.width / 2 &&
    mouseY >= currentY - star_img.height / 2 &&
    mouseY <= currentY + star_img.height / 2
  ) {
    isDraggable = true;
  }
};

canvas.onmouseup = function (e) {
  isDraggable = false;
};

canvas.onmouseout = function (e) {
  isDraggable = false;
};

canvas.onmousemove = function (e) {
  if (isDraggable) {
    currentX = e.pageX - this.offsetLeft;
    currentY = e.pageY - this.offsetTop;
  }
};

// const input = document.getElementById("len");
// const log = document.getElementById("wid");

// input.addEventListener("input", updateValue);

// function updateValue(e) {
//   log.textContent = e.target.value;
// }

// -------------------Konova.JS-----------------------------------

// var width = 800; //window.innerWidth;
// var height = 520; //window.innerHeight;

// function update(activeAnchor) {
//   var group = activeAnchor.getParent();

//   var topLeft = group.get(".topLeft")[0];
//   var topRight = group.get(".topRight")[0];
//   var bottomRight = group.get(".bottomRight")[0];
//   var bottomLeft = group.get(".bottomLeft")[0];
//   var image = group.get("Image")[0];

//   var anchorX = activeAnchor.getX();
//   var anchorY = activeAnchor.getY();

//   // update anchor positions
//   switch (activeAnchor.getName()) {
//     case "topLeft":
//       topRight.y(anchorY);
//       bottomLeft.x(anchorX);
//       break;
//     case "topRight":
//       topLeft.y(anchorY);
//       bottomRight.x(anchorX);
//       break;
//     case "bottomRight":
//       bottomLeft.y(anchorY);
//       topRight.x(anchorX);
//       break;
//     case "bottomLeft":
//       bottomRight.y(anchorY);
//       topLeft.x(anchorX);
//       break;
//   }

//   image.position(topLeft.position());

//   var width = topRight.getX() - topLeft.getX();
//   var height = bottomLeft.getY() - topLeft.getY();
//   if (width && height) {
//     image.width(width);
//     image.height(height);
//   }
// }

// function addAnchor(group, x, y, name) {
//   var stage = group.getStage();
//   var layer = group.getLayer();

//   var anchor = new Konva.Circle({
//     x: x,
//     y: y,
//     stroke: "#666",
//     fill: "#ddd",
//     strokeWidth: 2,
//     radius: 8,
//     name: name,
//     draggable: true,
//     dragOnTop: false,
//   });

//   anchor.on("dragmove", function () {
//     update(this);
//     layer.draw();
//   });
//   anchor.on("mousedown touchstart", function () {
//     group.draggable(false);
//     this.moveToTop();
//   });
//   anchor.on("dragend", function () {
//     group.draggable(true);
//     layer.draw();
//   });
//   // add hover styling
//   anchor.on("mouseover", function () {
//     var layer = this.getLayer();
//     document.body.style.cursor = "pointer";
//     this.strokeWidth(4);
//     layer.draw();
//   });
//   anchor.on("mouseout", function () {
//     var layer = this.getLayer();
//     document.body.style.cursor = "default";
//     this.strokeWidth(2);
//     layer.draw();
//   });

//   group.add(anchor);
// }

// var stage = new Konva.Stage({
//   container: "container",
//   width: width,
//   height: height,
// });

// var layer = new Konva.Layer();
// stage.add(layer);

// // darth vader
// var darthVaderImg = new Konva.Image({
//   width: 200,
//   height: 200,
// });

// var darthVaderGroup = new Konva.Group({
//   x: 400,
//   y: 50,
//   draggable: true,
// });
// layer.add(darthVaderGroup);
// darthVaderGroup.add(darthVaderImg);

// addAnchor(darthVaderGroup, 0, 0, "topLeft");
// addAnchor(darthVaderGroup, 200, 0, "topRight");
// addAnchor(darthVaderGroup, 200, 200, "bottomRight");
// addAnchor(darthVaderGroup, 0, 200, "bottomLeft");

// var imageObj1 = new Image();
// imageObj1.onload = function () {
//   darthVaderImg.image(imageObj1);
//   layer.draw();
// };
// imageObj1.src = "/web.jpg";

// yoda
// var yodaImg = new Konva.Image({
//   width: 93,
//   height: 104,
// });

// var yodaGroup = new Konva.Group({
//   x: 100,
//   y: 110,
//   draggable: true,
// });
// layer.add(yodaGroup);
// yodaGroup.add(yodaImg);
// addAnchor(yodaGroup, 0, 0, "topLeft");
// addAnchor(yodaGroup, 93, 0, "topRight");
// addAnchor(yodaGroup, 93, 104, "bottomRight");
// addAnchor(yodaGroup, 0, 104, "bottomLeft");

// var imageObj2 = new Image();
// imageObj2.onload = function () {
//   yodaImg.image(imageObj2);
//   layer.draw();
// };
// imageObj2.src = "/body.png";

// var downloadImg = new Konva.Image({
//   x: 200,
//   y: 0,
//   image: imageObj,
//   width: 300,
//   height: 300,
// });

// var downloadGroup = new Konva.Group({
//   x: 100,
//   y: 110,
//   draggable: true,
// });
// layer.add(downloadGroup);

// layer.add(downloadGroup);
// downloadGroup.add(downloadImg);
// addAnchor(downloadGroup, 200, 0, "topLeft");
// addAnchor(downloadGroup, 370, 0, "topRight");
// addAnchor(downloadGroup, 200, 120, "bottomLeft");
// addAnchor(downloadGroup, 370, 120, "bottomRight");

// var imageObj = new Image();
// imageObj.onload = function () {
//   downloadImg.image(imageObj);
//   layer.draw();
// };
// imageObj.src = '/download.png';

// //merge.js
// mergeImages(["/body.png", "/web.jpg"]).then(
//   (b64) => (document.querySelector("img").src = b64)
// );
