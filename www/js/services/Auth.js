var app = angular.module('freevice');

app.factory('Auth', function($firebaseAuth){
  var fireBaseDB = 'https://desk-solution.firebaseio.com/users/';
  var usersRef = new Firebase(fireBaseDB);

  return $firebaseAuth(usersRef)
});