(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('editAccessoryCtrl', ['$scope', '$modalInstance', 'newAListingSvc', '$stateParams', '$log', 'data', function editAccessoryCtrl($scope, $modalInstance, newAListingSvc, $stateParams, $log, data){

    $scope.storedAccessory = data;
    $scope.newListing = angular.copy($scope.storedAccessory);

    $scope.close = function() {
        $modalInstance.dismiss('close');
    };
    $scope.submitListing = function() {
        $scope.storedAccessory.accessoryName = $scope.newListing.accessoryName;
        $scope.storedAccessory.price = $scope.newListing.price;
        $scope.storedAccessory.acceptingOffers = $scope.newListing.acceptingOffers;
        $scope.storedAccessory.sellerName = $scope.newListing.sellerName;
        $scope.storedAccessory.description = $scope.newListing.description;
        $scope.storedAccessory.contactInfo = $scope.newListing.contactInfo;
        $scope.storedAccessory.password = $scope.newListing.password;
        $scope.storedAccessory.date = angular.copy(new Date());
        $modalInstance.close();
    };



    
  }]);
}());


