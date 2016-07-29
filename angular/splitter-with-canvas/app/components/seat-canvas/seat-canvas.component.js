'use strict';

angular
    .module('seatCanvas')
    .component('seatCanvas', {
        bindings: {
            width: '@',
            height: '@'
        },
        templateUrl: 'components/seat-canvas/seat-canvas.template.html',
        controller: CanvasController
    });

function CanvasController($scope, $element, $attrs, $timeout, $log, Seat, SelectedSeat) {
    var self = this;
    var parentElement = $element[0].parentElement;

    this.width = parentElement.offsetWidth - 8;
    this.height = parentElement.offsetHeight - 8;
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.seats = Seat.query();

    var clickedMouseX = -1,
        clickedMouseY = -1;


    var movedMouseX = -1,
        movedMouseY = -1,
        seatInfo = undefined;

    $timeout(function() {
        self.seats.$promise.then(function() {
            draw();
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
            var ctx = self.canvas.getContext('2d'),
                canvasWidth = self.canvas.width,
                canvasHeight = self.canvas.height,
                size = 40;

            ctx.globalAlpha = 1;
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            angular.forEach(self.seats, function(value) {
                ctx.save();
                drawSeat(ctx, value, size);
                ctx.restore();
            })

            if (SelectedSeat.seat) {
                drawSelectedSeat(ctx, SelectedSeat.seat, size);
            }

            if (seatInfo) {
                drawSeatInfo(ctx, seatInfo, size);
            }
        }
    }

    var drawSeat = function(ctx, seat, size) {
        var startX = 10 + 50 * (seat.col - 1);
        var startY = 10 + 50 * (seat.row - 1);

        var status = getStyleFromStatus(seat.status);
        ctx.beginPath();
        ctx.globalAlpha = status.globalAlpha;
        ctx.fillStyle = status.fillStyle;
        ctx.rect(startX, startY, size, size);
        ctx.fill();

        if (seat.status == "AVAIL") {
            if (ctx.isPointInPath(clickedMouseX, clickedMouseY)) {
                // self.canvas.cursor = 'pointer';
                SelectedSeat.seat = seat;
                $scope.$apply();
            }

            if (ctx.isPointInPath(movedMouseX, movedMouseY)) {
                seatInfo = seat;
            }
        }
    }

    var drawSelectedSeat = function(ctx, seat, size) {
        ctx.globalAlpha = 1;
        ctx.lineWidth = 3;
        ctx.strokeStyle = "red";
        ctx.strokeRect(Math.floor(clickedMouseX / 50) * 50 + 10,
            Math.floor(clickedMouseY / 50) * 50 + 10, size, size);
    }

    var drawSeatInfo = function(ctx, seat, size) {
        var rowText = "Row: " + seat.row;
        var colText = "Col: " + seat.col;
        var xOffset = Math.floor(movedMouseX / 50);
        var yOffset = Math.floor(movedMouseY / 50);
        var startX = (movedMouseX % 50 == 0 ? xOffset - 1 : xOffset) * 50 + 20;
        var startY = (movedMouseY % 50 == 0 ? yOffset - 1 : yOffset) * 50 + 20;

        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 1;
        ctx.fillStyle = "black";
        ctx.fillRect(startX, startY, 80, 80);
        ctx.fillStyle = "yellow";
        ctx.fillText(rowText, startX + 10, startY + 10);
        ctx.fillText(colText, startX + 10, startY + 20);
    }

    var getStyleFromStatus = function(status) {
        switch (status) {
            case 'AVAIL':
                return STATUS_STYLE.AVAIL;
            case 'SOLD':
                return STATUS_STYLE.SOLD;
            default:
                return STATUS_STYLE.NOT;
        }
    }

    var STATUS_STYLE = {
        AVAIL: {
            globalAlpha: 1,
            fillStyle: "green"
        },
        SOLD: {
            globalAlpha: 0.2,
            fillStyle: "red"
        },
        NOT: {
            globalAlpha: 0,
            fillStyle: "black"
        }
    }

    self.canvas.onclick = function(e) {
        clickedMouseX = e.clientX - self.canvas.offsetLeft;
        clickedMouseY = e.clientY - self.canvas.offsetTop;
        SelectedSeat.seat = undefined;
        draw();
    };

    self.canvas.onmousemove = function(e) {
        movedMouseX = e.clientX - self.canvas.offsetLeft;
        movedMouseY = e.clientY - self.canvas.offsetTop;
        seatInfo = undefined;
        draw();
    };
}
