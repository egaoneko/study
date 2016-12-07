var canvasApp = function() {
    var windowX = 0, // 이미지 내 화면 X 좌표
        windowY = 0, // 이미지 내 화면 Y 좌표
        currentScale = 1, // 현재 스케일 크기
        minScale = .5, // 스케일 최소 크기
        maxScale = 2, // 스케일 최대 크기
        scaleInterval = .02; // 스케일 크기 증감폭

    // 마우스 이벤트 변수
    var mouseIsDown = false, // 마우스가 클릭된 상태
        beforeMouseX = 0, // 이전 마우스 X 좌표
        beforeMouseY = 0; // 이전 마우스 Y 좌

    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        photo = new Image(); // 화면에 보여질 이미지

    var cvsUtils = new canvasUtils();

    var imgArrs = new Array(256);

    for (var row = 0; row < 15; row++) {
        for (var col = 0; col < 15; col++) {
            var img = new Image();
            img.src = "butterflies/butterfly [www.imagesplitter.net]-" + row +"-" + col +".jpeg"
            imgArrs[row*16+col] = img;
        }
    }

    console.dir(imgArrs);

    if (!cvsUtils.canvasSupport() || !canvas.getContext) {
    return;
    }

    photo.onload = function() {
        render();
    }
    photo.src = "butterfly.jpg";

    // 화면 출력
    var render = function() {

        var canvasWidth = canvas.width,
            canvasHeight = canvas.height;

        // 배경 설정
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        console.log(photo.width);

        // 화면 출력
        drawImage(ctx);
    }

    // 사진 출력
    var drawImage = function(ctx) {
        var windowWidth = canvas.width,
            windowHeight = canvas.height;
        ctx.save();
        ctx.drawImage(photo, windowX, windowY, windowWidth, windowHeight, 0, 0, windowWidth, windowHeight);
        ctx.restore();
    }

    // 이동 가능 범위 이상을 움직였는지 확인 및 수정
    var checkWindowXMinMax = function(windowX) {
        var scaledWindowWidth = Math.floor(canvas.width * currentScale),
            maxX = photo.width - scaledWindowWidth;

        if (windowX < 0) {
            return 0;
        }

        if (windowX > maxX) {
            return maxX;
        }

        return windowX;
    }
    var checkWindowYMinMax = function(windowY) {
        var scaledWindowHeight = Math.floor(canvas.height * currentScale),
            maxY = photo.height - scaledWindowHeight;

        if (windowY < 0) {
            return 0;
        }
        if (windowY > maxY) {
            return maxY;
        }
        return windowY;
    }

    canvas.onmousemove = function(e) {
        var mouseX = e.clientX - canvas.offsetLeft,
            mouseY = e.clientY - canvas.offsetTop;

        if (mouseIsDown) {
            var diffMouseX = mouseX - beforeMouseX,
                diffMouseY = mouseY - beforeMouseY;

            windowX -= diffMouseX;
            windowY -= diffMouseY;
            beforeMouseX = mouseX;
            beforeMouseY = mouseY;

            windowX = checkWindowXMinMax(windowX);
            windowY = checkWindowYMinMax(windowY);
            render();
        }

        return false;
    };

    canvas.onmousedown = function(e) {
        var mouseX = e.clientX - canvas.offsetLeft,
            mouseY = e.clientY - canvas.offsetTop;

        beforeMouseX = mouseX;
        beforeMouseY = mouseY;
        mouseIsDown = true;
    }

    canvas.onmouseup = function(e) {
        mouseIsDown = false;
    }

    canvas.onmouseout = function(e) {
        mouseIsDown = false;
    }
}
