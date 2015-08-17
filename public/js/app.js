'use strict';

angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngSanitize', 'ui.grid', 'ngDragDrop', 'highcharts-ng',
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
  config(function ($routeProvider, $locationProvider) {
    $routeProvider.
      when('/main', {
        templateUrl: 'public/views/main.html',
        controller: 'MainCtrl'
      }).
      otherwise({
        redirectTo: '/main'
      });

    //$locationProvider.html5Mode(true);
  });
