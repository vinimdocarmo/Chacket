(function () {
    angular
        .module('chacketApp')
        .service('ClientSession', function () {
            let client;

            this.get = function () {
                return client;
            };

            this.set = function (_client_) {
                client = _client_;
            };
        });
})();