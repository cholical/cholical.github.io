(function () {

  "use strict";
  var app, getAccessories;
  
  app = angular.module('tclassified');

  app.factory('accessoriesSvc', ['$http', '$log', function accessoriesSvc($http, $log) {
    
    getAccessories = function () {
      return "Hello";
    };
    
    

    return {
      getAccessories: getAccessories,
     
    };
  }]);
  
}());