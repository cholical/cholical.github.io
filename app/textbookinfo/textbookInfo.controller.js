(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('textbookInfoCtrl', ['$scope', '$modalInstance', '$modal', '$stateParams', '$log', 'data', function textbookInfoCtrl($scope, $modalInstance, $modal, $stateParams, $log, data){

    $scope.textbook = data;
    $scope.close = function () {
		    $modalInstance.dismiss('close');
	  };
	  $scope.passwordInput;
    $scope.checkPasswordInput = function(currentTextbook) {
        console.log($scope.passwordInput)
        if ($scope.passwordInput === $scope.textbook.password) {
            var modalInstance = $modal.open({
            templateUrl: 'app/edittextbook/editTextbook.html',
            controller: 'editTextbookCtrl',
            resolve: {
                data: function() {
                    return currentTextbook;
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


