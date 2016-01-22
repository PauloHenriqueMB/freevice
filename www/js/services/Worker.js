var app = angular.module('freevice');

app.factory('Worker', function($firebase, $state, $ionicPopup){
  var ref = new Firebase('https://desk-solution.firebaseio.com/users');
  var workers = [];
  var selectedWorker = {};
  
  return{
    setTecnicos: function(data){ workers = data; },
      getTecnicos: function(){
        workers = [];
        ref.on('value', function(data){
          var _tecnicos = data.val();

          for(var x in _tecnicos){
            if(x.tecnico)
              workers.push(_tecnicos[x]);
          }

          console.log(workers);
        }, function(error){
          console.log('Failed to read data: ' + error);
        });
        return workers;
      },
      selectWorker: function(worker){ selectedWorker = worker; },
      getDataById: function(id){
        var facebookID = 'facebook:' + id;

        ref.child(facebookID).once('value', function(userData){
           var data = userData.val();
           console.log('returning: ' + data.name);
           return data.name;
        });
      },
      getSelectedWorker: function(){ return selectedWorker; }
  }
});
