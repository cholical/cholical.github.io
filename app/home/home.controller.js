(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('homeCtrl', ['$scope', 'homeSvc', '$stateParams', '$log', function homeCtrl($scope, homeSvc, $stateParams, $log){
    $scope.mac = true;
    $scope.showButton = false;
    $scope.showMessage = function() {
    	$scope.mac = false;
    	$scope.showButton = true;
    }
    
  }]);
}());