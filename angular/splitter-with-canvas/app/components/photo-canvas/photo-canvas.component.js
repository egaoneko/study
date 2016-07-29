'use strict';

angular
    .module('photoCanvas')
    .component('photoCanvas', {
        bindings: {
            width: '@',
            height: '@',
        },
        templateUrl: 'components/photo-canvas/photo-canvas.template.html',
        controller: CanvasController
    });

function CanvasController($scope, $element, $attrs, $timeout, $log, Window) {
    var self = this;
    var parentElement = $element[0].parentElement;
    var windowPadding = 8;

    this.width = parentElement.offsetWidth - windowPadding;
    this.height = parentElement.offsetHeight - windowPadding;
    this.canvas = document.getElementsByTagName('canvas')[0];

    var photo = new Image(); // 화면에 보여질 사진

    // 마우스 이벤트 변수
    var mouseIsDown = false, // 마우스가 클릭된 상태
        beforeMouseX = 0, // 이전 마우스 X 좌표
        beforeMouseY = 0; // 이전 마우스 Y 좌표

    var miniMapWidth = 150,
        miniMapHeight = 150;

    // 사진 로드 후 화면 출력
    $timeout(function() {
        self.width = parentElement.offsetWidth - windowPadding;
        self.height = parentElement.offsetHeight - windowPadding;
        photo.addEventListener('load', draw, false);
        photo.src = Window.src;
    });

    // 사진 변경 추적
    $scope.$watch(
        function() {
            return Window.src;
        },
        function(value) {
            photo.src = value;
            Window.reset();
        }
    )

    // Splitter 크기 변환 시 캔버스 크기 변환
    $scope.$watch(
        function() {
            return [parentElement.offsetWidth, parentElement.offsetHeight].join('x');
        },
        function() {
            self.canvas.width = parentElement.offsetWidth - windowPadding;
            self.canvas.height = parentElement.offsetHeight - windowPadding;
            draw();
        }
    )

    // 화면 출력
    var draw = function() {
        if (self.canvas.getContext) {
            var ctx = self.canvas.getContext('2d');

            var windowX = Window.windowX,
                windowY = Window.windowY,
                centerX = Math.floor(windowX + self.canvas.width / 2),
                centerY = Math.floor(windowY + self.canvas.height / 2),
                currentScale = Window.currentScale.toFixed(2),
                canvasWidth = self.canvas.width,
                canvasHeight = self.canvas.height;

            var positionText = "X : " + windowX + ", " + "Y : " + windowY,
                positionCenterText = "CenterX : " + centerX + ", " + "Center Y : " + centerY,
                scaleText = "CurrentScale : " + currentScale;

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
        var windowWidth = self.canvas.width,
            windowHeight = self.canvas.height,
            currentScale = Window.currentScale;
        ctx.drawImage(photo, Window.windowX, Window.windowY, windowWidth * currentScale, windowHeight * currentScale, 0, 0, windowWidth, windowHeight);
    }

    // 미니맵 출력
    var drawMiniMap = function(ctx) {
        var canvasWidth = self.canvas.width,
            canvasHeight = self.canvas.height,
            scaledWindowWidth = Math.floor(canvasWidth * Window.currentScale),
            scaledWindowHeight = Math.floor(canvasHeight * Window.currentScale),
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
        var miniMapWindowX = Window.windowX * miniMapWidth / photo.width;
        var miniMapWindowY = Window.windowY * miniMapHeight / photo.height;

        // 미니맵 출력
        ctx.save();
        ctx.strokeStyle = "red";
        ctx.strokeRect(miniMapX + miniMapWindowX, miniMapY + miniMapWindowY,
            miniMapWindowWidth, miniMapWindowHeight);
        ctx.restore();
    }

    // 이동 가능 범위 이상을 움직였는지 확인 및 수정
    var checkWindowXMinMax = function(windowX) {
        var scaledWindowWidth = Math.floor(self.canvas.width * Window.currentScale),
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
        var scaledWindowHeight = Math.floor(self.canvas.height * Window.currentScale),
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
        var minScale = Window.minScale,
            maxScale = Window.maxScale;

        if (scale < minScale) {
            return minScale;
        }

        if (scale > maxScale) {
            return maxScale;
        }
        return scale;
    }

    var setWerp = function(x, y, scale) {
        Window.windowX = checkWindowXMinMax(x);
        Window.windowY = checkWindowYMinMax(y);
        Window.currentScale = checkScaleMinMax(scale);
        draw();
    }

    self.canvas.onmousemove = function(e) {
        var mouseX = e.clientX - self.canvas.offsetLeft,
            mouseY = e.clientY - self.canvas.offsetTop;

        if (mouseIsDown) {
            var diffMouseX = mouseX - beforeMouseX,
                diffMouseY = mouseY - beforeMouseY,
                windowX = Window.windowX,
                windowY = Window.windowY;

            windowX -= diffMouseX;
            windowY -= diffMouseY;
            beforeMouseX = mouseX;
            beforeMouseY = mouseY;

            Window.windowX = checkWindowXMinMax(windowX);
            Window.windowY = checkWindowYMinMax(windowY);
            draw();

            // For firing $watch
            $scope.$apply();
        }

        return false;
    };

    self.canvas.onmousedown = function(e) {
        var mouseX = e.clientX - self.canvas.offsetLeft,
            mouseY = e.clientY - self.canvas.offsetTop;

        beforeMouseX = mouseX;
        beforeMouseY = mouseY;
        mouseIsDown = true;
    }

    self.canvas.onmouseup = function(e) {
        mouseIsDown = false;
    }

    self.canvas.onmouseout = function(e) {
        mouseIsDown = false;
    }

    self.canvas.onmousewheel = function(e) {
        var scaleInterval = Window.scaleInterval,
            scale = Window.currentScale;

        if (e.wheelDelta < 0) {
            scale -= scaleInterval;
        } else {
            scale += scaleInterval;
        }

        Window.currentScale = checkScaleMinMax(scale);

        if (scale != Window.currentScale) {
            return;
        }

        var mouseX = e.clientX - self.canvas.offsetLeft,
            mouseY = e.clientY - self.canvas.offsetTop,
            windowX = Window.windowX,
            windowY = Window.windowY;

        if (e.wheelDelta < 0) {
            windowX += Math.floor(mouseX / 50);
            windowY += Math.floor(mouseY / 50);
        } else {
            windowX -= Math.floor(mouseX / 50);
            windowY -= Math.floor(mouseY / 50);
        }

        Window.windowX = checkWindowXMinMax(windowX);
        Window.windowY = checkWindowYMinMax(windowY);
        draw();

        // For firing $watch
        $scope.$apply();
    }

    self.canvas.onclick = function(e) {
        var mouseX = e.clientX - self.canvas.offsetLeft,
            mouseY = e.clientY - self.canvas.offsetTop;

        var canvasWidth = self.canvas.width,
            canvasHeight = self.canvas.height,
            scaledWindowWidth = Math.floor(canvasWidth * Window.currentScale),
            scaledWindowHeight = Math.floor(canvasHeight * Window.currentScale),
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

            setWerp(centerX, centerY, Window.currentScale);

            // For firing $watch
            $scope.$apply();
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
