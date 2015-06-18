var searchController = require('./searchControllers');
var userController = require('./controllers');
var myApp = angular.module('myApp',['ngRoute', 'searchController', 'userController']);

// this lets angular know which controller and html to use depending on the url
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
