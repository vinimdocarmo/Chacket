(function () {
    const _ = require('underscore');

    angular
        .module('chacketApp')
        .directive('chat', function ($location, $timeout, ClientSession) {
            return {
                templateUrl: './templates/chat.html',
                compile: function () {
                    if (!ClientSession.get()) {
                        $location.url('/login');
                        return;
                    }
                    return function postLink(scope) {
                        scope.channelRooms = ['general'];
                        scope.directRooms = [];

                        ClientSession.get().on('data', (buffer) => {
                            $timeout(() => {
                                const data = JSON.parse(buffer);

                                switch (data.type) {
                                    case 'start':
                                        data.usernames.forEach(username => scope.directRooms.push(username));
                                        break;
                                    case 'end':
                                        removeDirectRoom(data.username);
                                        break;
                                }
                            });
                        });

                        ClientSession.get().send({ type: 'start' });

                        function removeDirectRoom(name) {
                            const rIndex = _.findIndex(scope.directRooms, room => room === name);

                            if (rIndex !== -1) {
                                scope.directRooms.splice(rIndex, 1);
                            }
                        }
                    }
                }
            };
        });
})();