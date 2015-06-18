var userController = angular.module('userController', []);

userController.controller('userController', ['$scope', '$http',
  function ($scope, $http) {
    $scope.greet = "Kendall's Realtor App";

    $http.get('/mls').success(function(response) {
      $scope.mlslist = response;
      $scope.listing = "";
    });

  $scope.addListing = function() {
    $http.post('/addmls', $scope.listing).success(function(response) {
      $scope.mlslist.push(response);
      $scope.listing = "";
    });
  };

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

  $scope.edit = function(id) {
    $http.get('/editmls/' + id).success(function(response) {
      $scope.listing = response;
    });
  };

  $scope.update = function() {
    $http.put('/updatemls/' + $scope.note._id, $scope.note)
      .success(function(response) {
      for(var i = 0; i < $scope.notelist.length; i++) {
        if($scope.notelist[i]._id === response._id) {
          $scope.notelist[i].note = response.note;
          $scope.notelist[i].author = response.author;
          $scope.note = "";
          break;
        }
      }
    });
  };

  $scope.deselect = function() {
    $scope.note = "";
  };

}]);
