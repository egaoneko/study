'use strict';

describe('myApp.seatView module', function() {

    beforeEach(module('myApp.seatView'));

    describe('seat view controller', function() {

        it('should ....', inject(function($rootScope, $controller) {
            //spec body
            var scope = $rootScope.$new();
            var seatViewCtrl = $controller('SeatViewCtrl', {
                $scope: scope
            });
            expect(seatViewCtrl).toBeDefined();
        }));

    });
});
