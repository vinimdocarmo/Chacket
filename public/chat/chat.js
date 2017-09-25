(function () {
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
                                
                                if (data.type === 'start') {
                                    data.usernames.forEach(username => scope.directRooms.push(username));
                                }
                            });
                        });

                        ClientSession.get().send({ type: 'start' });
                    }
                }
            };
        });
})();