(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('aboutCtrl', ['$scope', '$stateParams', '$log', function aboutCtrl($scope, $stateParams, $log){

    $scope.changeBarActive = function() {
        document.getElementById("aboutBar").className = "active";
    }
    
  }]);
}());