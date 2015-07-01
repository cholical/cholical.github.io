(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('contactCtrl', ['$scope', 'contactSvc', '$stateParams', '$log', function contactCtrl($scope, contactSvc, $stateParams, $log){

    $scope.type = "general";
    $scope.senderName;
    $scope.senderEmail;
    $scope.message;
    $scope.submitComplete = true;

    $scope.changeBarActive = function() {
        document.getElementById("contactBar").className = "active";
    }

    $scope.submit = function() {
        contactSvc.contact($scope.type, $scope.senderName, $scope.senderEmail, $scope.message).then(function() {
          $scope.submitComplete = false;
        });
    }
    
  }]);
}());