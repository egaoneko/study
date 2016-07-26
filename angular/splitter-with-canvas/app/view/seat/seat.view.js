'use strict';

angular.module('myApp.seatView', [
    'ngRoute',
    'ui.layout',
    'seatCanvas'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/seat', {
    templateUrl: 'view/seat/seat.html',
    controller: 'SeatViewCtrl'
  });
}])

.controller('SeatViewCtrl', [function() {

}]);
