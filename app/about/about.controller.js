(function () {

  'use strict';
  var app;

  app = angular.module("tclassified");
  app.controller('aboutCtrl', ['$scope', '$stateParams', '$log', function aboutCtrl($scope, $stateParams, $log){

    $scope.changeBarActive = function() {
        document.getElementById("aboutBar").className = "active";
    }
    
  }]);

  
$('.profile').on('mouseenter',function(){
    $scope.$apply(function(){
        var riseHeight = $(this).find('.profileInfo').css('height') - 42;
        //dont forget replace magic numbers later mac
        var newTop = 
        $(this).find('.profileInfo').animate({
            top:'284px',
        },400);
    });
    

}).on('mouseleave',function(){
    $scope.$apply(function(){
        $(this).find('.profileInfo').animate({
            top:'360px',
        },400);
    });
});


  
}());