(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('newListingCtrl', ['$scope', '$modalInstance', 'newListingSvc', '$stateParams', '$log', function newListingCtrl($scope, $modalInstance, newListingSvc, $stateParams, $log){

    $scope.class2 = true;
    $scope.class3 = true;
    $scope.class4 = true;
    $scope.class5 = true;
    $scope.newListing = {
        textbookName: "",
        author: "",
        edition: "",
        classes: [],
        price: 0,
        acceptingOffers: true,
        sellerName: "",
        description: "",
        contactInfo: "",
        password: ""
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
        $scope.newListing.date = new Date();
        newListingSvc.setNewListing($scope.newListing);
        $modalInstance.close();
    };



    
  }]);
}());


