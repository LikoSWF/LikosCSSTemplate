var img = document.getElementById("image");
var c = document.getElementById("canvas");

img.onload = draw(img);

// updates selected filter under these conditions
window.onresize = window.onload = img.onload = function changeCanvasSize() {
  canvas.height = img.height;
  canvas.width = img.width;
  draw();
};

function draw() {
  var imgH = canvas.height;
  var imgW = canvas.width;
  console.log("Width: "+imgW+"\tHeight: "+imgH+"\tRes: "+imgW*imgH);
  var ctx = c.getContext("2d");
  ctx.drawImage(img, 0, 0, imgW, imgH);
  var imgData = ctx.getImageData(0, 0, imgW, imgH);
  var data = imgData.data;
  console.time("FilterTime");
  // bnw(data);
  // lite(data, imgW, imgH, 1);
  bayer(data, imgW, imgH, 1,3);
  console.timeEnd("FilterTime");
  ctx.putImageData(imgData, 0, 0);
  console.log("-----------------------------");
}

// ==================================== //
// FILTERS
// ==================================== //

function threshold(img) {
  var step = 3;
  var step = 256 / step;
  for (var a = 0; a < 3; a++) {
    for (var p = 0; p < img.length; p += 4) {
      var d = img[p + a];
      img[p + a] = Math.round(d / step) * step;
    }
  }
}

function bnw(img) {
  for (var p = 0; p < img.length; p += 4) {
    img[p] = img[p + 1] = img[p + 2] = (img[p] + img[p + 1] + img[p + 2]) / 3;
  }
}

function lite(img, w, h, s = 1, e = 5 / 6) {
  var step = 256 / s;
  var col = 4;
  var row = w << 2;
  for (var i = 0; i < img.length; i++) {
    var oldPix = img[i];
    var newPix = Math.round(img[i] / step) * step;
    var err = oldPix - newPix;
    img[i] = newPix;
    img[i + col] += (err >> 1) * e;
    img[i + row - col] += (err >> 2) * e;
    img[i + row] += (err >> 2) * e;
  }
}

function bayer(img, w, h, s = 1, e = 1) {
  var step = 256 / s;
  var row = w << 2;
  var matrix = bayerMatrix(e);
  // console.log(matrix);
  var mW = matrix.length;
  for (var i = 0; i < img.length; i++) {
    if (img[i]%step > matrix[parseInt(i/row) % mW][parseInt((i/4))%mW]/s) {
      img[i] = parseInt(parseInt((img[i] + step) / step) * step);
    } else {
      img[i] = parseInt(parseInt(img[i] / step) * step);
    }
  }
}

function bayerMatrix(size) {
  console.time("Generating Matrix");
  var m = [[1]];

  // Size of Bayer matrix
  for (var s = 0; s < size; s++) {
    var w = m.length;
    var step = w * w;
    w <<= 1;
    var bigM = [];
    for (var i = 0; i < w; i++) bigM.push([]);

    // Expands values to new matrix
    for (var y = 0; y < w; y += 2) {
      for (var x = 0; x < w; x += 2) {
        var num = m[y >> 1][x >> 1];
        bigM[y][x] = num;
        bigM[y][x + 1] = num + 2 * step;
        bigM[y + 1][x] = num + 3 * step;
        bigM[y + 1][x + 1] = num + step;
      }
    }
    m = bigM;
  }

  // Multiply matrix by weight and offset values by half
  weight = 256 / (w * w);
  for (var y = 0; y < w; y++) {
    for (var x = 0; x < w; x++) {
      m[y][x] = m[y][x] * weight - (weight >> 1);
    }
  }
  console.timeEnd("Generating Matrix");
  return m;
}

/*
var bayer3 = [
  [1, 33, 9, 41, 3, 35, 11, 43],
  [49, 17, 57, 25, 51, 19, 59, 27],
  [13, 45, 5, 37, 15, 47, 7, 39],
  [61, 29, 53, 21, 63, 31, 55, 23],
  [4, 36, 12, 44, 2, 34, 10, 42],
  [52, 20, 60, 28, 50, 18, 58, 26],
  [16, 48, 8, 40, 14, 46, 6, 38],
  [64, 32, 56, 24, 62, 30, 54, 22]
];
var bayer2 = [
  [1, 9, 3, 11],
  [13, 5, 15, 7],
  [4, 12, 2, 10],
  [16, 8, 14, 6]
];
var bayer1 = [
  [1, 3],
  [4, 2]
];
*/