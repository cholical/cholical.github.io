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
    $scope.itemId;
    $scope.deleteId;


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
        //Will work properly only if sellerName is intialized; will be fixed when validation is created;
        $scope.hideNewMessage = true;
        $scope.hideEditMessage = false;
        if (listing.hasOwnProperty("classes")) {
            $scope.numClasses = 0;
            var i;
            for (i = 0; i < 5; i++) {
                if (listing.classes[i] != "") {
                    $scope.numClasses = $scope.numClasses + 1;
                }
            }
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
            while ($scope.newListing.classes.length != 5) {
                $scope.newListing.classes.push("");
            }
            $scope.newListing.class1 = $scope.newListing.classes[0];
            $scope.newListing.class2 = $scope.newListing.classes[1];
            $scope.newListing.class3 = $scope.newListing.classes[2];
            $scope.newListing.class4 = $scope.newListing.classes[3];
            $scope.newListing.class5 = $scope.newListing.classes[4];
        }
        newListingSvc.setNewListing($scope.newListing).then(function(data) {
            $scope.itemId = data;
            $scope.itemId = $scope.itemId.replace(/\s+/g, '');
            newListingSvc.setItemId($scope.itemId);
            console.log($scope.newListing);
            $modalInstance.close();
        });
        
    };

    $scope.hideDeleteButton = false;
    $scope.hideConfirmDelete = true;

    $scope.pressDelete = function(){
        $scope.hideConfirmDelete = false;
        $scope.hideDeleteButton = true;
    };

    $scope.pussyOutAndDontDelete = function(){
        $scope.hideConfirmDelete = true;
        $scope.hideDeleteButton = false;
    };

    $scope.deleteListing = function(){
        if ($scope.newListing.hasOwnProperty("accessory_id")) {
                $scope.deleteId = $scope.newListing.accessory_id;
            }
        if ($scope.newListing.hasOwnProperty("textbook_id")) {
                $scope.deleteId = $scope.newListing.textbook_id;
            }
            newListingSvc.setDeleteId($scope.deleteId);
        //call the php script
        newListingSvc.deleteListing($scope.newListing).then(function(data) {
            //$scope.phpDebug = data;
            

        });
        console.log('listing deleted');
        $modalInstance.close();
    };
    
  }]);
}());


