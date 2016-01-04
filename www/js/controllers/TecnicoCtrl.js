angular
	.module('desksolution')
	.controller('TecnicoCtrl', function($scope, $tecnico, $user, Alerta, $firebase){
    $scope.location = $user.get('userData.location');
  	$scope.tecnicos = [];
  	$scope.tecnicos = $tecnico.getTecnicos();

  	$scope.atualizar = function(){
  			$scope.tecnicos = $tecnico.getTecnicos();
  	};

  	
  	$scope.selectTecnico = function(tecnico){
  		$tecnico.setSelectedTecnico(tecnico);
  		console.log('Tecnico selecionado: ' + $scope.selectedTecnico.nome);
  	};

  	$scope.selectedTecnico = $tecnico.getSelectedTecnico();
  });
