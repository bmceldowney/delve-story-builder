/// <reference path="../../Scripts/angular-1.0.3.intellisense.js" />
angular.module('storyBuilder', ['ngResource',
                                'DataProvider',
                                'EncounterEngine',
                                'Encounters',
                                'encounterRunner',
                                'GameState',
                                'ui.sortable',
                                'ui.select2',
                                'ui.bootstrap',
                                'LocalStorageModule',
                                'SettingsServiceProvider',
                                'DomUtilities']);

angular.module('storyBuilder').config(function ($routeProvider) {
    $routeProvider.
	when('/', { controller: 'MainCtrl', templateUrl: 'main.html' }).
	when('/create', { controller: 'CreateCtrl', templateUrl: 'detail.html' }).
	when('/edit/:id', { controller: 'EditCtrl', templateUrl: 'detail.html' }).
	otherwise({ redirectTo: '/' });
}).config(['$httpProvider', function ($httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);

angular.module('storyBuilder').run(function ($rootScope, $location, localStorageService, settings) {
    $rootScope.apiKeyModalOpen = false;

    $rootScope.modalOpts = {
        backdropFade: true,
        dialogFade: true
    };

    $rootScope.apiKeyModalClose = function () {
        settings.app.apiKey = $rootScope.apiKey;
        settings.app.url = $rootScope.url;
        localStorageService.add('apiKey', settings.app.apiKey);
        localStorageService.add('url', settings.app.url);
        $location.path('/');
        $rootScope.apiKeyModalOpen = false;
    }

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if (!settings.app.apiKey || !settings.app.url) {
            settings.app.apiKey = localStorageService.get('apiKey');
            settings.app.url = localStorageService.get('url');

            if (!settings.app.apiKey || !settings.app.url) {
                $rootScope.apiKeyModalOpen = true;
            }
        }
    });
});

angular.module('storyBuilder').directive('ngFocus', ['$parse', function ($parse) {
    return function (scope, element, attr) {
        var fn = $parse(attr['ngFocus']);
        element.bind('focus', function (event) {
            scope.$apply(function () {
                fn(scope, { $event: event });
            });
        });
    }
}]);

angular.module('storyBuilder').directive('expando', function (utilities) {
    return {
        restrict: 'A',
        transclude: true,
        template: '<div style="height: 100%" ng-transclude></div>',
        link: {
            post: function (scope, element, attributes, controller) {
                function setHeight(style) {
                    var headerHeight = element[0].previousElementSibling.offsetTop + element[0].previousElementSibling.clientHeight;
                    var footerHeight = element[0].nextElementSibling.offsetTop; //height;
                    element[0].style.height = ((window.innerHeight - headerHeight) - (window.innerHeight - footerHeight)) + 'px';
                }

                scope.$on('elementSizeChanged', function (event, message) {
                    setHeight();
                });

                window.addEventListener('resize', setHeightNoAnim);
                document.addEventListener('ready', setHeightNoAnim);

                setHeight();

                function setHeightNoAnim() {
                    setHeight();
                }
            }
        }
    };
});

angular.module('storyBuilder').controller('EditCtrl', function ($scope, $routeParams, $location, Encounter) {
    var params = $routeParams;
    $scope.encounter = Encounter.get({ id: $routeParams.id });
    $scope.detailUrl = '';
    $scope.selectedItem = null;

    $scope.links = function () {
        var retval = [];
        retval.push({ value: -3, displayText: "another encounter" });
        retval.push({ value: -2, displayText: "combat" });
        retval.push({ value: -1, displayText: "end" });
        $scope.encounter.entries.forEach(function (entry) {
            retval.push({ value: entry.id, displayText: '[' + entry.id + '] ' + entry.text });
        });

        return retval;
    }

    $scope.isEntrySelected = function () {
        if (!this.selectedItem || !this.entry) return false;
        return this.selectedItem.$$hashKey === this.entry.$$hashKey;
    }

    $scope.isOptionSelected = function () {
        if (!this.selectedItem || !this.option) return false;
        return this.selectedItem.$$hashKey === this.option.$$hashKey;
    }

    $scope.elementFocused = function () {
        var entry = this.entry;
        var option = this.option;
        if (option) {
            $scope.detailUrl = 'optionDetail.html';
            $scope.selectedItem = option;
        } else {
            $scope.detailUrl = 'entryDetail.html';
            $scope.selectedItem = entry;
        }
    }

    $scope.sortableOptions = {
        axis: 'y',
        distance: 5,
        handle: '.en-op-drag-handle'
    };

    $scope.update = function () {
        this.encounter.update();
        $location.path('/');
    }
});

angular.module('storyBuilder').controller('EditItemCtrl', function ($scope) {
    $scope.prereqToAdd = null;

    $scope.addPrereq = function (item) {
        item.prereq = item.prereq || [];
        item.prereq.push(this.prereqToAdd);
        this.prereqToAdd = null;
    }

    $scope.addResult = function (item) {
        item.results = item.results || [];
        item.results.push(this.resultToAdd);
        this.resultToAdd = null;
    }
});

angular.module('storyBuilder').controller('MainCtrl', function ($scope, Encounter) {
    $scope.encounters = Encounter.query();
})

angular.module('storyBuilder').controller('CreateCtrl', function ($scope, Encounter, $location) {
    $scope.encounter = new Encounter({ entries: [] });
    $scope.detailUrl = 'entryDetail.html';
})
