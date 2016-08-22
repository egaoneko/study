// Code goes here

var type = 0;
var moveElement = document.getElementById('move');
var scaleElement = document.getElementById('scale');
var canvas = document.getElementById('canvasOne');
var ctx = canvas.getContext('2d');

// var size = 10;
var size = 5;
// var rectSize = 62500;
var rectSize = 250000;
var list = [];
var move = 0;
var scale = 1;

for (var x = 0; x < rectSize; x ++) {
  var rectCanvas = document.createElement('canvas');
  var rectCtx = rectCanvas.getContext('2d');
  rectCanvas.width  = size;
  rectCanvas.height = size;
  rectCtx.fillStyle = '#'+Math.round(0xffffff * Math.random()).toString(16);
  rectCtx.fillRect(0, 0, size, size);
  list.push(rectCanvas);
}
  
function init(t) {
  type = t;
  each(t);
}

function each(type) {
  var sTime = Date.now();
  draw(type);
  var timeDiff = Date.now() - sTime;
  document.getElementById('time').textContent = timeDiff;
}

function all() {
  each(1);
  for(var i = 1; i < 5; i++){
    document.getElementById('time' + i).textContent = getAvg(10, i);
  }
}

function getAvg(times, type) {
  var sum = 0
  for(var i = 0; i < times; i++) {
    var sTime = Date.now();
    each(type);
    sum += (Date.now() - sTime);
  }
  return sum/times;
}

function draw(type) {
  var i = 0;
  var inc = size * scale * 2;
  // ctx.fillStyle = '#ffffff';
  // ctx.fillRect(0, 0, 5000, 5000);
  ctx.clearRect(0, 0, 5000, 5000);

  if(type==4){
    ctx.setTransform(scale, 0, 0, scale, move, move);
    inc = size * 2;
  }
  for (var r = 0; r < 5000; r += inc) {
    for (var c = 0; c < 5000; c += inc) {
      var rect = list[i++];
      
      ctx.save();
      drawImg(type, rect, r, c, size);
      ctx.restore();
      
      if(i > list.length) {
        return;
      }
    }
  }
}

function drawImg(type, img, r, c, s) {
  var movedR = r + move;
  var movedC = c + move;
  var scaledS = s * scale;
 
  switch(type) {
    case 1:
      ctx.drawImage(img, movedC, movedR);
      break;
    case 2:
      ctx.drawImage(img, movedC, movedR, scaledS, scaledS);
      break;
    case 3:
      ctx.drawImage(img, 0, 0, size, size, movedC, movedR, scaledS, scaledS);
      break;
    case 4:
      ctx.drawImage(img, c, r);
      break;
  }
}

moveElement.addEventListener('change', function(e) {
  var v = parseInt(e.target.value);
  if (v) {
    move = v;
  }
  
  if(type == 0) {
    all();
  } else {
    each(type);
  }
}, false);

scaleElement.addEventListener('change', function(e) {
  if(type == 1) {
    return;
  }
  
  var v = parseInt(e.target.value);
  if (v) {
    scale = v;
  }
  if(type == 0) {
    all();
  } else {
    each(type);
  }
}, false);

document.getElementById('start').addEventListener('click', function() {
  all();
}, false);