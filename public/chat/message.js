(function () {
    angular
        .module('chacketApp')
        .directive('message', function ($location) {
            return {
                templateUrl: './templates/message.html',
                transclude: true,
                scope: {
                    username: '<'
                }
            };
        });
})();