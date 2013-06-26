angular.module('Encounters', ['SettingsServiceProvider']);

angular.module('Encounters').value('apiKey', '');

angular.module('Encounters').factory('Encounter', function ($resource, settings) {
    var Encounter = $resource(settings.app.url +
		'/collections/encounters/documents/:id',
		{
		    id: "@id",
		    _apikey: settings.app.apiKey
		},
		{
		    create: { method: 'POST' },
		    update: { method: 'PUT' }
		});

    Encounter.prototype.create = function (cb) {
        return Encounter.create(
            {},
            { document: this },
            cb
        );

    }

    Encounter.prototype.update = function (cb) {
        var obj = angular.extend({}, this, { _id: undefined });
        return Encounter.update(
            { id: this._id.$oid },
            { document: obj },
            cb
        );
    }

    Encounter.prototype.addEntry = function () {
        var entryId = Math.max.apply(Math, this.entries.map(function (entry) { return entry.id })) + 1;

        this.entries.push({
            id: entryId,
            text: 'Entry text goes here...',
            options: [],
            group: undefined
        })
    }

    Encounter.prototype.addOption = function (entry) {
        if (!entry.options) {
            entry.options = [];
        };

        entry.options.push({
            prereq: '',
            text: 'Option text goes here...'
        });
    };

    Encounter.prototype.removeEntry = function (entry) {
        var entryIndex = this.entries.indexOf(entry);
        this.entries.splice(entryIndex, 1);
    }

    Encounter.prototype.removeEntryOption = function (entry, option) {
        var optionIndex = entry.options.indexOf(option);
        entry.options.splice(optionIndex, 1);
    }

    return Encounter;
});
