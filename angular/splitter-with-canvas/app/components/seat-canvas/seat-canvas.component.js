'use strict';

function CanvasController($scope, $element, $attrs, $timeout, $log, Seat) {
    var self = this;
    var parentElement = $element[0].parentElement;

    this.width = parentElement.offsetWidth - 8;
    this.height = parentElement.offsetHeight - 8;
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.seats = Seat.query();

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
            var ctx = self.canvas.getContext('2d');
            // $log.info(self.seats);

            angular.forEach(self.seats, function(value) {
                drawSeat(ctx, value, 40);
            })
        }
    }

    var drawSeat = function(ctx, seat, size) {
        var startX = 10 + 50 * (seat.col - 1);
        var startY = 10 + 50 * (seat.row - 1);
        ctx.fillStyle = "rgb(200, 0, 0)";
        ctx.fillRect(startX, startY, size, size);
    }
}

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
