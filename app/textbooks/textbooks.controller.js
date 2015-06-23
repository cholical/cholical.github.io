(function () {

  'use strict';
  var app, onTextbookSuccess;

  app = angular.module("tclassified");
  app.controller('textbooksCtrl', ['$scope', 'textbooksSvc', 'newListingSvc', '$modal', '$stateParams', '$log', function textbooksCtrl($scope, textbooksSvc, newListingSvc, $modal, $stateParams, $log){

    var onTextbookSuccess = function(data) {
      $scope.textbooks = data;
      angular.forEach($scope.textbooks, function (textbook) {
      textbook.classes = [];
      if (textbook.class1 != "") {
          textbook.classes[0] = textbook.class1;
      };
      if (textbook.class1 != "") {
          textbook.classes[1] = textbook.class2;
      };
      if (textbook.class1 != "") {
          textbook.classes[2] = textbook.class3;
      };
      if (textbook.class1 != "") {
          textbook.classes[3] = textbook.class4;
      };
      if (textbook.class1 != "") {
          textbook.classes[4] = textbook.class5;
      }
      
      textbook.price = parseInt(textbook.price);
      textbook.date = new Date(textbook.date);
    })
    };
    textbooksSvc.getTextbooks().then(onTextbookSuccess);



    $scope.pageSize = 12;
    $scope.currentPage = 1;
    $scope.sortType = "date";
    $scope.sortReverse = true;
    $scope.listing = {
      //price: 0,
      acceptingOffers: true,
      classes: [],
      edition: "No"
    };
    $scope.tempListing;

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
      modalInstance.result.then(function() {}, function() {


        $scope.tempListing = newListingSvc.getNewListing();
        if (newListingSvc.getDeleteId() != 0) {

          angular.forEach($scope.textbooks, function(textbooks) {
                if (textbook.textbook_id == $scope.tempListing.textbook_id) {
                    //function to remove accessory from $scope.accessories;
                    var index = $scope.textbooks.indexOf(textbook);
                    if (index > -1) {
                        $scope.textbooks.splice(index, 1);
                    }
                }
            });
            newListingSvc.setDeleteId(0);

        } else {
            angular.forEach($scope.textbooks, function(textbook) {
              if (textbook.textbook_id == $scope.tempListing.textbook_id) {
                  //change each property of accessory into angular.copy() of that of scope.tempLisitng;
                  textbook.textbookName = $scope.tempListing.textbookName;
                  textbook.price = $scope.tempListing.price;
                  textbook.acceptingOffers = $scope.tempListing.acceptingOffers;
                  textbook.sellerName = $scope.tempListing.sellerName;
                  textbook.description = $scope.tempListing.description;
                  textbook.contactInfo = $scope.tempListing.contactInfo;
                  textbook.password = $scope.tempListing.password;
                  textbook.date = $scope.tempListing.date;
                  textbook.classes = $scope.tempListing.classes;
                  textbook.edition = $scope.tempListing.edition;
                  textbook.author = $scope.tempListing.author;
                  textbook.class1 = $scope.tempListing.classes[0];
                  textbook.class2 = $scope.tempListing.classes[1];
                  textbook.class3 = $scope.tempListing.classes[2];
                  textbook.class4 = $scope.tempListing.classes[3];
                  textbook.class5 = $scope.tempListing.classes[4];
              }
          });
          }

      });
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
        $scope.textbooks.unshift(newListingSvc.getNewListing());
        $scope.sortType = "textbookName";
        $scope.sortType = "date";
                    $scope.sortType = "date";
            $scope.itemId = newListingSvc.getItemId();
            console.log($scope.itemId);
            angular.forEach($scope.textbooks, function(textbook) {
                console.log("foreach run");
                if (textbook.hasOwnProperty("textbook_id")) {

                } else {
                    textbook.textbook_id = angular.copy($scope.itemId);
                }
              }
      )}, 
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