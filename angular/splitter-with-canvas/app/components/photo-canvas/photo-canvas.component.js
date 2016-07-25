'use strict';

function CanvasController($scope, $element, $attrs, $timeout, $log, Photo) {
    var self = this;
    var parentElement = $element[0].parentElement;

    this.width = parentElement.offsetWidth - 8;
    this.height = parentElement.offsetHeight - 8;
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.photos = Photo.query();

    var windowX = 0;
    var windowY = 0;
    var currentScale = 1;
    var minScale = .2
    var maxScale = 2;
    var scaleInterval=.02;

    var mouseIsDown = false;
    var beforeMouseX = 0;
    var beforeMouseY = 0;

    var photo = new Image();

    $timeout(function() {
        self.photos.$promise.then(function() {
            photo.addEventListener('load', draw, false);
            photo.src = self.photos[0].src;
        })
    });

    $scope.$watch(
        function() {
            return [parentElement.offsetWidth, parentElement.offsetHeight].join('x');
        },
        function() {
            self.canvas.width = parentElement.offsetWidth - 8;
            self.canvas.height = parentElement.offsetHeight - 8;
            draw();
        }
    )

    var draw = function() {
        if (self.canvas.getContext) {
            var ctx = self.canvas.getContext('2d');
            var positionText = "X : " + windowX + ", " + "Y : " + windowY;
            var positionCenterText = "CenterX : " + Math.floor(windowX + self.canvas.width / 2) + ", " + "Center Y : " + Math.floor(windowY + self.canvas.height / 2);

            //draw a background so we can wee the Canvas edges
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);

            drawPhoto(ctx, self.photos[0]);

            ctx.save();
            ctx.globalAlpha = 0.5;
            ctx.fillRect(0, 0, 200, 50);
            ctx.restore();

            ctx.save();
            ctx.fillStyle = "red";
            ctx.fillText(positionText, 10, 15);
            ctx.fillText(positionCenterText, 10, 35);
            ctx.restore();
        }
    }

    var drawPhoto = function(ctx, value) {
        var windowWidth = self.canvas.width;
        var windowHeight = self.canvas.height;
        ctx.drawImage(photo, windowX, windowY, windowWidth * currentScale, windowHeight * currentScale, 0, 0, windowWidth, windowHeight);
    }

    self.canvas.onmousemove = function(e) {
        var mouseX = e.clientX - self.canvas.offsetLeft;
        var mouseY = e.clientY - self.canvas.offsetTop;

        if (mouseIsDown) {
            var diffMouseX = mouseX - beforeMouseX;
            var diffMouseY = mouseY - beforeMouseY;

            windowX -= diffMouseX;
            windowY -= diffMouseY;
            beforeMouseX = mouseX;
            beforeMouseY = mouseY;

            var scaledWindowWidth = self.canvas.width * currentScale;
            var scaledWindowHeight = self.canvas.height * currentScale;
            var maxX = photo.width - scaledWindowWidth;
            var maxY = photo.height - scaledWindowHeight;

            if (windowX < 0) {
                windowX = 0;
            }

            if (windowX > maxX) {
                windowX = maxX;
            }

            if (windowY < 0) {
                windowY = 0;
            }
            if (windowY > maxY) {
                windowY = maxY;
            }
            draw();
        }

        return false;
    };

    self.canvas.onmousedown = function(e) {
        var mouseX = e.clientX - self.canvas.offsetLeft;
        var mouseY = e.clientY - self.canvas.offsetTop;

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
        if (e.wheelDelta < 0) {
            currentScale -= scaleInterval;
        } else {
            currentScale += scaleInterval;
        }

        if (currentScale < minScale) {
            currentScale = minScale;
            return;
        }

        if (currentScale > maxScale) {
            currentScale = maxScale;
            return;
        }

        var mouseX = e.clientX - self.canvas.offsetLeft;
        var mouseY = e.clientY - self.canvas.offsetTop;

        if (e.wheelDelta < 0) {
            windowX += Math.floor(mouseX / 50);
            windowY += Math.floor(mouseY / 50);
        } else {
            windowX -= Math.floor(mouseX / 50);
            windowY -= Math.floor(mouseY / 50);
        }

        var scaledWindowWidth = self.canvas.width * currentScale;
        var scaledWindowHeight = self.canvas.height * currentScale;
        var maxX = photo.width - scaledWindowWidth;
        var maxY = photo.height - scaledWindowHeight;

        if (windowX < 0) {
            windowX = 0;
        }

        if (windowX > maxX) {
            windowX = maxX;
        }

        if (windowY < 0) {
            windowY = 0;
        }
        if (windowY > maxY) {
            windowY = maxY;
        }
        draw();
    }
}

angular
    .module('photoCanvas')
    .component('photoCanvas', {
        bindings: {
            width: '@',
            height: '@'
        },
        templateUrl: 'components/photo-canvas/photo-canvas.template.html',
        controller: CanvasController
    });
