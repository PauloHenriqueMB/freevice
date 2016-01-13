var App = angular.module('freevice', ['ionic', 'firebase', 'ngCordova']);

App.run(function($ionicPlatform, GoogleMaps) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(false);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    //GoogleMaps.init();
  });
});

App.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
    .state('tab.chat', {
      url: '/chat',
      views:{
        'tab-chat':{
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatCtrl'
        }
      }
    })
    .state('tab.conta', {
      url: '/conta',
      views:{
        'tab-conta':{
          templateUrl: 'templates/tab-conta.html',
          controller: 'UserCtrl'
        }
      }
    })
    .state('tab.tecnicos', {
      url: '/tecnicos',
      views:{
        'tab-tecnicos':{
            templateUrl: 'templates/tab-tecnicos.html',
            controller: 'MapCtrl'
        }
      }
    })
    .state('chat-detail', {
      url: '/chats/:chatId',
      templateUrl: 'templates/chat-detail.html',
      controller: 'ChatDetailCtrl'
    })
  $urlRouterProvider.otherwise('/login');
  $ionicConfigProvider.views.maxCache(0);

   if(ionic.Platform.isAndroid())
      $ionicConfigProvider.scrolling.jsScrolling(true);
});
