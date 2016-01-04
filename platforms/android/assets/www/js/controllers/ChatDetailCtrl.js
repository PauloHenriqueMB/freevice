angular
	.module('desksolution')

.controller('ChatDetailCtrl', function($scope, $user, $firebase, $tecnico, $firebaseObject, $timeout, $stateParams, $ionicScrollDelegate){
  var ref = new Firebase('https://desk-solution.firebaseio.com/chats');
	var userId = $user.get('userData.id');
	var chatId = $stateParams.chatId;
	var userName = $user.get('userData.nome');
	var userFoto = $user.get('userData.foto');
	var tecnico = $tecnico.getSelectedTecnico();

	$scope.isTecnico = $user.get('userData.userType');
	$scope.username = userName;
	$scope.user_chat_name = tecnico.name;

	console.log('sou um tecnico? ' + $scope.isTecnico);

	var chatInfo = ref.child(userId).child($stateParams.chatId).child('chatInfo');
	var chatInfo2 = ref.child($stateParams.chatId).child(userId).child('chatInfo');

	/* Dois syncs para enviar a mensagem ao array do usuario que recebe e ao usuario que envia a mensagem.*/
	var sync = ref.child($stateParams.chatId).child(userId);
	var sync2 = ref.child(userId).child($stateParams.chatId);

	/* A cada mensagem recebida, a pagina é rolada ao fim. */
	sync.on('child_added', function(data){
		$timeout(function() {
				$ionicScrollDelegate.scrollBottom();
		});
	});

	/* recebe mensagens em tempo real. */
	var syncObject = $firebaseObject(sync);
	syncObject.$bindTo($scope, 'chats');

	var ref = new Firebase('https://desk-solution.firebaseio.com/users/' + 'facebook:' + chatId);

	$scope.sendLike = function(){
			var user_to = ref.child('likes');
			user_to.transaction(function(likes){
				return likes+1;
			});
			console.log('like enviado');
	};

	$scope.sendDeslike = function(){
		var user_to = ref.child('deslikes');
		user_to.transaction(function(deslikes){
			return deslikes+1;
		});
		console.log('deslike enviado');
	};

	$scope.sendMessage = function(msg){
		if(msg){
			sync.push({
				from: userName,
				to: chatId,
				message: msg,
				foto: userFoto
			});

			sync2.push({
				from: userName,
				to: chatId,
				message: msg,
				foto: userFoto
			});

			chatInfo.update({
				id: tecnico.id,
				name: tecnico.name,
				foto: tecnico.foto,
				lmessage: msg
			});

			chatInfo2.update({
				id: userId,
				name: userName,
				foto: userFoto,
				lmessage: msg
			});

			delete $scope.textMessage;
		}

		$timeout(function() {
		    $ionicScrollDelegate.scrollBottom();
		});
	}
});
