/// <reference path="../vendor/angular.js" />
"use strict";

angular.module('DataProvider', ['Encounters']);

angular.module('DataProvider').factory('dataService', function (Encounter) {
    return {
        getEncounter: function (id) {
            Encounter.get();
        }
    }
});
