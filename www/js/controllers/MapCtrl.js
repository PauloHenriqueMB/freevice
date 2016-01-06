angular.module('freevice')
.controller('MapCtrl', function($scope, GoogleMaps, $state, $user, Worker, $firebase, Marker, $cordovaGeolocation, $ionicLoading, $CurrentPosition){
  GoogleMaps.init();
  ionic.Platform.ready(function () {
    
  });
  
  /*
  var map;
  var ref = new Firebase('https://desk-solution.firebaseio.com/users/workers/');
  var userId = $user.get('userData.id');

  function initialize() {
      console.log("initializing map");

      var posOptions = {timeout: 15000, enableHighAccuracy: true};
      var markers = new Array();
      var counter = 0;
      
      window.navigator.geolocation.getCurrentPosition(function (pos) {
          $ionicLoading.show({
              template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Estamos pegando sua localiza��o, isso n�o deve demorar muito.'
          });

          var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

          map = new google.maps.Map(document.getElementById('map'), {
              center: latlng,
              zoom: 8
          });

          //Espera o mapa ser carregado
          google.maps.event.addListenerOnce(map, 'idle', function () {
              //Carregar marcadores aqui...
              //Codigo teste apenas para testar marcadores
              var marker = new Object();

              ref.on('child_added', function (data) {
                  var obj = data.val();
                  console.log(obj);
                  marker = Marker.createMarker(obj, map);
              });
          });

          $ionicLoading.hide();
      }, function (err) {
          alert('Ops, houve um erro! ' + err.message + '\nContacte nossa equipe de desenvolvimento.');
      }, posOptions);
      
      
      
     // navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 30000, enableHighAccuracy: true, maximumAge: 75000});
  }
*/
  
});
