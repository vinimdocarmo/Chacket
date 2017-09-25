(function () {
    angular
        .module('chacketApp')
        .directive('room', function (ClientSession, $timeout) {
            return {
                templateUrl: './templates/room.html',
                controllerAs: '$ctrl',
                scope: { name: '@' },
                controller: function ($scope) {
                    this.text = '';
                    $scope.messages = [{ username: 'bot', text: 'Have fun!' }];

                    this.getRoomName = function () { return '#' + $scope.name; };

                    this.send = function () {
                        ClientSession.get().send({
                            type: 'message',
                            room: 'general', 
                            text: this.text
                        });
                        this.text = '';
                    };

                    ClientSession.get().on('data', buffer => {
                        $timeout(() => {
                            const data = JSON.parse(buffer);
                            if (data.type !== 'message' || data.room !== $scope.name) {
                                return;
                            }
                            $scope.messages.push({ room: $scope.name, text: data.text, username: data.username });
                        });
                    });
                }
            };
        });
})();