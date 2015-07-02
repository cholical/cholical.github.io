(function () {

  "use strict";
  var app, makeServices, getServices, postServices;
  
  app = angular.module('tclassified');

  app.factory('servicesSvc', ['$http', '$log', function servicesSvc($http, $log) {
    
    getServices = function() {
      //This function will eventually be the ajax call to the backend server
       return $http({
            method: "post",
            url: "getListings.php", 
            data: {
              "listingType" : "services"
            }

          }).then(function(response) {
          return response.data;
        })
    }

    postServices = function() {
      //This function will eventually be the ajax push to the backend server
    }
    

    return {
      makeServices: makeServices,
      getServices: getServices,
      postServices: postServices
     
    };
  }]);
  
}());