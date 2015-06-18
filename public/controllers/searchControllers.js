var searchController = angular.module('searchController', []);

// set up some initial state
searchController.controller('searchController', ['$scope', '$http',
  function ($scope, $http) {
    $scope.greet = "Search the Realtor App";
    $scope.result = "";
    $scope.listing = "";
    $scope.mlslist = "";
    $scope.searchResults = "";
    var numResults = 0;

  // if the Clear button is clicked, just clear the state
  $scope.deselect = function() {
    $scope.listing = "";
  };

  // these are the results from the search
  $scope.search = function() {
    $http.post('/search', $scope.listing).success(function(response) {
      numResults = response.length;
      $scope.searchResults = response;

      if (numResults > 0) {
        $scope.ifResults = true;
        $scope.result = 'Your search returned ' + numResults + ' results!'
        $scope.listing = "";
      }
      else {
        $scope.ifResults = false;
        $scope.result = 'Your search did not return any results! Try again!'
      }
    });
  };
}]);

