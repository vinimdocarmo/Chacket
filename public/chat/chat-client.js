(function () {
    const {Socket} = require('net');
    angular
        .module('chacketApp')
        .factory('ChatClient', function ($q) {
            return class ChatClient extends Socket {
                constructor(username) {
                    super();
                    this.username = username;
                    this.on('error', function (error) {
                        alert('An expected error has been thrown. Look at the console for more details.');
                        console.error(error);
                    });
                }
                connectToChatServer() {
                    return new Promise((resolve) => this.connect({ port: 3333, host: 'localhost' }, resolve));
                }
            };
        });
})();