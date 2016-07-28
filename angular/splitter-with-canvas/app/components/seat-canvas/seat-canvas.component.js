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

    var mouseX = -1,
        mouseY = -1;

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

            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            angular.forEach(self.seats, function(value) {
                ctx.save();
                drawSeat(ctx, value, size);
                ctx.restore();
            })
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

        if (seat.status == "AVAIL" && ctx.isPointInPath(mouseX, mouseY)) {
            // self.canvas.cursor = 'pointer';
            ctx.globalAlpha = 1;
            ctx.lineWidth = 3;
            ctx.strokeStyle = "red";
            ctx.strokeRect(Math.floor(mouseX / 50) * 50 + 10,
                Math.floor(mouseY / 50) * 50 + 10, size, size);
            SelectedSeat.seat = seat;
            $scope.$apply();
        }
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
        mouseX = e.clientX - self.canvas.offsetLeft;
        mouseY = e.clientY - self.canvas.offsetTop;
        draw();
    };
}
