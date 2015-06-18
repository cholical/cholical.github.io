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
        newListingSvc.setNewListing($scope.newListing);
        $modalInstance.close();
    };



    
  }]);
}());


