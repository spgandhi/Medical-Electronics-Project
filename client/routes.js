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

    .state('profile', {
      url: '/profile',
      templateUrl: 'client/views/profile.html',
      data: {
        requireLogin: true,
        onlySuperAdmin: false
      },
      controller: 'Profile'
    })

    .state('findPatient', {
      url: '/findPatient',
      templateUrl: 'client/views/findPatient.html',
      data: {
        requireLogin: true,
        onlySuperAdmin: false
      },
      controller: 'FindPatient'
    })

  $urlRouterProvider.otherwise("/home");
});