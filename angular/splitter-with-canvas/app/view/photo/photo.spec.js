'use strict';

describe('myApp.photoView module', function() {

    beforeEach(module('myApp.photoView'));

    describe('photo view controller', function() {

        it('should ....', inject(function($rootScope, $controller) {
            //spec body
            var scope = $rootScope.$new();
            var photoViewCtrl = $controller('PhotoViewCtrl', {
                $scope: scope
            });
            expect(photoViewCtrl).toBeDefined();
        }));

    });
});
