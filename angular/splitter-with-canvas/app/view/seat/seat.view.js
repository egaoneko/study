'use strict';

angular.module('myApp.seatView', [
    'ngRoute',
    'ui.layout',
    'ui.bootstrap',
    'seatCanvas',
    'core.seat'
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/seat', {
        templateUrl: 'view/seat/seat.html',
        controller: 'SeatViewCtrl'
    });
}])

.controller('SeatViewCtrl', ['$scope', '$window', 'SelectedSeat', function($scope, $window, SelectedSeat) {
    $scope.config = {
        flow: 'row',
        disableToggle: 'true',
        dividerSize: 0
    };
    $scope.seat = SelectedSeat.seat;
    $scope.$on('seat:updated', function(event, seat) {
        $scope.seat = SelectedSeat.seat;
        $scope.$digest();
    });
    // $scope.$watch(
    //     function() {
    //         return SelectedSeat.seat.id;
    //     },
    //     function() {
    //         $scope.seat = SelectedSeat.seat;
    //     }
    // )

    $scope.tabs = [{
        title: 'Dy Tab 1',
        content: 'Dynamic content 1'
    }, {
        title: 'Dy Tab 2',
        content: 'Dynamic content 2',
        disabled: true
    }];

    $scope.alertMe = function() {
        setTimeout(function() {
            $window.alert('You\'ve selected the alert tab!');
        });
    };

    // $scope.model = {
    // name: 'Tabs'
    // };
}]);
