(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('accessoryInfoCtrl', ['$scope', '$modalInstance', '$modal', '$stateParams', '$log', 'data', function accessoryInfoCtrl($scope, $modalInstance, $modal, $stateParams, $log, data){

    $scope.accessory = data;
    $scope.close = function () {
		    $modalInstance.dismiss('close');
	  };
	  $scope.passwordInput;
    $scope.checkPasswordInput = function(currentAccessory) {
        console.log($scope.passwordInput)
        if ($scope.passwordInput === $scope.accessory.password) {
            var modalInstance = $modal.open({
            templateUrl: 'app/editaccessory/editAccessory.html',
            controller: 'editAccessoryCtrl',
            resolve: {
                data: function() {
                    return currentAccessory;
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


