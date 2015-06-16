(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('accessoriesCtrl', ['$scope', 'accessoriesSvc', 'newListingSvc', '$modal', '$stateParams', '$log', function accessoriesCtrl($scope, accessoriesSvc, newListingSvc, $modal, $stateParams, $log){

  	$scope.accessories = accessoriesSvc.getAccessories();
  	$scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.sortType = "date";
    $scope.sortReverse = true;

    $scope.getAccessoryInfo = function(accessory) {
      var modalInstance = $modal.open({
        templateUrl: 'app/info/info.html',
        controller: 'infoCtrl',
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
        templateUrl: 'app/newlisting/newListing.html',
        controller: 'newListingCtrl',
        size: 'lg',
        resolve:  {
          type: function() {
            return "accessory";
          }
        }
      })
      modalInstance.result.then(function() {
        $scope.accessories.push(newListingSvc.getNewListing());
        //Function to store new $scope.textbooks into the backend
      }, 
      function() {
        console.log("new list not created");
      });
    };
    

  	$scope.changeBarActive = function() {
        document.getElementById("accessoriesBar").className = "active";
    }

    $scope.makeActive = function(sortParameter) {
        var activeParameter = sortParameter + "SortId";
        document.getElementById("accessoryNameSortId").className = "clickSort";
        document.getElementById("priceSortId").className = "clickSort";
        document.getElementById("dateSortId").className = "clickSort";
        document.getElementById(activeParameter).className = "clickSort activeSort";

    }
    
  }]);
}());