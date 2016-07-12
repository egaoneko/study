'use strict';

var app = angular.module('sampleApp', ['ui.layout']);

app.directive('sdiv', function () {
    return {
        template:'<div style="background : #fff; width:300px; height: 300px; margin : 10px;"><span>{{x}}, {{y}}, {{width}}, {{height}}</span></div>',
        restrict:"AE",
        link: function (scope, element, attrs) {
            scope.x = offset(element).left;
            scope.y = offset(element).top;
            scope.width = element[0].getBoundingClientRect().width;
            scope.height = element[0].getBoundingClientRect().height;
            console.dir(element[0].getBoundingClientRect());

            function offset(element) {
              var rawDomNode = element[0];
              var body = document.documentElement || document.body;
              var scrollX = window.pageXOffset || body.scrollLeft;
              var scrollY = window.pageYOffset || body.scrollTop;
              var clientRect = rawDomNode.getBoundingClientRect();
              var x = clientRect.left + scrollX;
              var y = clientRect.top + scrollY;
              return { left: x, top: y };
            }
        }
    }
})
