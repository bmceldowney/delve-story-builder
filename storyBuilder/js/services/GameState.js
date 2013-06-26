/// <reference path="../vendor/angular.js" />
"use strict";

angular.module('GameState', ['DataProvider']);

angular.module('GameState').factory('gameState', function () {
    var partyTags = []

    return {
        partyTags: partyTags
    }
})