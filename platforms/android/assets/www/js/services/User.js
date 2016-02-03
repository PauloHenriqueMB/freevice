var app = angular.module('freevice');

app.factory('$user', function($window, $firebase){
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
