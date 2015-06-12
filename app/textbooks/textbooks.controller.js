(function () {

  'use strict';
  var app, onTextbookSuccess;

  app = angular.module("tclassified");
  app.controller('textbooksCtrl', ['$scope', 'textbooksSvc', '$stateParams', '$log', function textbooksCtrl($scope, textbooksSvc, $stateParams, $log){

    $scope.textbooks = textbooksSvc.getTextbooks();
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.sortType = "textbookName";
    $scope.sortReverse = false;
    
  }]);
}());