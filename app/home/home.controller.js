(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('homeCtrl', ['$scope', '$stateParams', '$log', function homeCtrl($scope, $stateParams, $log){

    $scope.changeBarActive = function() {
        document.getElementById("homeBar").className = "active";
    }
    
  }]);
}());