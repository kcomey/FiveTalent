var searchController = angular.module('searchController', []);

searchController.controller('searchController', ['$scope', '$http',
  function ($scope, $http) {
    $scope.greet = "Search the Realtor App";
    $scope.result = "";
    $scope.listing = "";
    $scope.mlslist = "";
    $scope.searchResults = "";
    var numResults = 0;

  $scope.deselect = function() {
    $scope.listing = "";
  };

  $scope.search = function() {
    $http.post('/search', $scope.listing).success(function(response) {
      numResults = response.length;
      $scope.searchResults = response;

      if (numResults > 1) {
        $scope.ifResults = true;
        $scope.result = 'Your search returned ' + numResults + ' results!'
        $scope.listing = "";
      }
      else if (numResults === 1) {
        $scope.ifResults = true;
        $scope.result = 'Your search returned 1 result!'
        $scope.listing = "";
      }
      else {
        $scope.ifResults = false;
        $scope.result = 'Your search did not return any results! Try again!'
      }
    });
  };
}]);

