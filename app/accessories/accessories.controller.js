(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('accessoriesCtrl', ['$scope', 'accessoriesSvc', 'newListingSvc', '$modal', '$stateParams', '$log', function accessoriesCtrl($scope, accessoriesSvc, newListingSvc, $modal, $stateParams, $log){


    var onAccessoriesSuccess = function(data) {
      $scope.accessories = data;
    };
  	accessoriesSvc.getAccessories().then(onAccessoriesSuccess);
  	$scope.pageSize = 12;
    $scope.currentPage = 1;
    $scope.sortType = "date";
    $scope.sortReverse = true;
    $scope.listing = {
      price: 0,
      acceptingOffers: true
    }

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
          listing: function() {
            return $scope.listing;
          },
          type: function() {
            return "accessory";
          }
        }
      })
      modalInstance.result.then(function() {
        $scope.accessories.unshift(newListingSvc.getNewListing());
      $scope.sortType = "accessoryName";
      $scope.sortType = "date";
        
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