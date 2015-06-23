(function () {
 
'use strict';
var app = angular.module('tclassified');


app.directive("dirStylescripts", function() {
  var linkFunction = function(scope, element, attributes) {
    $('.titleField').textfit('bestfit');
    var headerHeight = $('.profileInfo h4').outerHeight(true);
    var oldTop = $('.profile').height() - headerHeight;
    $('.profileInfo').css('top',oldTop);
    $('.profile').mouseenter(function(){
        var riseHeight = $(this).find('.profileInfo').height() - headerHeight;
        //dont forget replace magic numbers later mac
        var newTop = oldTop - riseHeight;
        $(this).find('.profileInfo').stop(true).animate({
            top:newTop
        },400);
        $(this).find('img').stop(true).animate({
            width:($(this).width()* 1.0)
        },400);
        
    }).mouseleave(function(){
        
        $(this).find('.profileInfo').animate({
            top:oldTop            
        },400);
        $(this).find('img').animate({
            width:($(this).width()* 1.1)
        },400);
        
    });
  };

    return {
      restrict: "E",
      link: linkFunction
    };

  });
}());