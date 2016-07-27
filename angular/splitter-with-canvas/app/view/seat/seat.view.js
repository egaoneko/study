'use strict';

angular.module('myApp.seatView', [
    'ngRoute',
    'ui.layout',
    'seatCanvas',
    'core.seat'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/seat', {
    templateUrl: 'view/seat/seat.html',
    controller: 'SeatViewCtrl'
  });
}])

.controller('SeatViewCtrl', ['$scope', 'SelectedSeat', function($scope, SelectedSeat) {
    $scope.seat = SelectedSeat.seat;
    $scope.$watch(
        function() {
            return SelectedSeat.seat.id;
        },
        function() {
            $scope.seat = SelectedSeat.seat;
        }
    )
}]);
