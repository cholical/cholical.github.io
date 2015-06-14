(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('servicesCtrl', ['$scope', '$stateParams', '$log', function servicesCtrl($scope, $stateParams, $log){

    $scope.changeBarActive = function() {
        document.getElementById("serviceBar").className = "active";
    }
    
  }]);
}());