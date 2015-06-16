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
          password: "no",
          date: new Date()
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
          password: "no",
          date: 1288323623006
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
          password: "no",
          date: 128323623006
        },
      ]
    };

    getTextbooks = function() {
      //This function will eventually be the ajax call to the backend server
       return $http.get("http://localhost:8888/tclassifieds/json/textbooks.json").then(
        function (response) {
          return response.data;
        });
    }

    postTextbooks = function(updateJsonObject) {
      return $http.post("http://localhost:8888/tclassifieds/json/textbooks.json", updateJsonObject).then(
        function(response){
          return response.data;
        });      
    }

    return {
      makeTextbooks: makeTextbooks,
      getTextbooks: getTextbooks,
      postTextbooks: postTextbooks
     
    };
  }]);
  
}());