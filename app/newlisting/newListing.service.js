(function () {

  "use strict";
  var app, newListingVar, getNewListing, setNewListing;
  
  app = angular.module('tclassified');

  app.factory('newListingSvc', ['$http', '$log', function newListingSvc($http, $log) {

    var newListingVar;

    getNewListing = function() {
        return newListingVar;
    };

    setNewListing = function(newListing) {
        newListingVar = newListing;
        if (newListingVar.hasOwnProperty("textbookName")) {
        console.log("sumitted new Listing for textbook");
        return $http({
            method: "post",
            url: "submitNewListing.php", 
            data: {
              "listingType" : "textbooks",
              "textbookName" : newListing.textbookName,
              "price" : newListingVar.price,
              "acceptingOffers": newListingVar.acceptingOffers,
              "sellerName" : newListingVar.sellerName,
              "description" : newListingVar.description,
              "contactInfo" : newListingVar.contactInfo,
              "password" : newListingVar.password,
              "date" : newListingVar.date,
              
              "author" : newListingVar.author,
              "edition" : newListingVar.edition,
              "class1" :newListingVar.class1,
              "class2" : newListingVar.class2,
              "class3" : newListingVar.class3,
              "class4" : newListingVar.class4,
              "class5" : newListingVar.class5
            }

          }).then(function(response) {
          return response.data;
        });
        
        }

        //new if
        if (newListingVar.hasOwnProperty("accessoryName")) {
          console.log("sumitted new Listing for accessories");
        return $http({
            method: "post",
            url: "submitNewListing.php", 
            data: {
              "listingType" : "accessories",
              "accessoryName" : newListingVar.accessoryName,
              "price" : newListingVar.price,
              "acceptingOffers": newListingVar.acceptingOffers,
              "sellerName" : newListingVar.sellerName,
              "description" : newListingVar.description,
              "contactInfo" : newListingVar.contactInfo,
              "password" : newListingVar.password,
              "date" : newListingVar.date


            }

          }).then(function(response) {
          return response.data;
        });
        }
    };

    return {
      newListingVar: newListingVar,
      getNewListing: getNewListing,
      setNewListing: setNewListing
     
    };
  }]);
  
}());