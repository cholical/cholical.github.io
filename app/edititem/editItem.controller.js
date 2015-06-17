(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('editItemCtrl', ['$scope', '$modalInstance', 'newListingSvc', '$stateParams', '$log', 'data', function editItemCtrl($scope, $modalInstance, newListingSvc, $stateParams, $log, data){

    $scope.storedTextbook = data;
    $scope.newListing = angular.copy($scope.storedTextbook);
    $scope.class2 = true;
    $scope.class3 = true;
    $scope.class4 = true;
    $scope.class5 = true;
    
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

    $scope.displayClasses = function() {
        var numClasses = $storedTextbook.classes.length
    }

    $scope.close = function() {
        $modalInstance.dismiss('close');
    };
    $scope.submitListing = function() {
        $scope.storedTextbook.textbookName = $scope.newListing.textbookName;
        $scope.storedTextbook.author = $scope.newListing.author;
        $scope.storedTextbook.edition = $scope.newListing.edition;
        $scope.storedTextbook.classes = angular.copy($scope.newListing.classes);
        $scope.storedTextbook.price = $scope.newListing.price;
        $scope.storedTextbook.acceptingOffers = $scope.newListing.acceptingOffers;
        $scope.storedTextbook.sellerName = $scope.newListing.sellerName;
        $scope.storedTextbook.description = $scope.newListing.description;
        $scope.storedTextbook.contactInfo = $scope.newListing.contactInfo;
        $scope.storedTextbook.password = $scope.newListing.password;
        $scope.storedTextbook.date = angular.copy(new Date());
        $modalInstance.close();
    };



    
  }]);
}());


