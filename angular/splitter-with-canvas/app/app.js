'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ui.layout',
    'seatCanvas',
    'photoCanvas',
    'myApp.mainView',
    'myApp.seatView',
    'myApp.photoView',
    'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({
        redirectTo: '/main'
    });
}]);
