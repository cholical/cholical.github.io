(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('prototype1Ctrl', ['$scope', function prototype1Ctrl($scope){

    $scope.pageSize = 4;
    $scope.currentPage = 1;
    $scope.sortType = "name";
    $scope.sortReverse = false;
    $scope.searchBar = "";
    $scope.items = [
      {
        name: "Item 1",
        type: "true"
      },
      {
        name: "Item 2",
        type: "false"
      },
      {
        name: "Item 3",
        type: "true"
      },
      {
        name: "Item 4",
        type: "false"
      },
      {
        name: "Item 5",
        type: "true"
      },
      {
        name: "Item 6",
        type: "false"
      },
      {
        name: "Item 7",
        type: "true"
      },
      {
        name: "Item 8",
        type: "false"
      }
    ]


  }]);
}());
