'use strict';

describe('Seat', function() {
    var $httpBackend;
    var Seat;
    var seatsData = [{
        row: 1,
        col: 1
    }, {
        row: 1,
        col: 2
    }, {
        row: 1,
        col: 3
    }, {
        row: 2,
        col: 1
    }, {
        row: 2,
        col: 2
    }, {
        row: 2,
        col: 3
    }, ];

    beforeEach(function() {
        jasmine.addCustomEqualityTester(angular.equals);
    });

    beforeEach(module('core.seat'));

    beforeEach(inject(function(_$httpBackend_, _Seat_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('resources/seats/seats.json').respond(seatsData);

        Seat = _Seat_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should fetch the seats data from `resources/seats/seats.json`', function() {
        var seats = Seat.query();

        expect(seats).toEqual([]);

        $httpBackend.flush();
        expect(seats).toEqual(seatsData);
    });
});
