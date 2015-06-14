(function () {

  'use strict';
  var app, onTextbookSuccess;

  app = angular.module("tclassified");
  app.controller('textbooksCtrl', ['$scope', 'textbooksSvc', 'newListingSvc', '$modal', '$stateParams', '$log', function textbooksCtrl($scope, textbooksSvc, newListingSvc, $modal, $stateParams, $log){

    $scope.textbooks = textbooksSvc.getTextbooks();
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.sortType = "date";
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
    };

    $scope.createNewListing = function() {
      var modalInstance = $modal.open({
        templateUrl: 'app/newlisting/newListing.html',
        controller: 'newListingCtrl',
        size: 'lg'
      })
      modalInstance.result.then(function() {
        $scope.textbooks.push(newListingSvc.getNewListing());
        //Function to store new $scope.textbooks into the backend
      }, 
      function() {
        console.log("new list not created");
      });
    };

    $scope.changeBarActive = function() {
        document.getElementById("textbooksBar").className = "active";
    };

    

    
  }]);
}());