(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('accessoriesCtrl', ['$scope', 'accessoriesSvc', 'newListingSvc', '$modal', '$stateParams', '$log', function accessoriesCtrl($scope, accessoriesSvc, newListingSvc, $modal, $stateParams, $log){


    var onAccessoriesSuccess = function(data) {
      $scope.accessories = data;
      angular.forEach($scope.accessories, function(accessory) {
        accessory.price = parseInt(accessory.price);
        accessory.date = new Date(accessory.date);
      });

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
    $scope.itemId;
    $scope.tempListing;

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
      modalInstance.result.then(function() {}, function() {

        
        $scope.tempListing = newListingSvc.getNewListing();
        if (newListingSvc.getDeleteId() != 0) {

            angular.forEach($scope.accessories, function(accessory) {
                if (accessory.accessory_id == $scope.tempListing.accessory_id) {
                    //function to remove accessory from $scope.accessories;
                    var index = $scope.accessories.indexOf(accessory);
                    if (index > -1) {
                        $scope.accessories.splice(index, 1);
                    }
                }
            });
            newListingSvc.setDeleteId(0);
        } else {
          
          angular.forEach($scope.accessories, function(accessory) {
              if (accessory.accessory_id == $scope.tempListing.accessory_id) {
                  //change each property of accessory into angular.copy() of that of scope.tempLisitng;
                  accessory.accessoryName = $scope.tempListing.accessoryName;
                  accessory.price = $scope.tempListing.price;
                  accessory.acceptingOffers = $scope.tempListing.acceptingOffers;
                  accessory.sellerName = $scope.tempListing.sellerName;
                  accessory.description = $scope.tempListing.description;
                  accessory.contactInfo = $scope.tempListing.contactInfo;
                  accessory.password = $scope.tempListing.password;
                  accessory.date = $scope.tempListing.date;
              }
          });
        }

        
      }
      );

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

            $scope.sortType = "date";
            $scope.itemId = newListingSvc.getItemId();
            console.log($scope.itemId);
            angular.forEach($scope.accessories, function(accessory) {
                console.log("foreach run");
                if (accessory.hasOwnProperty("accessory_id")) {

                } else {
                    accessory.accessory_id = angular.copy($scope.itemId);
                }
      })
      


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