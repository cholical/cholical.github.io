(function () {

  'use strict';
  var app = angular.module('tclassified', ['ui.router', 'ui.bootstrap', 'angularUtils.directives.dirPagination', 'ui.bootstrap.modal']);

  //=======The code within these comments doesn't actually exist===

    //No it sure doesn't Mac. Where did it go? My beloved app.js is clutterfree.

    //penis

  //==================================================================

  app.provider('modalState', function($stateProvider) {
    var provider = this;
    this.$get = function() {
        return provider;
    }
    this.state = function(stateName, options) {
        var modalInstance;
        $stateProvider.state(stateName, {
            url: options.url,
            onEnter: function($modal, $state) {
                modalInstance = $modal.open(options);
                modalInstance.result.then(
                  function () {

                  },
                  function() {
                    $state.go('^');

                  })
                ['finally'](function() {
                    modalInstance = null;
                    // if ($state.$current.name === stateName) {
                    //     $state.go('^');
                    // }
                });
            },
            onExit: function() {
                if (modalInstance) {
                    modalInstance.close();
                }
            }
        });
    };
  })

  app.config(['$stateProvider', 'modalStateProvider', '$urlRouterProvider', configRoutes]);

  function configRoutes ($stateProvider, modalStateProvider, $urlRouterProvider) {
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
      .state('contact', {
        url: '/contact',
        templateUrl: 'app/contact/contact.html',
        controller: 'contactCtrl'
      })
      .state('superimportant', {
        url: '/superImportantPage',
        templateUrl: 'superImportantPage.html'
      })
      .state('prototype1', {
        url: '/prototype1',
        templateUrl: 'app/prototypes/prototype1.html',
        controller: 'prototype1Ctrl'
      })

      modalStateProvider.state('accessories.info', {
        url: '/listing/:accessory_id',
        templateUrl: 'app/info/info.html',
        controller: 'infoCtrl',
        size: 'lg'
      });

      modalStateProvider.state('textbooks.info', {
        url: '/listing/:textbook_id',
        templateUrl: 'app/info/info.html',
        controller: 'infoCtrl',
        size: 'lg'
      });

      modalStateProvider.state('services.info', {
        url: '/listing/:service_id',
        templateUrl: 'app/info/info.html',
        controller: 'infoCtrl',
        size: 'lg'
      });

    $urlRouterProvider.otherwise('/home');

  };





  app.run(['$state', function ($state) {
  }]);

}());
