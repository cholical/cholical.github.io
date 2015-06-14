(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('homeCtrl', ['$scope', 'homeSvc', '$stateParams', '$log', function homeCtrl($scope, homeSvc, $stateParams, $log){

    $scope.changeBarActive = function() {
        document.getElementById("homeBar").className = "active";
    }
    
  }]);
}());