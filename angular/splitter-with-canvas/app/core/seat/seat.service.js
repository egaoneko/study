'use strict';

angular
    .module('core.seat')
    .factory('Seat', ['$resource',
        function($resource) {
            return $resource('resources/seats/:seatId.json', {}, {
                query: {
                    method: 'GET',
                    params: {
                        seatId: 'seats'
                    },
                    isArray: true
                }
            });
        }
    ]);
