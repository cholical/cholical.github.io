(function () {

  "use strict";
  var app, makeAccessories, getAccessories, postAccessories;
  
  app = angular.module('tclassified');

  app.factory('accessoriesSvc', ['$http', '$log', function accessoriesSvc($http, $log) {
    
    getAccessories = function() {
      //This function will eventually be the ajax call to the backend server
       return $http({
            method: "post",
            url: "getListings.php", 
            data: {
              "listingType" : "accessories"
            }

          }).then(function(response) {
          return response.data;
        })
    }

    postAccessories = function() {
      //This function will eventually be the ajax push to the backend server
    }
    

    return {
      makeAccessories: makeAccessories,
      getAccessories: getAccessories,
      postAccessories: postAccessories
     
    };
  }]);
  
}());