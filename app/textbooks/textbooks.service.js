(function () {

  "use strict";
  var app, getTextbooks;
  
  app = angular.module('tclassified');

  app.factory('textbooksSvc', ['$http', '$log', function textbooksSvc($http, $log) {

    getTextbooks = function() {


        return $http({
            method: "post",
            url: "getListings.php", 
            data: {
              "listingType" : "textbooks"
            }

          }).then(function(response) {
          return response.data;
        }
            
        );
    }

    return {
      getTextbooks: getTextbooks,
     
    };
  }]);
  
}());