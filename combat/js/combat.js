var combat = angular.module('combat', []).config(function($routeProvider) {
  $routeProvider.
  when('/', {controller:ListCtrl, templateUrl:'intro.html'}).
  when('/creation', {controller:CreateCtrl, templateUrl:'creation.html'}).
  otherwise({redirectTo:'/'});
});


function ListCtrl($scope, Character) {
  $scope.character = Character;
}


function CreateCtrl($scope, $location, Character) {
  $scope.character = Character;
}

combat.factory('Character', function(){
	return{
		name:'',
		hitpoints:20,
		strength:20,
		agility:20,
		accuracy:20,
	}
})

