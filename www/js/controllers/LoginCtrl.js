angular
	.module('freevice')

.controller('LoginCtrl', function($scope, Auth, $location, $firebase, $user, Alerta, Worker){
  var refClients = new Firebase('https://desk-solution.firebaseio.com/users/clients');
  var refWorkers = new Firebase('https://desk-solution.firebaseio.com/users/workers');
  var currlocation = new Object();

  Auth.$onAuth(function(authData){
    if(authData != null){
      $user.set('userData.nome', authData.google.displayName);
      $user.set('userData.foto', authData.google.profileImageURL);
      $user.set('userData.id', $user.getId(authData.uid));
      $user.set('userData.location', currlocation);

      $location.path('tab/chat');
    }
  });

  var setLocation = function(ref, uid){
    var opt = {/*timeout: 30000,*/ enableHighAccuracy: false/*, maximumAge: 10000*/};
    navigator.geolocation.getCurrentPosition(function(pos){
      //alert(pos.coords.latitude + ', ' + pos.coords.longitude);
      currlocation.lat = pos.coords.latitude;
      currlocation.lng = pos.coords.longitude;

      ref.child(uid).update({ location: currlocation });

    }, function(error){
      alert('Ops, houve um erro!. ' + error.message + '\nVoce deve ativar o seu GPS. Caso o erro persista contacte nossa equipe de desenvolvimento.');
    }, opt);
    
  }

  $scope.login = function(tec)
  {
      $user.set('userData.userType', tec);

      Auth.$authWithOAuthPopup("google").then(function(authData){
        //Worker
        if(tec == true){ 
          refClients.child(authData.uid).remove();
          refWorkers.child(authData.uid).update({
            worker: $user.get('userData.userType'), //Tecnico ou não?
            id: $user.getId(authData.uid), // ID do google, somente a ID.
            foto: authData.google.profileImageURL, //Imagem do perfil do google
            provider: authData.provider, //Provider é o google.
            name: authData.google.displayName //Nome do perfil do google
          });
          setLocation(refWorkers, authData.uid);
        }
        //Client
        else{
          refWorkers.child(authData.uid).remove();
          refClients.child(authData.uid).update({
            id: $user.getId(authData.uid), // ID do google, somente a ID.
            foto: authData.google.profileImageURL, //Imagem do perfil do google
            provider: authData.provider, //Provider é o google.
            name: authData.google.displayName, //Nome do perfil do google
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
