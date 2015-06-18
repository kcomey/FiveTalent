var userController = angular.module('userController', []);

userController.controller('userController', ['$scope', '$http',
  function ($scope, $http) {
    $scope.greet = "Kendall's Realtor App";
    $scope.showMLSMessage = true;

    $http.get('/mls').success(function(response) {
      $scope.mlslist = response;
      $scope.listing = "";
    });

  $scope.addListing = function() {
    $http.get('/getmls').success(function(mlsNum) {
      $scope.listing = { mlsNum: mlsNum };

      $http.post('/addmls', $scope.listing).success(function(response) {
        $scope.mlslist.push(response);
        $scope.listing = "";
        $scope.showMLSMessage = true;
        $scope.showMLS = false;
      });
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
      $scope.showMLSMessage = false;
      $scope.showMLS = true;
    });
  };

  $scope.update = function() {
    $http.put('/updatemls/' + $scope.listing._id, $scope.listing)
      .success(function(response) {
      for(var i = 0; i < $scope.mlslist.length; i++) {
        if($scope.mlslist[i]._id === response._id) {
          $scope.mlslist[i].mlsNum = response.mlsNum;
          $scope.mlslist[i].salesPrice = response.salesPrice;
          $scope.listing = "";
          break;
        }
      }
    });
  };

}]);
