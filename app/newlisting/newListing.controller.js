(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('newListingCtrl', ['$scope', '$modalInstance', 'newListingSvc', '$stateParams', '$log', 'listing', 'type', function newListingCtrl($scope, $modalInstance, newListingSvc, $stateParams, $log, listing, type) {

    $scope.typeOfObject = type;

    $scope.class2 = true;
    $scope.class3 = true;
    $scope.class4 = true;
    $scope.class5 = true;
    $scope.newListing = angular.copy(listing);
    if ($scope.newListing.hasOwnProperty("price")) {
        $scope.newListing.price = parseInt($scope.newListing.price);
    }
    $scope.phpDebug;


    if ($scope.typeOfObject === "textbook") {
        console.log("textbook type");
        $scope.textbookHideObject = false;
        $scope.accessoryHideObject = true;
        $scope.serviceHideObject = true;
            

    } else if ($scope.typeOfObject === "accessory") {
        console.log("accessory type");
        $scope.accessoryHideObject = false;
        $scope.textbookHideObject = true;
        $scope.serviceHideObject = true;
    } else if ($scope.typeOfObject === "service") {
        console.log("service type");
        $scope.accessoryHideObject = true;
        $scope.textbookHideObject = true;
        $scope.serviceHideObject = false;
    }

    if (listing.hasOwnProperty("sellerName")) {
        $scope.hideNewMessage = true;
        $scope.hideEditMessage = false;
        if (listing.hasOwnProperty("classes")) {
            $scope.numClasses = listing.classes.length;
                if ($scope.numClasses > 1) {
                    $scope.class2 = false;
                }
                if ($scope.numClasses > 2) {
                    $scope.class3 = false;
                }
                if ($scope.numClasses > 3) {
                    $scope.class4 = false;
                }
                if ($scope.numClasses > 4) {
                    $scope.class5 = false;
                }
            }
    } else {
        $scope.hideNewMessage = false;
        $scope.hideEditMessage = true;
    }

    
    

    $scope.addClass2 = function() {
        $scope.class2 = false;
    };
    $scope.addClass3 = function() {
        $scope.class3 = false;
    };
    $scope.addClass4 = function() {
        $scope.class4 = false;
    };
    $scope.addClass5 = function() {
        $scope.class5 = false;
    };
    $scope.close = function() {
        $modalInstance.dismiss('close');
    };
    $scope.submitListing = function() {
        $scope.newListing.date = angular.copy(new Date());
        if ($scope.newListing.hasOwnProperty("textbookName")) {
            $scope.newListing.class1 = $scope.newListing.classes[0];
            $scope.newListing.class2 = $scope.newListing.classes[1];
            $scope.newListing.class3 = $scope.newListing.classes[2];
            $scope.newListing.class4 = $scope.newListing.classes[3];
            $scope.newListing.class5 = $scope.newListing.classes[4];
        }
        newListingSvc.setNewListing($scope.newListing).then(function(data) {
            //$scope.phpDebug = data;
        });
        console.log($scope.newListing);
        $modalInstance.close();
    };



    
  }]);
}());


