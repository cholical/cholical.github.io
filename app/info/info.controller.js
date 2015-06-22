(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('infoCtrl', ['$scope', '$modalInstance', '$modal', '$stateParams', 'newListingSvc', '$log', 'data', function infoCtrl($scope, $modalInstance, $modal, $stateParams, newListingSvc, $log, data){

    $scope.item = data;
    $scope.passwordInput;
    if ($scope.item.hasOwnProperty("textbookName")) { 
        console.log("textbook passed in");
        $scope.typeOfObject = "textbook";
        $scope.textbookHideObject = false;
        $scope.accessoryHideObject = true;
        $scope.serviceHideObject = true;
    } else if ($scope.item.hasOwnProperty("accessoryName")) {
        console.log("accessory passed in");
        $scope.typeOfObject = "accessory";
        $scope.textbookHideObject = true;
        $scope.accessoryHideObject = false;
        $scope.serviceHideObject = true;
    } else if ($scope.item.hasOwnProperty("serviceName")) {
        console.log("service passed in");
        $scope.typeOfObject = "service";
        $scope.textbookHideObject = true;
        $scope.accessoryHideObject = true;
        $scope.serviceHideObject = false;
    }

    $scope.close = function () {
		    $modalInstance.dismiss('close');
	  };
	
    $scope.checkPasswordInput = function(currentItem) {
        if ($scope.passwordInput === $scope.item.password) {
            var modalInstance = $modal.open({
            templateUrl: 'app/newlisting/newListing.html',
            controller: 'newListingCtrl',
            resolve: {
                listing: function() {
                    return currentItem;
                },
                type: function() {
                    return $scope.typeOfObject;
                }
            },
            size: 'lg'
            })

            //Code for updating editing and deletion on the front end
            modalInstance.result.then(function() {
                if (newListingSvc.getDeleteId() != 0) {
                    $scope.item = newListingSvc.getNewListing();
                    $scope.close();
                } else {
                    $scope.item = newListingSvc.getNewListing();
                }

                
            });


        }
        else {
          console.log("password incorrect");
        }
    }

    $scope.passwordField = true;
    $scope.editButton = false;
    $scope.passwordSubmitButton = true;

    $scope.editPostButton = function(){
        $scope.passwordField = false;
        $scope.editButton = true;
        $scope.passwordSubmitButton = false;
    };

  }]);
}());


