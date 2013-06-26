angular.module('SettingsServiceProvider', []);

angular.module('SettingsServiceProvider').factory('settings', function () {
    return {
        app: {
            apiKey: '',
            url: ''
        },
        user: {
        }
    };
});
