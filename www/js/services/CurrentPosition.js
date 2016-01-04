var app = angular.module('freevice');

app.factory('$CurrentPosition', function($cordovaGeolocation, Alerta, $user){
  var location = new Object();
  
  function setPosition(){
    navigator.geolocation.getCurrentPosition(function (pos) {
        location.lat = pos.coords.latitude;
        location.lng = pos.coords.longitude;
        $user.set('userData.location', location);
    }, function (error) {
        Alerta.show('deu erro tio' + error.message);
    }, { enableHighAccuracy: true });
  }

  function getPosition(){
    return $user.get('userData.location');
  }
  return {
    setPosition: function(){ setPosition(); },
    getPosition: function(){ getPosition(); }
  }
});
