var searchController = angular.module('searchController', []);

searchController.controller('searchController', ['$scope', '$http',
  function ($scope, $http) {
    $scope.greet = "Search the Realtor App";
    $scope.result = "";

    $http.get('/mls').success(function(response) {
      // does it need to be an array?
      $scope.mlslist = response;
      $scope.listing = "";
    });

  $scope.search = function() {
    $http.post('/search', $scope.listing).success(function(response) {
      $scope.mlslist = response;
    });
  };
}]);

