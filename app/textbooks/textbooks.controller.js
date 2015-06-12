(function () {

  'use strict';
  var app, onTextbookSuccess;

  app = angular.module("tclassified");
  app.controller('textbooksCtrl', ['$scope', 'textbooksSvc', '$modal', '$stateParams', '$log', function textbooksCtrl($scope, textbooksSvc, $modal, $stateParams, $log){

    $scope.textbooks = textbooksSvc.getTextbooks();
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.sortType = "textbookName";
    $scope.sortReverse = false;

    $scope.getTextbookInfo = function(textbook) {
    	var modalInstance = $modal.open({
    		templateUrl: 'app/textbookinfo/textbookInfo.html',
    		controller: 'textbookInfoCtrl',
    		resolve: {
    			data: function() {
    				return textbook;
    			}
    		},
    	    size: 'lg'
    	})
    }
    $scope.createNewListing = function() {
      $scope.hideNewListing = false;
      console.log("create new listing");
    }

    $scope.hideNewListing = true;
    $scope.changeBarActive = function() {
        document.getElementById("textbooksBar").className = "active";
    }

    $scope.cnTextbookName;
    $scope.cnTextbookEdition;

    
  }]);
}());