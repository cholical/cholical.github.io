(function () {

  "use strict";
  var app, makeAccessories, getAccessories, postAccessories;
  
  app = angular.module('tclassified');

  app.factory('accessoriesSvc', ['$http', '$log', function accessoriesSvc($http, $log) {
    
    makeAccessories = function () {
      //Sample textbooks stored on the front end
      return [
        {
            accessoryName: "Wide Screen TV",
            price: 100,
            acceptingOffers: true,
            sellerName: "Ronald",
            description: "55 inch television by Samsung. May or may not work",
            contactInfo: "911-911-9111",
            password: "no",
            date: new Date()
        },
        {
            accessoryName: "iClicker Newest Version",
            price: 10,
            acceptingOffers: true,
            sellerName: "The Other Ronald",
            description: "Use this to answer questions in class. There are free clicker apps out there but your professor doesn't trust you enough",
            contactInfo: "Facebook Message me at facebook.com/nobodycares",
            password: "no",
            date: 1288323623006
        },
        {
            accessoryName: "Cardboard Box",
            price: 1000,
            acceptingOffers: true,
            sellerName: "Mac",
            description: "Special cardboard box",
            contactInfo: "veryspecialbox@live.unc.edu",
            password: "no",
            date: 128323623006
        },
      ]
    };

    getAccessories = function() {
      //This function will eventually be the ajax call to the backend server
      return makeAccessories();
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