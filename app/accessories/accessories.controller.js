(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('accessoriesCtrl', ['$scope', 'accessoriesSvc', 'newListingSvc', '$modal', '$stateParams', '$state', '$log', function accessoriesCtrl($scope, accessoriesSvc, newListingSvc, $modal, $stateParams, $state, $log){

        $scope.$state = $state;
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
      //price: 0,
      acceptingOffers: true
    }
    $scope.itemId;

    $scope.$watch( function () { return newListingSvc.getNewListing()}, function(newValue, oldValue) {
      console.log("Watch statement from accessories.info entered");

       angular.forEach($scope.accessories, function(accessory) {
         if (newValue.accessory_id == accessory.accessory_id) {
            accessory.accessoryName = newValue.accessoryName;
            accessory.price = newValue.price;
            accessory.acceptingOffers = newValue.acceptingOffers;
            accessory.sellerName = newValue.sellerName;
            accessory.description = newValue.description;
            accessory.contactInfo = newValue.contactInfo;
            accessory.password = newValue.password;
            accessory.date = newValue.date;
         }
       })

    });

    $scope.$watch( function () { return newListingSvc.getDeleteId()}, function(newValue, oldValue) {
      console.log("Watch statement from deletion entered");
      if (newValue != 0) {

       angular.forEach($scope.accessories, function(accessory) {
          if (newValue == accessory.accessory_id) {
            var index = $scope.accessories.indexOf(accessory);
            if (index > -1) {
              $scope.accessories.splice(index, 1);
            }
          }
       })
       newListingSvc.setDeleteId(0);
      }

    });

    $scope.getAccessoryInfo = function(accessory) {
      newListingSvc.setInfo($scope.accessories);
      $state.go('accessories.info', {accessory_id: accessory.accessory_id});
    };

    $scope.createNewListing = function() {
      var modalInstance = $modal.open({
        templateUrl: 'app/newlisting/newListing.html',
        controller: 'newListingCtrl',
        size: 'lg',
        backdrop:'static',
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