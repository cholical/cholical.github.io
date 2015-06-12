(function () {
 
  'use strict';
  var app = angular.module('tclassified', ['ui.router', 'ui.bootstrap', 'angularUtils.directives.dirPagination', 'angularUtils.directives.uiBreadcrumbs']);
  
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
    
    $urlRouterProvider.otherwise('/home');
    
  };

  app.run(['$state', function ($state) {
  }]);  
  
}());