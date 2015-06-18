var searchController = require('./searchControllers');
var userController = require('./controllers');
var myApp = angular.module('myApp',['ngRoute', 'searchController', 'userController']);

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/search', {
        templateUrl: 'search.html',
        controller: 'searchController'
      }).
      when('/login', {
        templateUrl: 'user.html',
        controller: 'userController'
      }).
      otherwise({
        redirectTo: '/search'
      });
}]);
