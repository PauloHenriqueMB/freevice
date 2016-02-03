var app = angular.module('freevice');

app.factory('Worker', function($firebase, $state, $ionicPopup){
  var ref = new Firebase('https://desk-solution.firebaseio.com/users');
  var workers = [];
  var selectedWorker = {};
  
  return{
    setWorkers: function(data){ workers = data; },
      getWorkers: function(){
        workers = [];
        ref.on('value', function(data){
          var _workers = data.val();

          for(var x in _workers){
            if(x.tecnico)
              workers.push(_workers[x]);
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
