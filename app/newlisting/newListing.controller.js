(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('newListingCtrl', ['$scope', '$modalInstance', 'newListingSvc', '$stateParams', '$log', 'type', function newListingCtrl($scope, $modalInstance, newListingSvc, $stateParams, $log, type) {

    $scope.typeOfObject = type;

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

    $scope.class2 = true;
    $scope.class3 = true;
    $scope.class4 = true;
    $scope.class5 = true;
    $scope.newListing = {
        price: 0,
        acceptingOffers: true,
    };

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


