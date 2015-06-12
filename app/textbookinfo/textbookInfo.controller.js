(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('textbookInfoCtrl', ['$scope', '$modalInstance', '$stateParams', '$log', 'data', function textbookInfoCtrl($scope, $modalInstance, $stateParams, $log, data){

    $scope.textbook = data;
    $scope.close = function () {
		    $modalInstance.dismiss('close');
	};
	$scope.passwordInput;


    
  }]);
}());


