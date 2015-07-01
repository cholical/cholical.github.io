(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('contactCtrl', ['$scope', '$stateParams', '$log', function contactCtrl($scope, $stateParams, $log){

    $scope.changeBarActive = function() {
        document.getElementById("contactBar").className = "active";
    }
    
  }]);
}());