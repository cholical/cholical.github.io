(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('servicesCtrl', ['$scope', 'servicesSvc', 'newListingSvc', '$modal', '$stateParams', '$state', '$log', function servicesCtrl($scope, servicesSvc, newListingSvc, $modal, $stateParams, $state, $log){

        $scope.$state = $state;
    var onServicesSuccess = function(data) {
      $scope.services = data;
      angular.forEach($scope.services, function(service) {
        service.price = parseFloat(service.price);
        service.date = new Date(service.date);
      });

    };
  	servicesSvc.getServices().then(onServicesSuccess);
  	$scope.pageSize = 12;
    $scope.currentPage = 1;
    $scope.sortType = "date";
    $scope.sortReverse = true;
    $scope.listing = {
      //price: 0,
      acceptingOffers: true
    }
    $scope.itemId;

    $scope.$watch( function () { return newListingSvc.getNewListing()}, function(newValue, oldValue) {
      console.log("Watch statement from services.info entered");

       angular.forEach($scope.services, function(service) {
         if (newValue.service_id == service.service_id) {
            service.serviceName = newValue.serviceName;
            service.price = newValue.price;
            service.acceptingOffers = newValue.acceptingOffers;
            service.sellerName = newValue.sellerName;
            service.description = newValue.description;
            service.contactInfo = newValue.contactInfo;
            service.password = newValue.password;
            service.date = newValue.date;
         }
       })

    });

    $scope.$watch( function () { return newListingSvc.getDeleteId()}, function(newValue, oldValue) {
      console.log("Watch statement from deletion entered");
      if (newValue != 0) {

       angular.forEach($scope.services, function(service) {
          if (newValue == service.service_id) {
            var index = $scope.services.indexOf(service);
            if (index > -1) {
              $scope.services.splice(index, 1);
            }
          }
       })
       newListingSvc.setDeleteId(0);
      }

    });

    $scope.getServiceInfo = function(service) {
      newListingSvc.setInfo($scope.services);
      $state.go('services.info', {service_id: service.service_id});
    };

    $scope.createNewListing = function() {
      var modalInstance = $modal.open({
        templateUrl: 'app/newlisting/newListing.html',
        controller: 'newListingCtrl',
        size: 'lg',
        backdrop:'static',
        resolve:  {
          listing: function() {
            return $scope.listing;
          },
          type: function() {
            return "service";
          }
        }
      })
      modalInstance.result.then(function() {
            $scope.services.unshift(newListingSvc.getNewListing());

            $scope.sortType = "date";
            $scope.itemId = newListingSvc.getItemId();
            console.log($scope.itemId);
            angular.forEach($scope.services, function(service) {
                console.log("foreach run");
                if (service.hasOwnProperty("service_id")) {

                } else {
                    service.service_id = angular.copy($scope.itemId);
                }
      })
      


      }, 
      function() {
        console.log("new list not created");
      });
    };

    $scope.changeBarActive = function() {
        document.getElementById("servicesBar").className = "active";
    }

    $scope.makeActive = function(sortParameter) {
        var activeParameter = sortParameter + "SortId";
        document.getElementById("serviceNameSortId").className = "clickSort";
        document.getElementById("priceSortId").className = "clickSort";
        document.getElementById("dateSortId").className = "clickSort";
        document.getElementById(activeParameter).className = "clickSort activeSort";

    }
    
  }]);
}());