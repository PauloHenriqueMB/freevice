var app = angular.module('freevice');

app.factory('Worker', function($firebase, $state, $ionicPopup){
  var ref = new Firebase('https://desk-solution.firebaseio.com/users');
  var tecnicos = [];
  var selectedTecnico = {};

  return{
    showInfoPopup: function(tecnico){
      var windowPopup = $ionicPopup.show({
        title: tecnico.name,
        subTitle: 'Av. Rondon Pacheco, 277, Uberlândia, Minas Gerais',
        buttons:[
          {text: 'Voltar', type: 'button-assertive'},
          {
            text: 'Chat',
            type: 'button-positive',
            onTap: function(e){
              console.log('Tapped.');
            }
          }
        ]
      });
    },
    setTecnicos: function(data){ tecnicos = data; },
      getTecnicos: function(){
        tecnicos = [];
        ref.on('value', function(data){
          var _tecnicos = data.val();

          for(var x in _tecnicos){
            if(x.tecnico)
              tecnicos.push(_tecnicos[x]);
          }

          console.log(tecnicos);
        }, function(error){
          console.log('Failed to read data: ' + error);
        });
        return tecnicos;
      },
      setSelectedTecnico: function(tecnico){ selectedTecnico = tecnico; },
      getDataById: function(id){
        var facebookID = 'facebook:' + id;

        ref.child(facebookID).once('value', function(userData){
           var data = userData.val();
           console.log('returning: ' + data.name);
           return data.name;
        });
      },
      getSelectedTecnico: function(){ return selectedTecnico; },
      getLocation: function(){
        var options = {timeout: 10000, enableHighAccuracy: true};
        var location = {lat: 0.0000, lng: 0.00000};
        /*$cordovaGeolocation.getCurrentPosition(options).then(function(pos){
            var position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            var obj = {lat: position.lat(), lng: position.lng()};
            console.log(obj);
            location.lat = obj.lat;
            location.lng = obj.lng;
        });
        return location;*/
      },
      Tecnicos: tecnicos
  }
});