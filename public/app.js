(function () {
    angular
        .module('chacketApp', ['ngRoute'])
        .controller('AppController', function ($window) {
            $window.onbeforeunload = function() {
                //sessionStorage.setItem('chatClient', null);
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