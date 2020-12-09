var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// ctx.beginPath();
// ctx.moveTo(0, 0);
// ctx.lineTo(600, 300);
// ctx.stroke();

// ctx.beginPath();
// ctx.moveTo(600, 0);
// ctx.lineTo(0, 300);
// ctx.stroke();

// ctx.font = "30px Arial";
// ctx.fillText("MyCaseBuilder", 200, 50);

// Konova.JS
var width = 800; //window.innerWidth;
var height = 500; //window.innerHeight;

function update(activeAnchor) {
  var group = activeAnchor.getParent();

  var topLeft = group.get(".topLeft")[0];
  var topRight = group.get(".topRight")[0];
  var bottomRight = group.get(".bottomRight")[0];
  var bottomLeft = group.get(".bottomLeft")[0];
  var image = group.get("Image")[0];

  var anchorX = activeAnchor.getX();
  var anchorY = activeAnchor.getY();

  // update anchor positions
  switch (activeAnchor.getName()) {
    case "topLeft":
      topRight.y(anchorY);
      bottomLeft.x(anchorX);
      break;
    case "topRight":
      topLeft.y(anchorY);
      bottomRight.x(anchorX);
      break;
    case "bottomRight":
      bottomLeft.y(anchorY);
      topRight.x(anchorX);
      break;
    case "bottomLeft":
      bottomRight.y(anchorY);
      topLeft.x(anchorX);
      break;
  }

  image.position(topLeft.position());

  var width = topRight.getX() - topLeft.getX();
  var height = bottomLeft.getY() - topLeft.getY();
  if (width && height) {
    image.width(width);
    image.height(height);
  }
}
function addAnchor(group, x, y, name) {
  var stage = group.getStage();
  var layer = group.getLayer();

  var anchor = new Konva.Circle({
    x: x,
    y: y,
    stroke: "#666",
    fill: "#ddd",
    strokeWidth: 2,
    radius: 8,
    name: name,
    draggable: true,
    dragOnTop: false,
  });

  anchor.on("dragmove", function () {
    update(this);
    layer.draw();
  });
  anchor.on("mousedown touchstart", function () {
    group.draggable(false);
    this.moveToTop();
  });
  anchor.on("dragend", function () {
    group.draggable(true);
    layer.draw();
  });
  // add hover styling
  anchor.on("mouseover", function () {
    var layer = this.getLayer();
    document.body.style.cursor = "pointer";
    this.strokeWidth(4);
    layer.draw();
  });
  anchor.on("mouseout", function () {
    var layer = this.getLayer();
    document.body.style.cursor = "default";
    this.strokeWidth(2);
    layer.draw();
  });

  group.add(anchor);
}

var stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height,
});

var layer = new Konva.Layer();
stage.add(layer);

// darth vader
var darthVaderImg = new Konva.Image({
  width: 200,
  height: 200,
});

// yoda
var yodaImg = new Konva.Image({
  width: 93,
  height: 104,
});

var darthVaderGroup = new Konva.Group({
  x: 180,
  y: 50,
  draggable: true,
});
layer.add(darthVaderGroup);
darthVaderGroup.add(darthVaderImg);
addAnchor(darthVaderGroup, 0, 0, "topLeft");
addAnchor(darthVaderGroup, 200, 0, "topRight");
addAnchor(darthVaderGroup, 200, 200, "bottomRight");
addAnchor(darthVaderGroup, 0, 200, "bottomLeft");

var yodaGroup = new Konva.Group({
  x: 20,
  y: 110,
  draggable: true,
});
layer.add(yodaGroup);
yodaGroup.add(yodaImg);
addAnchor(yodaGroup, 0, 0, "topLeft");
addAnchor(yodaGroup, 93, 0, "topRight");
addAnchor(yodaGroup, 93, 104, "bottomRight");
addAnchor(yodaGroup, 0, 104, "bottomLeft");

var imageObj1 = new Image();
imageObj1.onload = function () {
  darthVaderImg.image(imageObj1);
  layer.draw();
};
imageObj1.src = "/web.jpg";

var imageObj2 = new Image();
imageObj2.onload = function () {
  yodaImg.image(imageObj2);
  layer.draw();
};
imageObj2.src = "/body.png";

var loaded = 0;

// function imageLoaded() {
//   if (++loaded == 3) {
//     var image = new MarvinImage(image1.getWidth(), image1.getHeight());
//     Marvin.combineByAlpha(image1, image2, image, 0, 0);
//     Marvin.combineByAlpha(image, image3, image, 190, 120);
//     image.draw(canvas);
//   }
// }

// image1 = new MarvinImage();
// image1.load("https://i.imgur.com/ChdMiH7.jpg", imageLoaded);
// image2 = new MarvinImage();
// image2.load("https://i.imgur.com/h3HBUBt.png", imageLoaded);
// image3 = new MarvinImage();
// image3.load("https://i.imgur.com/UoISVdT.png", imageLoaded);

//merge.js
mergeImages(["/body.png", "/web.jpg"]).then(
  (b64) => (document.querySelector("img").src = b64)
);
