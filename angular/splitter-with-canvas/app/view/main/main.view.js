'use strict';

angular.module('myApp.mainView', [
    'ngRoute',
    'myApp.version'
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/main', {
        templateUrl: 'view/main/main.html',
        controller: 'MainViewCtrl'
    });
}])

.controller('MainViewCtrl', [function() {}]);
