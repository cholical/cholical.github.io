(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('accessoriesCtrl', ['$scope', 'accessoriesSvc', 'newAListingSvc', '$modal', '$stateParams', '$log', function accessoriesCtrl($scope, accessoriesSvc, newAListingSvc, $modal, $stateParams, $log){

  	$scope.accessories = accessoriesSvc.getAccessories();
  	$scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.sortType = "date";
    $scope.sortReverse = true;

    $scope.getAccessoryInfo = function(accessory) {
      var modalInstance = $modal.open({
        templateUrl: 'app/accessoryinfo/accessoryInfo.html',
        controller: 'accessoryInfoCtrl',
        resolve: {
          data: function() {
            return accessory;
          }
        },
        size: 'lg'
      })
    };
      $scope.createNewListing = function() {
      var modalInstance = $modal.open({
        templateUrl: 'app/newalisting/newAListing.html',
        controller: 'newAListingCtrl',
        size: 'lg'
      })
      modalInstance.result.then(function() {
        $scope.accessories.push(newAListingSvc.getNewListing());
        //Function to store new $scope.textbooks into the backend
      }, 
      function() {
        console.log("new list not created");
      });
    };
    

  	$scope.changeBarActive = function() {
        document.getElementById("accessoriesBar").className = "active";
        console.log("Current time");
        console.log(new Date());
    }
    
  }]);
}());