(function () {

  "use strict";
  var app, getSchools;
  
  app = angular.module('tclassified');

  app.factory('homeSvc', ['$http', '$log', function homeSvc($http, $log) {
    
    getSchools = function (universityId) {
      return "Hello";
    };
    
    

    return {
      getSchools: getSchools,
     
    };
  }]);
  
}());