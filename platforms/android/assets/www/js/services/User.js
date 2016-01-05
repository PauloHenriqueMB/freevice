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
      checkIfUserExist: checkIfUserExist,
      setUserData: function(authData){
        user_data = authData;
        console.log('User Data in userService: ');
        console.log(user_data);
      },
      getId: function(uid){
        //Google:ID
        var id = uid.split('google:');
        return id[1];
      },
      set: function(key, value){
        $window.localStorage[key] = value;
      },
      get: function(key){
        return $window.localStorage[key];
      },
      getUserData: function(){
        return user_data;
      }
    }
});