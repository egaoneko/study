'use strict';

var app = angular.module('sampleApp', ['ui.layout']);

app.directive('pdiv', function ($log, $timeout) {
    return {
        template:'<div class="box" style="width: {{width}}; height: {{height}};"><span>x: {{x}}, <br>y: {{y}}</span></div>',
        restrict:"AE",
        scope: {
            width: "@",
            height: "@"
        },
        link: function (scope, element, attrs) {
            $timeout(function(){
                var offsetXY = offset(element);
                scope.x = offsetXY.left;
                scope.y = offsetXY.top;

            });

            element.on('click', function () {
                $log.debug(offset(element));
            })

            var parentElement = element[0].parentElement;
            scope.$watch(
                function () {
                    return [parentElement.offsetWidth, parentElement.offsetHeight].join('x');
                },
                function () {
                    var offsetXY = offset(element);
                    scope.x = offsetXY.left;
                    scope.y = offsetXY.top;
                }
            )

            function offset(element) {
                var rawDomNode = element[0];
                var clientRect = rawDomNode.getBoundingClientRect();

                var body = document.documentElement || document.body;
                var scrollX = window.pageXOffset || body.scrollLeft;
                var scrollY = window.pageYOffset || body.scrollTop;
                var x = clientRect.left + scrollX;
                var y = clientRect.top + scrollY;
                return { left: parseInt(x), top: parseInt(y) };
            }
        }
    }
})

app.controller("UtilCtrl", ['$scope', function ($scope) {
    $scope.range = function(n) {
        return new Array(n);
    };
}])
