(function () {

  "use strict";
  var app, contact;

  app = angular.module('tclassified');

  app.factory('contactSvc', ['$http', '$log', function contactSvc($http, $log) {

    contact = function (type, senderName, senderEmail, message) {
      console.log("Message is being sent");
      return $http({
            method: "post",
            url: "contact.php",
            data: {
              "type" : type,
              "senderName" : senderName,
              "senderEmail" : senderEmail,
              "message" : message
            }
          }).then(function(response) {
          return response.data;
        });
      }

    



    return {
      contact: contact
    };
  }]);

}());
