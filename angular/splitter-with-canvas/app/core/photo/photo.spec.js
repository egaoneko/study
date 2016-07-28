'use strict';

describe('Photo', function() {
    var $httpBackend;
    var Photo;
    var photosData = [{
        id: 1,
        name: "photo_1.png"
    }, {
        id: 2,
        name: "photo_2.png"
    }, ];

    beforeEach(function() {
        jasmine.addCustomEqualityTester(angular.equals);
    });

    beforeEach(module('core.photo'));

    beforeEach(inject(function(_$httpBackend_, _Photo_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('resources/photos/photos.json').respond(photosData);

        Photo = _Photo_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should fetch the photos data from `resources/photos/photos.json`', function() {
        var photos = Photo.query();

        expect(photos).toEqual([]);

        $httpBackend.flush();
        expect(photos).toEqual(photosData);
    });
});

describe('Window', function() {
    var Window;
    var windowData = {
        windowX: 0,
        windowY: 0,
        currentScale: 1
    }

    beforeEach(function() {
        jasmine.addCustomEqualityTester(angular.equals);
    });

    beforeEach(module('core.photo'));

    beforeEach(inject(function(_Window_) {
        Window = _Window_;
    }));

    it('should equals init data', function() {
        var window = Window;

        window.windowX = 10;
        window.windowY = 10;
        window.currentScale = 2;
        window.reset();

        expect(window.windowX).toEqual(windowData.windowX);
        expect(window.windowY).toEqual(windowData.windowY);
        expect(window.currentScale).toEqual(windowData.currentScale);
    });
});
