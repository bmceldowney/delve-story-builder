var storyBuilder = angular.module('storyBuilder',['ngResource']).config(function($routeProvider) {
	$routeProvider.
	when('/', {controller:MainCtrl, templateUrl:'main.html'}).
	when('/create', {controller:CreateCtrl, templateUrl:'detail.html'}).
	when('/edit/:id', {controller:EditCtrl, templateUrl:'detail.html'}).
	otherwise({redirectTo:'/'});
}).config(['$httpProvider', function($httpProvider) {
	delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);

storyBuilder.factory('Encounter',function($resource){
	var Encounter = $resource('https://api.mongohq.com/databases/DelveStories' +
		'/collections/encounters/documents/:id',
		{
			id: "@id", 
			_apikey: 'c445u9nsg28aiohvbnrx' 
		},
		{
			create: { method: 'POST' },
			update: { method: 'PUT' }
		});

		Encounter.prototype.create = function(cb){
			return Encounter.create(
				{},
            	{ document: this }, 
            	cb
            );

		}

		Encounter.prototype.update = function(cb){
			var obj = angular.extend({}, this, {_id:undefined});
			return Encounter.update(
				{ id: this._id.$oid },
				{ document: obj },
				cb
			);
		}

		Encounter.prototype.addEntry = function(){
			var entryId = Math.max.apply(Math, this.entries.map(function(entry){return entry.id})) + 1;

			this.entries.push({
				id: entryId,
				text: '',
				options: [],
				group: undefined
			})		
		}

		Encounter.prototype.removeEntry = function(entry){
			var entryIndex = this.entries.indexOf(entry);
			this.entries.splice(entryIndex, 1);
		}

		Encounter.prototype.removeEntryOption = function(entry, option){
			var optionIndex = entry.options.indexOf(option);
			entry.options.splice(optionIndex, 1);
		}

	return Encounter;
});

function EditCtrl($scope, $routeParams, $location, Encounter){
	var params = $routeParams;
	$scope.encounter = Encounter.get({id:$routeParams.id});

	$scope.addOption = function(entry){
		if (!entry.options) {
			entry.options = [];
		};
		entry.options.push({
			prereq: '',
			text: ''
		});
	};
	$scope.update = function(){
		$scope.encounter.update(function(){
			$location.path('/');
		});
	}
	$scope.save = function(){
		$scope.encounter.update(function(){
			$location.path('/');
		});
	}
}

function MainCtrl($scope, Encounter){
	$scope.encounters = Encounter.query();
}

function CreateCtrl($scope, Encounter, $location){
	$scope.encounter = new Encounter({entries:[]});
 
	$scope.addOption = function(entry){
		if (!entry.options) {
			entry.options = [];
		};
		entry.options.push({
			prereq: '',
			text: ''
		});
	};
	$scope.save = function(){
		$scope.encounter.create(function(){
			$location.path('/');
		});
	}
}