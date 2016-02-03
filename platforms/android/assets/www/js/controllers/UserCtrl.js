var app = angular.module('freevice');

app.controller('UserCtrl', function($scope, $window, $user, Auth, Alerta, $timeout, $ionicLoading, $ionicHistory){
    var ref = new Firebase('https://desk-solution.firebaseio.com/users/');

	$scope.user = {
		 nome: $user.get('userData.nome'),
		 telefone: $user.get('userData.telefone'),
		// location: $user.get('userData.location'),
		 foto: $user.get('userData.foto'),
		 tecnico: $user.get('userData.userType')
	};

	$scope.logout = function()
	{
		$timeout(function () {
	        $ionicLoading.hide();
	        $ionicHistory.clearCache();
	        $ionicHistory.clearHistory();
	        $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
	        ref.unauth();
			Alerta.showAlertRedirect('Logout feito com sucesso', '/login');
    }, 30);
	}
});
