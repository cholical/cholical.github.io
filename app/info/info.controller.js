(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('infoCtrl', ['$scope', '$modalInstance', '$modal', '$stateParams', '$state', 'accessoriesSvc', 'textbooksSvc', 'servicesSvc', 'newListingSvc', 'infoSvc', '$location', '$log', function infoCtrl($scope, $modalInstance, $modal, $stateParams, $state, accessoriesSvc, textbooksSvc, servicesSvc, newListingSvc, infoSvc, $location, $log){

    //:( Mac!!!

    //var accessoryNumber = parseInt(document.location.hash.slice(22));
    //console.log(accessoryNumber);
    $scope.itemList =  newListingSvc.getInfo();
    $scope.passwordInput;
    $scope.wrongPassword = false;
    $scope.blankPassword = false;
    $scope.passwordField = true;
    $scope.verifyComment = false;
    $scope.editButton = false;
    $scope.passwordSubmitButton = true;
    $('.normalBtn').tooltip();
    $scope.reportReason;
    $scope.urlValue;
    $scope.noComments = false;
    $scope.liarMessage = true;
    $scope.imageDir = 'img/useruploads/files/';



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

    $scope.$watch( function () { return $stateParams.service_id}, function(newValue, oldValue) {
        if (newValue != oldValue) {
            console.log("StateParam below");
            console.log($stateParams.service_id);
            console.log("StateParam changed; watch function entered");
            console.log($scope.itemList);
            angular.forEach($scope.itemList, function(service) {
                if (service.service_id == $stateParams.service_id) {
                    $scope.item = service;
                    console.log($scope.item);
                }
            })

        }

    });

    var itemSetup = function(data){
        angular.forEach(data, function(tempItem) {

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
            if (tempItem.hasOwnProperty("service_id")) {
              if (tempItem.service_id == $stateParams.service_id) {
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

        $scope.item.images = eval($scope.item.images);
        if (typeof $scope.item.images === 'undefined'){
            $scope.item.images = false; //no image array exists
        } else if ($scope.item.images.length == 0) {
            $scope.item.images = false; //no images in array
        }
        $scope.item.comments =  eval($scope.item.comments);
        if (! $scope.item.comments){
            $scope.noComments = true;
        }

        console.log($scope.item.comments);

        //eval comments

    };

    var onItemsSuccess = function(data) {
      $scope.itemList = data;
      console.log("data has been loaded");
      itemSetup($scope.itemList);
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
        if ($state.current.name == "service.info") {
            servicesSvc.getServices().then(onItemsSuccess)
        }

    } else {
        console.log("data has been loaded");
        itemSetup($scope.itemList);
    }

    
    $scope.close = function () {
	   $modalInstance.dismiss('close');
	};

    $scope.yoCheckDisOut = function(){
        $scope.UrlToCopy = window.location.href;
        console.log($scope.UrlToCopy);
        $scope.urlValue = $scope.UrlToCopy;
        jQuery('.urlField').select();
    };

    $scope.checkPasswordInput = function(currentItem) {

        if ($scope.passwordInput !== undefined && $scope.passwordInput !== null){
            console.log($scope.passwordInput)
            newListingSvc.checkPassword($scope.passwordInput, currentItem).then(function (data) {
                data.replace(/\s+/g, '');
                data = parseInt(data);
                console.log("Return from getPassword below");
                console.log(data);

                if ( data === 1) {
                    console.log("password correct");

                    if ($scope.verifyComment) {
                      //run submit comment
                      $scope.submitComment();
                    } else {
                      console.log('password for edit post');
                      currentItem.password = $scope.passwordInput;
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
                } else {
                      console.log("password incorrect");
                      //yeah that's right fuck angular im using jquery to invalid password
                      jQuery('.passwordField').addClass('has-error');
                      $scope.wrongPassword = true;
                  }
            })
        }  else {
              console.log("password incorrect");
              //yeah that's right fuck angular im using jquery to invalid password
              jQuery('.passwordField').addClass('has-error');
              $scope.wrongPassword = true;
          }
    }



    $scope.editPostButton = function(){
        $scope.passwordField = false;
        $scope.editButton = true;
        $scope.passwordSubmitButton = false;
    };

    $scope.verifyDistinction = function() {
      $scope.verifyComment = true;
      //use this to check if verify button was pressed so that before submitting you can check for password correct
    }

    $scope.cancelVerify = function () {
        $scope.verifyComment = false;
    }
    $scope.submitCommentButton = function () {
      if ($scope.newComment.name == "-Listing Author-") {
        $scope.liarMessage = false;
        document.getElementById("liarBox").className = "form-group has-error";
      } else {
        if ($scope.verifyComment){
            $scope.checkPasswordInput($scope.item);
        } else {
            $scope.submitComment();   
        }
      }
    };

    $scope.submittedComment = false;
    $scope.submitComment = function () {
        if (! $scope.item.comments){
            $scope.item.comments = [];
        };
        if ($scope.item.comments.length==0){
            $scope.item.comments = [];
        };

        if ($scope.verifyComment){
            var newComment = {
                'name':'-Listing Author-',
                'content':$scope.newComment.content,
                'date': angular.copy(new Date())
            };
        } else {
            var newComment = {
                'name':$scope.newComment.name,
                'content':$scope.newComment.content,
                'date': angular.copy(new Date())
            };
        }

        $scope.item.comments.push(newComment);

        console.log('Comment submitted with verify as',$scope.verifyComment,$scope.item);
        
      //make ajax call to sevice 
        newListingSvc.addCommentToPost($scope.item).then(function(data) {
          console.log('return from php:',data);
          console.log('Comment submitted. Comments array:',$scope.comments);
          $scope.submittedComment = true;
          $scope.noComments = false;
          //$scope.phpDebug = data;
        });
    };

    $scope.enterReason = false;
    $scope.reportSubmitted = false;
    $scope.reportPost = function() {
        console.log($scope.reportReason);
        if ($scope.reportReason !== undefined && $scope.reportReaspn !== null){
            if ($scope.reportReason != ""){
               infoSvc.report($scope.item, $scope.reportReason).then(function(response) {
                    console.log("Your report has been submitted");
                    //Code that will display "Your report has been submitted" on the info card; will probably require some type of ng-hide function
                    $scope.reportSubmitted = true;
                });
            }
        } else {
          jQuery('.reportField').addClass('has-error');
          console.log('please enter a reason');
          $scope.enterReason = true;
        }
    }

  }]);
}());
