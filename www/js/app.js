var App = angular.module('freevice', ['ionic','ionic.service.core', 'firebase', 'ngCordova', 'angularMoment']);

App.run(function($ionicPlatform) {
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

    var io = Ionic.io();
    var push = new Ionic.Push({
      "onNotification": function(notification){
        alert('Received Notification!');
      },
      "pluginConfig":{
        "android": {
          "iconColor": "#00ccff"
        }
      }
    });

    var user = Ionic.User.current();
    if(!user.id){
      user.id = Ionic.User.anonymousId();
    }

    user.set('name', 'Amilson');
    user.set('bio', 'This is my little bio');
    user.save();

    var callback = function(){
      push.addTokenToUser(user);
      user.save();
    };

    push.register(callback);
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
  $ionicConfigProvider.tabs.position("top");

   if(ionic.Platform.isAndroid())
      $ionicConfigProvider.scrolling.jsScrolling(true);
});
