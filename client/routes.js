angular.module('ME').config(function($urlRouterProvider, $stateProvider, $locationProvider){

  $stateProvider
    
    .state('home', {
      url: '/home',
      templateUrl: 'client/views/home.html',
      data: {
        pageTitle: 'Dashboard',
        requireLogin: false,
        onlySuperAdmin: false
      },
      controller: 'Home'  
      
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
      templateUrl: 'client/views/profile/basic.html',
      data: {
        requireLogin: true,
        onlySuperAdmin: false
      },
      controller: 'Profile'
    })

    .state('profile-contact', {
      url: '/profile/contact',
      templateUrl: 'client/views/profile/contact.html',
      data: {
        requireLogin: true,
        onlySuperAdmin: false
      },
      controller: 'Profile'
    })

    .state('reports', {
      url: '/profile/reports',
      templateUrl: 'client/views/profile/reports.html',
      data: {
        requireLogin: true,
        onlySuperAdmin: false
      },
      controller: 'Profile'
    })

    .state('new-report', {
      url: '/profile/new-report',
      templateUrl: 'client/views/profile/new-report.html',
      data: {
        requireLogin: true,
        onlySuperAdmin: false
      },
      controller: 'Profile'
    })

    .state('logs', {
      url: '/profile/logs',
      templateUrl: 'client/views/profile/logs.html',
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

    .state('login', {
      url: '/login',
      templateUrl: 'client/views/login.html',
      data: {
        requireLogin: false,
        onlySuperAdmin: false
      },
      controller: 'Login'
    })

  $urlRouterProvider.otherwise("/home");
});