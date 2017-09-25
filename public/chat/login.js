(function () {
    angular
        .module('chacketApp')
        .directive('login', function ($location, $timeout, ChatClient, ClientSession) {
            return {
                templateUrl: './templates/login.html',
                controllerAs: '$ctrl',
                controller: function () {
                    this.username = '';
                    this.signIn = function () {
                        if (!this.username) {
                            return alert('Username required!');
                        }

                        const client = new ChatClient(this.username);

                        return client
                            .connectToChatServer()
                            .then(() => ClientSession.set(client))
                            .then(() => $timeout(() => $location.url('/chat')));
                    }
                }
            }; 
        });
})();