var userController = angular.module('userController', []);

userController.controller('userController', ['$scope', '$http',
  function ($scope, $http) {
    $scope.greet = "Kendall's Realtor App";

    $http.get('/mls').success(function(response) {
      $scope.mlslist = response;
      $scope.listing = "";
    });

  // add a new listing
  $scope.addListing = function() {
    $http.post('/addmls', $scope.listing).success(function(response) {
      $scope.mlslist.push(response);
      $scope.listing = "";
    });
  };

  // to remove a listing, just delete by id. The splice is to
  // update the scope in real time without having to make another
  // GET call
  $scope.remove = function(id) {
    $http.delete('/deletemls/' + id).success(function(response) {
      for(var i = 0; i < $scope.mlslist.length; i++) {
        if($scope.mlslist[i]._id === id) {
          $scope.mlslist.splice(i, 1);
          break;
        }
      }
    });
  };

  // first I grab the data to put in the input fields before updating
  $scope.edit = function(id) {
    $http.get('/editmls/' + id).success(function(response) {
      $scope.listing = response;
    });
  };

  // once the update button is pressed, update the data and again
  // update the scope so the change can be seen without hitting the
  // database again
  $scope.update = function() {
    $http.put('/updatemls/' + $scope.listing._id, $scope.listing)
      .success(function(response) {
      for(var i = 0; i < $scope.mlslist.length; i++) {
        if($scope.mlslist[i]._id === response._id) {
          $scope.mlslist[i] = response;
          //$scope.mlslist[i].mlsNum = response.mlsNum;
          //$scope.mlslist[i].salesPrice = response.salesPrice;
          $scope.listing = "";
          break;
        }
      }
    });
  };

}]);
