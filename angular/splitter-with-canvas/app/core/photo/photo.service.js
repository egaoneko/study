'use strict';

angular
    .module('core.photo')
    .factory('Photo', ['$resource',
        function($resource) {
            return $resource('resources/photos/:seatId.json', {}, {
                query: {
                    method: 'GET',
                    params: {
                        seatId: 'photos'
                    },
                    isArray: true
                }
            });
        }
    ]);
