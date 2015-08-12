(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('newListingCtrl', ['$scope', '$modalInstance', 'newListingSvc', '$stateParams', '$log', 'listing', 'type', function newListingCtrl($scope, $modalInstance, newListingSvc, $stateParams, $log, listing, type) {

    $scope.editListing = false;
    $scope.typeOfObject = type;
    $scope.imageName = 'maaaaac';
    $scope.class2 = true;
    $scope.class3 = true;
    $scope.class4 = true;
    $scope.class5 = true;
    $scope.newListing = angular.copy(listing);
    if ($scope.newListing.hasOwnProperty("price")) {
        $scope.newListing.price = parseFloat($scope.newListing.price);
    }
    $scope.alreadyClicked = false;
    if (! $scope.newListing.images){
        $scope.newListing.images = [];
    };
    if ($scope.newListing.images.length == 0){
        $scope.hideCurrentImages = true;
    } else {
        $scope.hideCurrentImages = false;
        $scope.currentImages = angular.copy($scope.newListing.images);
    }

    $scope.imageDeleteUrl = window.location.origin + window.location.pathname + 'img/useruploads/index.php?file=';
    //http://localhost:8888/cholical.github.io/img/useruploads/index.php?file=9d1640e4003dcd960136f325f43cc85a.jpg
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
        $scope.editListing = true;
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
        $scope.newListing.acceptingOffers = "true";
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
        $scope.deleteUploads();
        $modalInstance.dismiss('close');
    };

    $scope.finalSubmitStage = false;
    $scope.continueSubmit = function() {
        if ($scope.editListing){
            $scope.submitListing();
        } else {
            $scope.finalSubmitStage = true;
            $scope.hideNewMessage = true;

         }
    }

    $scope.backToNewListing = function() {
        $scope.finalSubmitStage = false;
        $scope.hideNewMessage = false;
    }

    $scope.submitListing = function() {

        if ($scope.alreadyClicked == false){
            console.log($scope.imageName);
            $scope.alreadyClicked = true;

            $scope.deleteToBeDeleted();
            //deletes any queued files then runs continueSubmission when finished

        } else {
            console.log('you already pressed submit');
        }
    };

    //second part of submitListing
    $scope.continueSubmission = function() {
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
            console.log(data);
            $scope.itemId = data;
            $scope.itemId = $scope.itemId.replace(/\s+/g, '');
            newListingSvc.setItemId($scope.itemId);
            console.log($scope.newListing);
            $modalInstance.close();
        });
    }

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
        if ($scope.newListing.hasOwnProperty("service_id")) {
                $scope.deleteId = $scope.newListing.service_id;
            }
            newListingSvc.setDeleteId($scope.deleteId);
       
        $scope.deleteAllUploads();
        //call the php script
        newListingSvc.deleteListing($scope.newListing).then(function(data) {
            //$scope.phpDebug = data;
        });
        console.log('listing deleted');
        $modalInstance.close();
    };

  }]);
}());
