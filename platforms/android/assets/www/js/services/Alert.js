var app = angular.module('freevice');

app.factory('Alerta', function($ionicPopup, $location){
  return{
    show: function(text){
      var alertPopup = $ionicPopup.alert({
           title: 'Desk Solution',
           template: text
      });
    },
    showAlertLocation: function(){
        var alertPopup = $ionicPopup.alert({
           title: 'Você precisa informar sua localização!',
           template: 'Precisamos de sua localização para filtrar os técnicos de sua cidade.'
        });
        alertPopup.then(function(res){
          $location.path('tab/conta');
        });
    },
    showAlertTelefone: function(){
        var alertPopup = $ionicPopup.alert({
           title: 'Você precisa informar seu telefone!',
           template: 'Precisamos do numero do seu celular.'
        });
        alertPopup.then(function(res){
          $location.path('tab/conta');
        });
    },
    showAlertAll: function(){
        var alertPopup = $ionicPopup.alert({
           title: 'Você precisa informar seu telefone e sua localização!',
           template: 'Precisamos do numero do seu celular e da sua localização.'
        });
        alertPopup.then(function(res){
          $location.path('tab/conta');
        });
    },
    showAlert: function(text){
      var alertPopup = $ionicPopup.alert({
           title: 'Alerta!',
           template: text
      });
      alertPopup.then(function(res){
          $location.path('tab/chat');
      });
    },
    showAlertRedirect: function(text, path){
      var alertPopup = $ionicPopup.alert({
           title: 'Desk Solution',
           template: text
      });
      alertPopup.then(function(res){
          $location.path(path);
      });
    }
  }
});