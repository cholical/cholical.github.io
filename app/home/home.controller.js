(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('homeCtrl', ['$scope', 'homeSvc', '$stateParams', '$log', function homeCtrl($scope, homeSvc, $stateParams, $log){
    $scope.butt = "Butt Butt Butt, You're a Butt";
    
  }]);
}());