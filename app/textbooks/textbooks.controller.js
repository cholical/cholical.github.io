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

    
  }]);
}());