(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('homeCtrl', ['$scope', '$stateParams', '$log', function homeCtrl($scope, $stateParams, $log){

    $scope.changeBarActive = function() {
        document.getElementById("homeBar").className = "active";
        document.getElementById("homeCustomStyle").className = "specialNav";
        document.getElementById("siteTitle").className = "animated fadeInDown";
        document.getElementById('schoolName').className = "animated fadeinDown schoolName";
    }


  }]);
}());