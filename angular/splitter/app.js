'use strict';

var app = angular.module('sampleApp', ['ui.layout']);

app.directive('sdiv', function () {
    return {
        template:'<div style="background : #fff; width: {{width}}; height: {{height}}; margin : 10px; display:inline-block;"><span>x: {{x}}, <br>y: {{y}}</span></div>',
        restrict:"AE",
        scope: {
            width: "@",
            height: "@"
        },
        link: function (scope, element, attrs) {
            scope.x = offset(element).left;
            scope.y = offset(element).top;

            function offset(element) {
              var rawDomNode = element[0];
              var body = document.documentElement || document.body;
              var scrollX = window.pageXOffset || body.scrollLeft;
              var scrollY = window.pageYOffset || body.scrollTop;
              var clientRect = rawDomNode.getBoundingClientRect();
              var x = clientRect.left + scrollX;
              var y = clientRect.top + scrollY;
              return { left: parseInt(x), top: parseInt(y) };
            }
        }
    }
})

app.controller("TestCtrl", ['$scope', function ($scope) {
    $scope.range = function(n) {
        return new Array(n);
    };
}])
