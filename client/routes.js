angular.module('ME').config(function($urlRouterProvider, $stateProvider, $locationProvider){

  $stateProvider
    
    .state('home', {
      url: '/home',
      templateUrl: 'client/views/home.html',
      data: {
        pageTitle: 'Dashboard',
        requireLogin: true,
        onlySuperAdmin: false
      },
      controller: 'Main'  
      
    })

    .state('register', {
      url: '/register',
      templateUrl: 'client/views/register.html',
      data: {
        requireLogin: false,
        onlySuperAdmin: false
      },
      controller: 'Register'
    })

  $urlRouterProvider.otherwise("/home");
});