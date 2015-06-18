(function () {

  'use strict';
  var app, onTextbookSuccess;

  app = angular.module("tclassified");
  app.controller('textbooksCtrl', ['$scope', 'textbooksSvc', 'newListingSvc', '$modal', '$stateParams', '$log', function textbooksCtrl($scope, textbooksSvc, newListingSvc, $modal, $stateParams, $log){

    var onTextbookSuccess = function(data) {
      $scope.textbooks = data;
    };
    textbooksSvc.getTextbooks().then(onTextbookSuccess);
    $scope.pageSize = 12;
    $scope.currentPage = 1;
    $scope.sortType = "date";
    $scope.sortReverse = true;
    $scope.listing = {
      price: 0,
      acceptingOffers: true
    };

    $scope.getTextbookInfo = function(textbook) {
    	var modalInstance = $modal.open({
    		templateUrl: 'app/info/info.html',
    		controller: 'infoCtrl',
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
        size: 'lg',
        resolve:  {
          listing: function() {
            return $scope.listing;
          },
          type: function() {
            return "textbook";
          }
        }
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

    $scope.makeActive = function(sortParameter) {
        var activeParameter = sortParameter + "SortId";
        document.getElementById("textbookNameSortId").className = "clickSort";
        document.getElementById("authorSortId").className = "clickSort";
        document.getElementById("editionSortId").className = "clickSort";
        document.getElementById("priceSortId").className = "clickSort";
        document.getElementById("dateSortId").className = "clickSort";
        document.getElementById(activeParameter).className = "clickSort activeSort";

    }

    

    
  }]);
}());