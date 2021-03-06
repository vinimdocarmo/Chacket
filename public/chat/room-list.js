(function () {
    angular
        .module('chacketApp')
        .directive('roomList', function (ChatClient) {
            return {
                templateUrl: './templates/room-list.html',
                controller: function () {
                    this.roomSymbol = function () {
                        if (this.name === 'Channels') {
                            return '#';
                        } else if (this.name === 'Direct Messages') {
                            return '@';
                        }
                    };
                },
                controllerAs: '$ctrl',
                bindToController: true,
                scope: {
                    list: '=',
                    onRoomClick: '&'
                },
                link: function (scope, element, attrs, controller) {
                    if (angular.isDefined(attrs.channel)) {
                        controller.name = 'Channels';
                        controller.type = 'channel';
                    } else if (angular.isDefined(attrs.direct)) {
                        controller.name = 'Direct Messages';
                        controller.type = 'direct';
                    }
                }
            };
        });
})();