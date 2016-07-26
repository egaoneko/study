'use strict';

angular.module('myApp.photoView', [
    'ngRoute',
    'ui.layout',
    'photoCanvas',
    'core.photo'
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/photo', {
        templateUrl: 'view/photo/photo.html',
        controller: 'PhotoViewCtrl'
    });
}])

.controller('PhotoViewCtrl', ['$scope', 'Photo', 'Window', function($scope, Photo, Window) {
    $scope.photos = Photo.query();
    $scope.Window = Window;

    $scope.photos.$promise.then(function() {
        Window.src = $scope.photos[0].src;
        $scope.photoIndex = "0";
    })

    $scope.changeImage = function(photoIndex) {
        Window.src = $scope.photos[photoIndex].src;
    }

}]);
