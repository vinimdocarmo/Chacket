(function () {
    angular
        .module('chacketApp')
        .directive('chat', function ($location) {
            return {
                templateUrl: './templates/chat.html'
            };
        });
})();