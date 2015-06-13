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
    };

    return {
      newListingVar: newListingVar,
      getNewListing: getNewListing,
      setNewListing: setNewListing
     
    };
  }]);
  
}());