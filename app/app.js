(function () {
 
  'use strict';
  var app = angular.module('tclassified', ['ui.router', 'ui.bootstrap', 'angularUtils.directives.dirPagination', 'angularUtils.directives.uiBreadcrumbs']);
  
  //=======The code within these comments doesn't actually exist===

    //No it sure doesn't Mac. Where did it go? My beloved app.js is clutterfree.

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
      .state('superimportant', {
        url: '/superImportantPage',
        templateUrl: 'superImportantPage.html'
      })
    
    $urlRouterProvider.otherwise('/home');
    
  };

  app.run(['$state', function ($state) {
  }]);  

  

}());