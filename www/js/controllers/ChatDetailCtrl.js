var app = angular.module('freevice');

app.controller('ChatDetailCtrl', function($scope, $user, $firebase, Worker, $firebaseObject, $timeout, $stateParams, $ionicScrollDelegate){
    var ref      = new Firebase('https://desk-solution.firebaseio.com/chats');
	var userId   = $user.get('userData.id');
	var chatId   = $stateParams.chatId;
	var userName = $user.get('userData.nome');
	var userFoto = $user.get('userData.foto');
	
	$scope.isTecnico = $user.get('userData.userType');
	$scope.username  = userName;
	
	var worker = Worker.getSelectedWorker();
	$scope.user_chat_name = worker.name;

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

	$scope.sendMessage = function(msg){
        var now = new Date();
        var todayUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
        var date = todayUTC.toISOString().slice(0, 10).replace(/-/g, '-');
        
		if(msg){
			sync.push({
				from: userName,
				to: chatId,
				message: msg,
				date: date
			});
		
			sync2.push({
				from: userName,
				to: chatId,
				message: msg,
				date: date
			});
		
			chatInfo.update({
				id: worker.id,
				name: worker.name,
				foto: worker.foto,
				lmessage: msg,
				date: date
			});
		
			chatInfo2.update({
				id: userId,
				name: userName,
				foto: userFoto,
				lmessage: msg,
				date: date
			});
		
			delete $scope.textMessage;
		}
		
		$timeout(function() {
		    $ionicScrollDelegate.scrollBottom();
		});
	}
});
