angular.module('encounterRunner', ['EncounterEngine', 'GameState']);

angular.module('encounterRunner').directive('encounterrunner', function () {
    return {
        restrict: 'E',
        templateUrl: 'controls/encounterRunner/encounterRunner.html',
        replace: true,
        controller: function ($scope, $rootScope, $attrs, encounterService, gameState) {
            $scope.state = '';
            $scope.$watch(encounterService.currentEntry, showEncounter)
            var loaded = false;

            $scope.visButtonClicked = function (e) {
                if (!$scope.state) {
                    $scope.state = 'expanded';
                    if (!loaded) {
                        load();
                        loaded = true;
                    }
                } else {
                    $scope.state = '';
                }
            }

            $scope.reset = function () {
                resetEncounter();
            }

            $scope.navigate = function (option) {
                encounterService.navigate(option);
                showEncounter();
            }

            function load() {
                encounterService.loadEncounter($scope.encounter);
                showEncounter();
            }

            function showEncounter() {
                if (encounterService.currentEntry !== undefined || encounterService.currentEntry !== null) {
                    if (encounterService.currentEntry < 0) {
                        resetEncounter();
                    }
                    $scope.currentEntry = encounterService.entries[encounterService.currentEntry];
                }
            }

            function resetEncounter() {
                encounterService.currentEntry = 0;
                showEncounter();
            }
        },
        link: {
            post: function (scope) {
                scope.$parent.$broadcast('elementSizeChanged');
            }
        }
    };
});