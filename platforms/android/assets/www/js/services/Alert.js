var app = angular.module('freevice');

app.factory('Alerta', function($ionicPopup, $location){
  return{
    show: function(text){
      var alertPopup = $ionicPopup.alert({
           title: 'Desk Solution',
           template: text
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