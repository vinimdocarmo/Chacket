(function () {
    angular
        .module('chacketApp', ['ngRoute'])
        .controller('AppController', function ($window, ClientSession) {
            $window.onbeforeunload = function() {
                ClientSession.get().send(JSON.stringify({ type: 'end' }));
                ClientSession.set(null);
            };
        })
        .config(function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/chat', {
                    template: '<chat></chat>' 
                })
                .when('/login', {
                    template: '<login></login>' 
                })
                .otherwise({ template: '<login></login>' });
          });
})();