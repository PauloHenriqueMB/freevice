var app = angular.module('freevice');

app.factory('Worker', function($firebase, $state, $ionicPopup){
  var ref = new Firebase('https://desk-solution.firebaseio.com/users');
  var tecnicos = [];
  var selectedTecnico = {};
  
  return{
    showInfo: function(map, marker, tecnico){
        var contentString = 
        '<div class="infoWindowContent">'+
            '<img class="photoInfoWindow" src="' + tecnico.foto + '"/>' +
            '<p>Nome: ' + tecnico.name + '</p>' +
        '</div>';  
        
        var infoWindow = new google.maps.InfoWindow({ 
            content: contentString 
        });
        
        infoWindow.open(map, marker);    
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
      Tecnicos: tecnicos
  }
});