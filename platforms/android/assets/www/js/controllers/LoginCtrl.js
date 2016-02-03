var app = angular.module('freevice');

app.controller('LoginCtrl', function($scope, GeoCoder, Auth, $location, $firebase, $user, Alerta, Worker){
  var refClients = new Firebase('https://desk-solution.firebaseio.com/users/clients');
  var refWorkers = new Firebase('https://desk-solution.firebaseio.com/users/workers');
  var currlocation = new Object();
  var cityName;
  
  Auth.$onAuth(function(authData){
    if(authData != null){
      $user.set('userData.nome', authData.google.displayName);
      $user.set('userData.foto', authData.google.profileImageURL);
      $user.set('userData.id', $user.getId(authData.uid, authData.provider));

      $location.path('tab/tecnicos');
    }
  });

  var setLocation = function(ref, uid){
    var opt = {/*timeout: 30000,*/ enableHighAccuracy: false/*, maximumAge: 10000*/};
    navigator.geolocation.getCurrentPosition(function(pos){
      currlocation.lat = pos.coords.latitude;
      currlocation.lng = pos.coords.longitude;
      
      GeoCoder.setGeoCoderCoords(currlocation.lat, currlocation.lng);
     // console.log(GeoCoder.getCityName());
      
      ref.child(uid).update({ city: GeoCoder.getCityName() });
      ref.child(uid).update({ location: currlocation });

    }, function(error){
      alert('Ops, houve um erro ao pegar sua localização!. ' + error.message + '\nVoce deve ativar o seu GPS. Caso o erro persista contacte nossa equipe de desenvolvimento.');
    }, opt);
    
  }

  $scope.login = function(worker)
  {
      $user.set('userData.userType', worker);

      Auth.$authWithOAuthPopup("google").then(function(authData){
        //Worker
        if(worker == true){ 
          refClients.child(authData.uid).remove();
          refWorkers.child(authData.uid).update({
            id: $user.getId(authData.uid, authData.provider), 
            photo: authData.google.profileImageURL, 
            name: authData.google.displayName 
          });
          setLocation(refWorkers, authData.uid);
        }
        //Client
        else{
          refWorkers.child(authData.uid).remove();
          refClients.child(authData.uid).update({
            id: $user.getId(authData.uid, authData.provider),
            photo: authData.google.profileImageURL, 
            name: authData.google.displayName,
            location: currlocation
          });
          setLocation(refClients, authData.uid);
        }
        //Salva no localStorage a localização do usuario.
        $user.set('userData.location', currlocation);
      }).catch(function(error){ //se der erro na autenticação...
        alert(error);
        Alerta.showAlertRedirect(error, '/login');
      });
  };  
});
