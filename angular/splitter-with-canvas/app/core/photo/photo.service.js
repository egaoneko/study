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
    ])
    .factory('Window', function() {
        return {
            windowX : 0, // 사진 내 화면 X 좌표
            windowY : 0, // 사진 내 화면 Y 좌표
            currentScale : 1, // 현재 스케일 크기
            minScale : .2, // 스케일 최소 크기
            maxScale : 2, // 스케일 최대 크기
            scaleInterval : .02, // 스케일 크기 증감폭
            src : "", // 사진 주소
            reset : function () {
                this.windowX = 0,
                this.windowY = 0,
                this.currentScale = 1,
                this.minScale = .2,
                this.maxScale = 2,
                this.scaleInterval = .02
            }
        };
    });
