/// <reference path="../vendor/angular.js" />
"use strict";

angular.module('EncounterEngine', ['DataProvider', 'GameState']);

angular.module('EncounterEngine').factory('encounterService', function (dataService, gameState) {
    var entries = [];
    var currentEntryId = 0;
    var encounterLoaded = false;
    var encounter = {};

    function loadEncounter(encounter) {
        encounter.entries.forEach(processEntry.bind(this));
        this.currentEntry = 0;
    }

    function loadEncounterFromId(id) {
        var encounter = dataService.getEncounter(id);
        var url = '../..' + encounter.url;

        $.getJSON(url).done(function (result) {
            this.encounter = result;
            result.entries.forEach(processEntry.bind(this));

            this.currentEntry = 0;
            this.encounterLoaded = true;
        }.bind(this));
    };

    function processEntry(entry) {
        if (entry.options) {
            filterOptions(entry);
        }

        this.entries.push(entry);
    }

    function navigate(option) {
        if (option.link === 'end') {
            this.currentEntry = null;
            this.encounterLoaded = false;
        } else {
            this.currentEntry = parseInt(option.link, 10);
            if (this.currentEntry.subEncounter) {

            }
        }
    };

    function filterOptions(entry) {
        var retval;
        var groups = {};

        if (!entry.options || !entry.options.length) {
            return null;
        }

        retval = _.map(entry.options, optionFilter)

        function optionFilter(option) {
            option.active = true;
            if (option.prereq && !gameState.partyTags[option.prereq])
                option.active = false;;

            if (option.group && option.active) {
                if (groups[option.group]) {
                    option.active = false;
                } else {
                    groups[option.group] = 1;
                }
            }

            return option;
        }

        return retval;
    };

    return {
        entries: entries
      , currentEntryId: currentEntryId
      , encounterLoaded: encounterLoaded
      , encounter: encounter
      , loadEncounterFromId: loadEncounterFromId
      , loadEncounter: loadEncounter
      , navigate: navigate
    };
});
