// Code goes here

function draw(isClearRect) {
    var canvas = document.getElementById('tutorial');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        
        if (isClearRect) {
          ctx.setTransform(1, 0.5, 0.5, 1, 0, 0);
        } else {
          canvas.width = canvas.width;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRects(ctx);
    }
    
    function drawRects(ctx) {
        ctx.fillStyle = "rgb(200, 0, 0)";
        ctx.fillRect(10, 10, 55, 50);
        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect(30, 30, 55, 50);
    }
    
    function checkSelectBox(e) {
      console.dir(e);
      if(e.target.selectedIndex == 0) {
        draw(true);
      } else {
        draw(false);
      }
    }
    document.getElementById("selectBox").addEventListener('change', checkSelectBox, false);
}