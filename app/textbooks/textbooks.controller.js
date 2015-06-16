(function () {

  'use strict';
  var app, onTextbookSuccess;

  app = angular.module("tclassified");
  app.controller('textbooksCtrl', ['$scope', 'textbooksSvc', 'newListingSvc', '$modal', '$stateParams', '$log', function textbooksCtrl($scope, textbooksSvc, newListingSvc, $modal, $stateParams, $log){

    var onTextbookSuccess = function(data) {
      $scope.textbooks = data;
    };
    textbooksSvc.getTextbooks().then(onTextbookSuccess);
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.sortType = "date";
    $scope.sortReverse = true;

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

    var onPostSuccess = function(data) {
      console.log("Post Success!");
    };

    $scope.createNewListing = function() {
      var modalInstance = $modal.open({
        templateUrl: 'app/newlisting/newListing.html',
        controller: 'newListingCtrl',
        size: 'lg'
      })
      modalInstance.result.then(function() {
        $scope.textbooks.push(newListingSvc.getNewListing());
        textbooksSvc.postTextbooks($scope.textbooks).then(onPostSuccess);
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