(function () {
    angular
        .module('chacketApp')
        .directive('room', function (ClientSession, $timeout) {
            return {
                templateUrl: './templates/room.html',
                controllerAs: '$ctrl',
                scope: { 
                    name: '=', 
                    type: '='
                },
                controller: function ($scope) {
                    this.text = '';
                    $scope.messages = [];

                    $scope.$watch('name', function (newValue) {
                        if (newValue) {
                            $scope.messages = [];
                        }
                    });

                    this.getRoomName = function () { 
                        let prefix;

                        if ($scope.type === 'direct') {
                            prefix = '@ ';
                        } else if ($scope.type === 'channel') {
                            prefix = '# ';
                        }

                        return prefix + $scope.name;
                    };

                    this.send = function () {
                        ClientSession.get().send({
                            type: 'message',
                            room: getRoomName(), 
                            text: this.text
                        });
                        this.text = '';
                    };

                    ClientSession.get().on('data', buffer => {
                        $timeout(() => {
                            const data = JSON.parse(buffer);
                            if (data.type !== 'message') {
                                return;
                            }
                            if (data.room === `${ClientSession.get().username}:${$scope.name}` || 
                                data.room === `${$scope.name}:${ClientSession.get().username}` ||
                                data.room === $scope.name) {
                                $scope.messages.push({ room: $scope.name, text: data.text, username: data.username });
                            }
                        });
                    });

                    function getRoomName() {
                        if ($scope.type === 'direct') {
                            return `${ClientSession.get().username}:${$scope.name}`;
                        } else if ($scope.type === 'channel') {
                            return $scope.name;
                        }
                    }
                }
            };
        });
})();