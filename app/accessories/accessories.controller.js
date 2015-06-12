(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('accessoriesCtrl', ['$scope', 'accessoriesSvc', '$stateParams', '$log', function accessoriesCtrl($scope, accessoriesSvc, $stateParams, $log){

  	$scope.changeBarActive = function() {
        document.getElementById("textbooksBar").className = "active";
    }
    
  }]);
}());