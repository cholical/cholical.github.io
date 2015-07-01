(function () {

  'use strict';
  var app, onTextbookSuccess;

  app = angular.module("tclassified");
  app.controller('textbooksCtrl', ['$scope', 'textbooksSvc', 'newListingSvc', '$modal', '$state', '$stateParams', '$log', function textbooksCtrl($scope, textbooksSvc, newListingSvc, $modal, $state, $stateParams, $log){

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
    $scope.$watch( function () { return newListingSvc.getNewListing()}, function(newValue, oldValue) {
      console.log("Watch statement from textbook.info entered");

       angular.forEach($scope.textbooks, function(textbook) {
         if (newValue.textbook_id == textbook.textbook_id) {
            textbook.textbookName = newValue.textbookName;
            textbook.price = newValue.price;
            textbook.acceptingOffers = newValue.acceptingOffers;
            textbook.sellerName = newValue.sellerName;
            textbook.description = newValue.description;
            textbook.contactInfo = newValue.contactInfo;
            textbook.password = newValue.password;
            textbook.date = newValue.date;
            textbook.classes = newValue.classes;
            textbook.edition = newValue.edition;
            textbook.author = newValue.author;
            textbook.class1 = newValue.classes[0];
            textbook.class2 = newValue.classes[1];
            textbook.class3 = newValue.classes[2];
            textbook.class4 = newValue.classes[3];
            textbook.class5 = newValue.classes[4];
         }
       })

    });

    $scope.$watch( function () { return newListingSvc.getDeleteId()}, function(newValue, oldValue) {
      console.log("Watch statement from deletion entered");
      if (newValue != 0) {

       angular.forEach($scope.textbooks, function(textbook) {
          if (newValue == textbook.textbook_id) {
            var index = $scope.textbooks.indexOf(textbook);
            if (index > -1) {
              $scope.textbooks.splice(index, 1);
            }
          }
       })
       newListingSvc.setDeleteId(0);
      }

    });

    $scope.getTextbookInfo = function(textbook) {
      newListingSvc.setInfo($scope.textbooks);

      $state.go('textbooks.info', {textbook_id: textbook.textbook_id});
  
     };

    var onPostSuccess = function(data) {
      console.log("Post Success!");
    };

    $scope.createNewListing = function() {
      var modalInstance = $modal.open({
        templateUrl: 'app/newlisting/newListing.html',
        controller: 'newListingCtrl',
        size: 'lg',
        backdrop:'static',
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