(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('accessoriesCtrl', ['$scope', 'accessoriesSvc', 'newListingSvc', '$modal', '$stateParams', '$state', '$log', function accessoriesCtrl($scope, accessoriesSvc, newListingSvc, $modal, $stateParams, $state, $log){

        $scope.$state = $state;
    var onAccessoriesSuccess = function(data) {
      $scope.accessories = data;
      angular.forEach($scope.accessories, function(accessory) {
        accessory.price = parseFloat(accessory.price);
        accessory.date = new Date(accessory.date);
        accessory.images = eval(accessory.images);
        if (typeof accessory.images === 'undefined'){
          accessory.images = false; //no image array exists
        } else if (accessory.images.length == 0) {
          accessory.images = false; //no images in array
        }
        accessory.comments = eval(accessory.comments);

      });

    };
  	accessoriesSvc.getAccessories().then(onAccessoriesSuccess);
    $scope.imageDir = 'img/useruploads/files/';
  	$scope.pageSize = 12;
    $scope.currentPage = 1;
    $scope.sortType = "date";
    $scope.sortReverse = true;
    $scope.listing = {
      //price: 0,
      acceptingOffers: "true"
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
            accessory.images = newValue.images;
            accessory.comments = newValue.comments;
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

    $scope.search = function(row) {
      return (angular.lowercase(row.accessoryName).indexOf($scope.query || '') !== -1 ||  String(row.price).indexOf($scope.query || '') !== -1 ||  angular.lowercase(row.sellerName).indexOf($scope.query || '') !== -1 || angular.lowercase(row.description).indexOf($scope.query || '') !== -1 || angular.lowercase(row.contactInfo).indexOf($scope.query || '') !== -1 || String(row.accessory_id).indexOf($scope.query || '') !== -1);
    }

  }]);
}());