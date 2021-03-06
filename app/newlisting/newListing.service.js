(function () {

  "use strict";
  var app, newListingVar, itemIdVar, deleteIdVar, getNewListing, setNewListing, deleteListing, setItemId, getItemId, setDeleteId, getDeleteId, checkPassword, setInfo, getInfo, addCommentToPost;

  app = angular.module('tclassified');

  app.factory('newListingSvc', ['$http', '$log', function newListingSvc($http, $log) {

    var newListingVar;
    var itemIdVar;
    var deleteIdVar = 0;
    var infoVar;
    var commentVar;

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
              "images": newListingVar.images,
              "author" : newListingVar.author,
              "edition" : newListingVar.edition,
              "class1" :newListingVar.class1,
              "class2" : newListingVar.class2,
              "class3" : newListingVar.class3,
              "class4" : newListingVar.class4,
              "class5" : newListingVar.class5,
              "ISBN" : newListingVar.ISBN
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
              "accessory_id" : newListingVar.accessory_id,
              "images" : newListingVar.images


            }

          }).then(function(response) {
          return response.data;
        });
        }

        if (newListingVar.hasOwnProperty("serviceName")) {
          console.log("sumitted new Listing for service");
        return $http({
            method: "post",
            url: "submitNewListing.php",
            data: {
              "listingType" : "services",
              "serviceName" : newListingVar.serviceName,
              "price" : newListingVar.price,
              "acceptingOffers": newListingVar.acceptingOffers,
              "sellerName" : newListingVar.sellerName,
              "description" : newListingVar.description,
              "contactInfo" : newListingVar.contactInfo,
              "password" : newListingVar.password,
              "date" : newListingVar.date,
              "service_id" : newListingVar.service_id,
              "images" : newListingVar.images



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

        if (newListingVar.hasOwnProperty("serviceName")) {
          console.log("deleted Listing for services");
        return $http({
            method: "post",
            url: "deleteListing.php",
            data: {
              "listingType" : "services",
              "service_id" : newListingVar.service_id
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
              "listingType" : "textbooks",
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

      else if (currentItem.hasOwnProperty("serviceName")) {
        return $http({
            method: "post",
            url: "getPassword.php",
            data: {
              "listingType" : "services",
              "password" : passwordInput,
              "service_id" : currentItem.service_id
            }

          }).then(function(response) {
          return response.data;
        });
      }

    }

    setInfo = function(info) {
      infoVar = info;
    }

    getInfo = function() {
      return infoVar;
    }

    addCommentToPost = function(currentItem) {
      if (currentItem.hasOwnProperty("textbookName")) {
        return $http({
            method: "post",
            url: "addComment.php",
            data: {
              "listingType" : "textbooks",
              "comments" : currentItem.comments,
              "textbook_id" : currentItem.textbook_id
            }

          }).then(function(response) {
              newListingVar = currentItem;
              return response.data;
        });
      }
      else if (currentItem.hasOwnProperty("accessoryName")) {
        return $http({
            method: "post",
            url: "addComment.php",
            data: {
              "listingType" : "accessories",
              "comments" : currentItem.comments,
              "accessory_id" : currentItem.accessory_id
            }

          }).then(function(response) {
              newListingVar = currentItem;
              return response.data;
        });
      }

      else if (currentItem.hasOwnProperty("serviceName")) {
        return $http({
            method: "post",
            url: "addComment.php",
            data: {
              "listingType" : "services",
              "comments" : currentItem.comments,
              "service_id" : currentItem.service_id
            }

          }).then(function(response) {
              newListingVar = currentItem;
              return response.data;
        });
      }
    };

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
      checkPassword: checkPassword,
      setInfo: setInfo,
      getInfo: getInfo,
      addCommentToPost: addCommentToPost

    };
  }]);

}());
