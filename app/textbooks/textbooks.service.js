(function () {

  "use strict";
  var app, makeTextbooks, getTextbooks, postTextbooks;
  
  app = angular.module('tclassified');

  app.factory('textbooksSvc', ['$http', '$log', function textbooksSvc($http, $log) {


    
    makeTextbooks = function () {
      //Sample textbooks stored on the front end
      return [
        {
          textbookName: "Ronald's Book",
          author: "Ronald Ding",
          edition: 12,
          classes: [
            "Bladder Controll 101", "AMST 101"
          ],
          price: 100,
          acceptingOffers: true,
          sellerName: "Cholical",
          description: "Buy this book please",
          contactInfo: "abc123@yahoo.com",
          password: "no"
        },
        {
          textbookName: "Mac's Book",
          author: "Mac",
          edition: 3,
          classes: [
            "Not a real class 123", "ABCD 101"
          ],
          price: 10,
          acceptingOffers: true,
          sellerName: "mac",
          description: "cheap",
          contactInfo: "macattack@gmail.com",
          password: "no"
        },
        {
          textbookName: "One more book",
          author: "nobody cares",
          edition: 101,
          classes: [
            "bobsledding 201", "NIPS 101"
          ],
          price: 2,
          acceptingOffers: false,
          sellerName: "Cholical",
          description: "I am desperate, buy my stuff",
          contactInfo: "abc123@yahoo.com",
          password: "no"
        },
      ]
    };

    getTextbooks = function() {
      //This function will eventually be the ajax call to the backend server
      return makeTextbooks();
    }

    postTextbooks = function() {
      //This function will eventually be the ajax push to the backend server
    }

    return {
      makeTextbooks: makeTextbooks,
      getTextbooks: getTextbooks,
      postTextbooks: postTextbooks
     
    };
  }]);
  
}());