(function () {

  "use strict";
  var app, getTextbooks;
  
  app = angular.module('tclassified');

  app.factory('textbooksSvc', ['$http', '$log', function textbooksSvc($http, $log) {
    
    getTextbooks = function () {
      return "Hello";
    };

    return {
      getTextbooks: getTextbooks,
     
    };
  }]);
  
}());