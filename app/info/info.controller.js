(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('infoCtrl', ['$scope', '$modalInstance', '$modal', '$stateParams', '$state', 'accessoriesSvc', 'textbooksSvc', 'newListingSvc', 'infoSvc', '$location', '$log', function infoCtrl($scope, $modalInstance, $modal, $stateParams, $state, accessoriesSvc, textbooksSvc, newListingSvc, infoSvc, $location, $log){


    //var accessoryNumber = parseInt(document.location.hash.slice(22));
    //console.log(accessoryNumber);
    $scope.itemList =  newListingSvc.getInfo();
    $scope.passwordInput;
    $scope.wrongPassword = false;
    $scope.passwordField = true;
    $scope.editButton = false;
    $scope.passwordSubmitButton = true;
    $scope.reportReason;

    $scope.$watch( function () { return $stateParams.accessory_id}, function(newValue, oldValue) {
        if (newValue != oldValue) {
            console.log("StateParam below");
            console.log($stateParams.accessory_id);
            console.log("StateParam changed; watch function entered");
            console.log($scope.itemList);
            angular.forEach($scope.itemList, function(accessory) {
                if (accessory.accessory_id == $stateParams.accessory_id) {
                    $scope.item = accessory;
                    console.log($scope.item);
                }
            })  
            
        }
        
    });

    $scope.$watch( function () { return $stateParams.textbook_id}, function(newValue, oldValue) {
        if (newValue != oldValue) {
            console.log("Textbook StateParam below");
            console.log($stateParams.textbook_id);
            console.log("Textbook StateParam changed; watch function entered");
            console.log($scope.itemList);
            angular.forEach($scope.itemList, function(textbook) {
                if (textbook.textbook_id == $stateParams.textbook_id) {
                    $scope.item = textbook;
                    console.log($scope.item);
                }
            })  
            
        }
        
    });


    var onItemsSuccess = function(data) {
      $scope.itemList = data;
      console.log("data has been loaded");
      angular.forEach($scope.itemList, function(tempItem) {

          if (tempItem.hasOwnProperty("accessory_id")) {
            if (tempItem.accessory_id == $stateParams.accessory_id) {
            $scope.item = tempItem;
            }
          }
          if (tempItem.hasOwnProperty("textbook_id")) {
            if (tempItem.textbook_id == $stateParams.textbook_id) {
            $scope.item = tempItem;
            }
          }

      });

      if ($scope.item.hasOwnProperty("textbookName")) { 
        console.log("textbook passed in");
        $scope.typeOfObject = "textbook";
        $scope.textbookHideObject = false;
        $scope.accessoryHideObject = true;
        $scope.serviceHideObject = true;
      } else if ($scope.item.hasOwnProperty("accessoryName")) {
        console.log("accessory passed in");
        $scope.typeOfObject = "accessory";
        $scope.textbookHideObject = true;
        $scope.accessoryHideObject = false;
        $scope.serviceHideObject = true;
      } else if ($scope.item.hasOwnProperty("serviceName")) {
        console.log("service passed in");
        $scope.typeOfObject = "service";
        $scope.textbookHideObject = true;
        $scope.accessoryHideObject = true;
        $scope.serviceHideObject = false;
      }

    };
    
    if ($scope.itemList === undefined) {
        console.log("item is undefined");
        console.log($state.current);
        if ($state.current.name == "accessories.info") {
            accessoriesSvc.getAccessories().then(onItemsSuccess);
        }
        if ($state.current.name == "textbooks.info") {
            textbooksSvc.getTextbooks().then(onItemsSuccess)
        }
        
    } else {
        console.log("data has been loaded");
        angular.forEach($scope.itemList, function(tempItem) {

          if (tempItem.hasOwnProperty("accessory_id")) {
            if (tempItem.accessory_id == $stateParams.accessory_id) {
            $scope.item = tempItem;
            }
          }
          if (tempItem.hasOwnProperty("textbook_id")) {
            if (tempItem.textbook_id == $stateParams.textbook_id) {
            $scope.item = tempItem;
          }
        }

      });
        if ($scope.item.hasOwnProperty("textbookName")) { 
        console.log("textbook passed in");
        $scope.typeOfObject = "textbook";
        $scope.textbookHideObject = false;
        $scope.accessoryHideObject = true;
        $scope.serviceHideObject = true;
      } else if ($scope.item.hasOwnProperty("accessoryName")) {
        console.log("accessory passed in");
        $scope.typeOfObject = "accessory";
        $scope.textbookHideObject = true;
        $scope.accessoryHideObject = false;
        $scope.serviceHideObject = true;
      } else if ($scope.item.hasOwnProperty("serviceName")) {
        console.log("service passed in");
        $scope.typeOfObject = "service";
        $scope.textbookHideObject = true;
        $scope.accessoryHideObject = true;
        $scope.serviceHideObject = false;
      }

    }


    $scope.close = function () {
            newListingSvc.setNewListing($scope.item);
		    $modalInstance.dismiss('close');
	  };
    $scope.checkPasswordInput = function(currentItem) {


        newListingSvc.checkPassword($scope.passwordInput, currentItem).then(function (data) {
            data.replace(/\s+/g, '');
            data = parseInt(data);
            console.log(data);

            if ( data === 1) {
            currentItem.password = $scope.passwordInput;
            console.log("password correct")
            var modalInstance = $modal.open({
                templateUrl: 'app/newlisting/newListing.html',
                controller: 'newListingCtrl',
                backdrop:'static',
                resolve: {
                    listing: function() {
                        return currentItem;
                    },
                    type: function() {
                        return $scope.typeOfObject;
                    }
                },
                size: 'lg'
            })

            //Code for updating editing and deletion on the front end
            modalInstance.result.then(function() {
                if (newListingSvc.getDeleteId() != 0) {
                    $scope.item = newListingSvc.getNewListing();
                    $scope.close();
                } else {
                    $scope.item = newListingSvc.getNewListing();
                }

                
            });


        }
        else {
          console.log("password incorrect");
          //yeah that's right fuck angular im using jquery to invalid password
          jQuery('.passwordField').addClass('has-error'); 
          $scope.wrongPassword = true;
        }
        })

        
    }

    

    $scope.editPostButton = function(){
        $scope.passwordField = false;
        $scope.editButton = true;
        $scope.passwordSubmitButton = false;
    };

    $scope.reportPost = function() {
        infoSvc.report($scope.item, $scope.reportReason).then(function(response) {
            console.log("Your report has been submitted");
            //Code that will display "Your report has been submitted" on the info card; will probably require some type of ng-hide function
        });
    }

  }]);
}());


