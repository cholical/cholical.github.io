(function () {

  "use strict";
  var app, newListingVar, itemIdVar, deleteIdVar, getNewListing, setNewListing, deleteListing, setItemId, getItemId, setDeleteId, getDeleteId, checkPassword;
  
  app = angular.module('tclassified');

  app.factory('newListingSvc', ['$http', '$log', function newListingSvc($http, $log) {

    var newListingVar;
    var itemIdVar;
    var deleteIdVar = 0;

    getNewListing = function() {
        return newListingVar;
    };

    setNewListing = function(newListing) {
        newListingVar = newListing;
        if (! newListing.price){
          newListing.price = 0;
        }
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
              "textbook_id": newListingVar.textbook_id,
              
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
              "date" : newListingVar.date,
              "accessory_id" : newListingVar.accessory_id



            }

          }).then(function(response) {
          return response.data;
        });
        }
    };

    deleteListing = function(newListing) {
        newListingVar = newListing;
        if (newListingVar.hasOwnProperty("textbookName")) {
        console.log("deleted Listing for textbook");
        return $http({
            method: "post",
            url: "deleteListing.php", 
            data: {
              "listingType" : "textbooks",
              "textbook_id": newListingVar.textbook_id
            }

          }).then(function(response) {
          return response.data;
        });
        
        }

        //new if
        if (newListingVar.hasOwnProperty("accessoryName")) {
          console.log("deleted Listing for accessories");
        return $http({
            method: "post",
            url: "deleteListing.php", 
            data: {
              "listingType" : "accessories",
              "accessory_id" : newListingVar.accessory_id
            }

          }).then(function(response) {
          return response.data;
        });
        }
    };

    setItemId = function(itemId) {
        itemIdVar = itemId;
    }

    getItemId = function() {
        return itemIdVar;
    }

    setDeleteId = function(deleteId) {
        deleteIdVar = deleteId;
    }

    getDeleteId = function() {
        return deleteIdVar;
    }

    checkPassword = function(passwordInput, currentItem) {
      if (currentItem.hasOwnProperty("textbookName")) {
        return $http({
            method: "post",
            url: "getPassword.php", 
            data: {
              "listingType" : "accessories",
              "password" : passwordInput,
              "textbook_id" : currentItem.textbook_id
            }

          }).then(function(response) {
          return response.data;
        });
      }
      else if (currentItem.hasOwnProperty("accessoryName")) {
        return $http({
            method: "post",
            url: "getPassword.php", 
            data: {
              "listingType" : "accessories",
              "password" : passwordInput,
              "accessory_id" : currentItem.accessory_id
            }

          }).then(function(response) {
          return response.data;
        });
      }
      
    }

    return {
      newListingVar: newListingVar,
      itemIdVar: itemIdVar,
      deleteIdVar: deleteIdVar,
      getNewListing: getNewListing,
      setNewListing: setNewListing,
      deleteListing: deleteListing,
      setItemId: setItemId,
      getItemId: getItemId,
      setDeleteId: setDeleteId,
      getDeleteId: getDeleteId,
      checkPassword: checkPassword
     
    };
  }]);
  
}());