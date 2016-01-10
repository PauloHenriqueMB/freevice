var app = angular.module('freevice');

app.controller('ChatCtrl', function($scope, $firebase, $user, Alerta, Worker, $state, $firebaseObject){
  $scope.nome = $user.get('userData.nome');
	$scope.profilePic = $user.get('userData.foto');
	$scope.userId = $user.get('userData.id');

	var userName = $user.get('userData.nome');
	$scope.username = userName;
	$scope.chats = [];

	var ref = new Firebase('https://desk-solution.firebaseio.com/chats/');
	var sync = ref.child($scope.userId);
	var obj = $firebaseObject(sync);

	obj.$bindTo($scope, 'chatMessages');

	$scope.selectChat = function(user){
		Worker.selectWorker(user);
		$state.go('chat-detail', {
			chatId: user.id
		});
	};
});
