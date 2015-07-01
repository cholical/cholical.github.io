(function () {

  "use strict";
  var app, report;

  app = angular.module('tclassified');

  app.factory('contactSvc', ['$http', '$log', function contactSvc($http, $log) {

    report = function (item, reason) {
      console.log("Item is being reported");
      var listingType;
      var itemId;
      if (item.hasOwnProperty("textbook_id")) {
          listingType = "textbooks";
          itemId = item.textbook_id;
      }
      if (item.hasOwnProperty("accessory_id")) {
          listingType = "accessory";
          itemId = item.accessory_id;
      }

      return $http({
            method: "post",
            url: "report.php",
            data: {
              "listingType" : listingType,
              "item_id" : itemId,
              "reason" : reason
            }
          }).then(function(response) {
          return response.data;
        });
      }

    



    return {
      report: report
    };
  }]);

}());
