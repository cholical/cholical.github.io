(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('accessoriesCtrl', ['$scope', 'accessoriesSvc', '$stateParams', '$log', function accessoriesCtrl($scope, accessoriesSvc, $stateParams, $log){

  	$scope.accessories = accessoriesSvc.getAccessories();
  	$scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.sortType = "date";
    $scope.sortReverse = false;

  	$scope.changeBarActive = function() {
        document.getElementById("accessoriesBar").className = "active";
        console.log("Current time");
        console.log(new Date());
    }
    
  }]);
}());