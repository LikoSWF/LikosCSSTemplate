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
  console.log(imgH);
  console.log(imgW);
  var ctx = c.getContext("2d");
  ctx.drawImage(img, 0, 0, imgW, imgH);
  var imgData = ctx.getImageData(0, 0, imgW, imgH);
  var data = imgData.data;
  console.time("FilterTime");
	// bnw(data);
	// lite(data, imgW, imgH);
	bayer(data, imgW, imgH);
  console.timeEnd("FilterTime");
  ctx.putImageData(imgData, 0, 0);
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
	var bayer3 = [
		[ 1,33, 9,41, 3,35,11,43],
		[49,17,57,25,51,19,59,27],
		[13,45, 5,37,15,47, 7,39],
		[61,29,53,21,63,31,55,23],
		[ 4,36,12,44, 2,34,10,42],
		[52,20,60,28,50,18,58,26],
		[16,48, 8,40,14,46, 6,38],
		[64,32,56,24,62,30,54,22]
	]
  var bayer = [
    [ 1, 9, 3,11],
    [13, 5,15, 7],
    [ 4,12, 2,10],
    [16, 8,14, 6]
	];
	var bayer2 = [
		[1,3],
		[4,2]
	]
	for(var y = 0; y < 4; y++){
		for(var x = 0; x < 4; x++){
			bayer[y][x] = bayer[y][x] * 15;
		}
	}
	for(var y = 0; y < 8; y++){
		for(var x = 0; x < 8; x++){
			bayer3[y][x] = bayer3[y][x] * 4;
		}
	}
	console.log(bayer3);
	var step = 256 / s;
  var col = 4;
  var row = w << 2;
	for (var i = 0; i < img.length; i++) {
		if(img[i] > bayer3[Math.floor(i/col%w)%8][Math.floor(i/col/w)%8]){
			img[i] = 255;
		}
		else{
			img[i] = 0;
		}
		

  }
}
