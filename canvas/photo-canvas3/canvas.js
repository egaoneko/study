var canvasApp = function() {
    var windowX = 0, // 사진 내 화면 X 좌표
        windowY = 0, // 사진 내 화면 Y 좌표
        currentScale = 1, // 현재 스케일 크기
        minScale = .5, // 스케일 최소 크기
        maxScale = 2, // 스케일 최대 크기
        scaleInterval = .02; // 스케일 크기 증감폭

    var canvas = document.getElementById('canvas'),
        photo = new Image(); // 화면에 보여질 사진
    photo.onload = function() {
        draw();
    }
    photo.src = "butterfly.jpg";

    // 마우스 이벤트 변수
    var mouseIsDown = false, // 마우스가 클릭된 상태
        beforeMouseX = 0, // 이전 마우스 X 좌표
        beforeMouseY = 0; // 이전 마우스 Y 좌표

    var miniMapWidth = 150,
        miniMapHeight = 150;

    // 화면 출력
    var draw = function() {
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');

            var centerX = Math.floor(windowX + canvas.width / 2),
                centerY = Math.floor(windowY + canvas.height / 2),
                roundedCurrentScale = Math.round(currentScale * 100) / 100,
                canvasWidth = canvas.width,
                canvasHeight = canvas.height;

            var positionText = "X : " + windowX + ", " + "Y : " + windowY,
                positionCenterText = "CenterX : " + centerX + ", " + "Center Y : " + centerY,
                scaleText = "CurrentScale : " + roundedCurrentScale;

            // 배경 설정
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            // 화면 출력
            ctx.save();
            drawPhoto(ctx);
            ctx.restore();

            // 좌표 화면 설정
            ctx.save();
            ctx.globalAlpha = 0.5;
            ctx.fillRect(0, 0, 200, 70);
            ctx.restore();

            // 좌표 출력
            ctx.save();
            ctx.fillStyle = "red";
            ctx.fillText(positionText, 10, 15);
            ctx.fillText(positionCenterText, 10, 35);
            ctx.fillText(scaleText, 10, 55);
            ctx.restore();

            // 미니맵 출력
            ctx.save();
            drawMiniMap(ctx);
            ctx.restore();
        }
    }

    // 사진 출력
    var drawPhoto = function(ctx) {
        var windowWidth = canvas.width,
            windowHeight = canvas.height;
        ctx.drawImage(photo, windowX, windowY, windowWidth * currentScale, windowHeight * currentScale, 0, 0, windowWidth, windowHeight);
    }

    // 미니맵 출력
    var drawMiniMap = function(ctx) {
        var canvasWidth = canvas.width,
            canvasHeight = canvas.height,
            scaledWindowWidth = Math.floor(canvasWidth * currentScale),
            scaledWindowHeight = Math.floor(canvasHeight * currentScale),
            miniMapX = canvasWidth - miniMapWidth,
            miniMapY = 0;

        // 미니맵 배경 출력
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.fillRect(miniMapX, miniMapY, miniMapWidth, miniMapHeight);
        ctx.globalAlpha = 0.3;
        ctx.drawImage(photo, miniMapX, miniMapY, miniMapWidth, miniMapHeight);
        ctx.restore();

        // 미니맵 윈도우 크기
        // miniMapWindowWidth : windowWidth = miniMapWidth : photoWidth
        var miniMapWindowWidth = scaledWindowWidth * miniMapWidth / photo.width;
        var miniMapWindowHeight = scaledWindowHeight * miniMapHeight / photo.height;

        // 미니맵 윈도우 위치
        // miniMapWindowX : windowX = miniMapWidth : photoWidth
        var miniMapWindowX = windowX * miniMapWidth / photo.width;
        var miniMapWindowY = windowY * miniMapHeight / photo.height;

        // 미니맵 출력
        ctx.save();
        ctx.strokeStyle = "red";
        ctx.strokeRect(miniMapX + miniMapWindowX, miniMapY + miniMapWindowY,
            miniMapWindowWidth, miniMapWindowHeight);
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

    // 스케일 크기 확인
    var checkScaleMinMax = function(scale) {
        if (scale < minScale) {
            return minScale;
        }

        if (scale > maxScale) {
            return maxScale;
        }
        return scale;
    }

    var setWerp = function(x, y, scale) {
        windowX = checkWindowXMinMax(x);
        windowY = checkWindowYMinMax(y);
        currentScale = checkScaleMinMax(scale);
        draw();
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

            // windowX = checkWindowXMinMax(windowX);
            // windowY = checkWindowYMinMax(windowY);
            draw();
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

    canvas.onmousewheel = function(e) {
        var scale = currentScale;

        if (e.wheelDelta < 0) {
            scale -= scaleInterval;
        } else {
            scale += scaleInterval;
        }

        currentScale = checkScaleMinMax(scale);

        if (scale != currentScale) {
            return;
        }

        var mouseX = e.clientX - canvas.offsetLeft,
            mouseY = e.clientY - canvas.offsetTop;

        // if (e.wheelDelta < 0) {
        //     windowX += Math.floor(mouseX / 50);
        //     windowY += Math.floor(mouseY / 50);
        // } else {
        //     windowX -= Math.floor(mouseX / 50);
        //     windowY -= Math.floor(mouseY / 50);
        // }

        // windowX = checkWindowXMinMax(windowX);
        // windowY = checkWindowYMinMax(windowY);
        draw();
    }

    canvas.onclick = function(e) {
        var mouseX = e.clientX - canvas.offsetLeft,
            mouseY = e.clientY - canvas.offsetTop;

        var canvasWidth = canvas.width,
            canvasHeight = canvas.height,
            scaledWindowWidth = Math.floor(canvasWidth * currentScale),
            scaledWindowHeight = Math.floor(canvasHeight * currentScale),
            miniMapX = canvasWidth - miniMapWidth,
            miniMapY = 0;

        // 마우스로 미니맵 클릭시 이동
        if (isMouseInMiniMap(miniMapX, miniMapY, mouseX, mouseY)) {
            var miniMapMouseX = mouseX - miniMapX,
                miniMapMouseY = mouseY - miniMapY,
                // miniMapMouseX : windowX = miniMapWidth : photoWidth
                windowX = miniMapMouseX * photo.width / miniMapWidth,
                windowY = miniMapMouseY * photo.height / miniMapHeight,
                centerX = Math.floor(windowX - scaledWindowWidth / 2),
                centerY = Math.floor(windowY - scaledWindowHeight / 2);

            setWerp(centerX, centerY, currentScale);
        }
    }

    // 마우스가 미니맵 안에 있는지 확인
    var isMouseInMiniMap = function(miniMapX, miniMapY, mouseX, mouseY) {
        if (mouseX < miniMapX || mouseX > miniMapX + miniMapWidth) {
            return false;
        }

        if (mouseY < miniMapY || mouseY > miniMapY + miniMapHeight) {
            return false;
        }

        return true;
    }
}
