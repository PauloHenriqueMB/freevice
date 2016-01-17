var app = angular.module('freevice');

app.factory('$user', function($window, $firebase){
    var user_data = {};

    var USERS_REF = 'https://desk-solution.firebaseio.com/users';

    var checkIfUserExist = function(uid){
      var userRef = new Firebase(USERS_REF);
      var user;

      userRef.child(uid).once('value', function(data){
        user = data.val();
      });

      return (user !== null);
    }

    return{
      getId: function(uid, provider){ //Returns user ID only. Without provider name.
        if(provider == 'facebook'){
            var id = uid.split('facebook:');
            return id[1];
        }else if(provider == 'google'){
            var id = uid.split('google:');
            return id[1];
        }
      },
      set: function(key, value){
        $window.localStorage[key] = value;
      },
      get: function(key){
        return $window.localStorage[key];
      }
    }
});