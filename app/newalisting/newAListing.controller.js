(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('newAListingCtrl', ['$scope', '$modalInstance', 'newAListingSvc', '$stateParams', '$log', function newAListingCtrl($scope, $modalInstance, newAListingSvc, $stateParams, $log){

    $scope.newListing = {
        accessoryName: "",
        price: 0,
        acceptingOffers: true,
        sellerName: "",
        description: "",
        contactInfo: "",
        password: ""
    };
    $scope.close = function() {
        $modalInstance.dismiss('close');
    };
    $scope.submitListing = function() {
        $scope.newListing.date = angular.copy(new Date());
        newAListingSvc.setNewListing($scope.newListing);
        $modalInstance.close();
    };



    
  }]);
}());


