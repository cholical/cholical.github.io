(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('infoCtrl', ['$scope', '$modalInstance', '$modal', '$stateParams', '$log', 'data', function infoCtrl($scope, $modalInstance, $modal, $stateParams, $log, data){

    $scope.item = data;
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
	  $scope.passwordInput;
    $scope.checkPasswordInput = function(currentItem) {
        console.log($scope.passwordInput)
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
        }
        else {
          console.log("password incorrect");
        }
    }

  }]);
}());


