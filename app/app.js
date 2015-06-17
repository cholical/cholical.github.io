(function () {
 
  'use strict';
  var app = angular.module('tclassified', ['ui.router', 'ui.bootstrap', 'angularUtils.directives.dirPagination', 'angularUtils.directives.uiBreadcrumbs']);
  
  //=======The code within these comments doesn't actually exist===
  app.directive("styleScripts", function() {
  var linkFunction = function(scope, element, attributes) {
    
    var headerHeight = $('.profileInfo h4').outerHeight(true);
    var oldTop = $('.profile').height() - headerHeight;
    $('.profileInfo').css('top',oldTop);
    $('.profile').mouseenter(function(){
        

        var riseHeight = $(this).find('.profileInfo').height() - headerHeight;
        //dont forget replace magic numbers later mac
        var newTop = oldTop - riseHeight;
        $(this).find('.profileInfo').stop(true).animate({
            top:newTop,
        },400);
        
    }).mouseleave(function(){
        
        $(this).find('.profileInfo').animate({
            top:oldTop,
        },400);
        
    });

    
  };

    return {
      restrict: "E",
      link: linkFunction
    };

  });
  //==================================================================

  app.config(['$stateProvider', '$urlRouterProvider', configRoutes]);
  
  function configRoutes ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'homeCtrl'
      })
      .state('textbooks', {
        url: '/textbooks',
    	  templateUrl: 'app/textbooks/textbooks.html',
    	  controller: 'textbooksCtrl'
      })
      .state('accessories', {
        url: '/accessories',
        templateUrl: 'app/accessories/accessories.html',
        controller: 'accessoriesCtrl'
      })
      .state('services', {
        url: '/services',
        templateUrl: 'app/services/services.html',
        controller: 'servicesCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'app/about/about.html',
        controller: 'aboutCtrl'
      })
    
    $urlRouterProvider.otherwise('/home');
    
  };

  app.run(['$state', function ($state) {
  }]);  

  

}());