agencyManager = angular.module('agencyManager', ['ngComponentRouter', 'ui.bootstrap', 'ngNotificationsBar', 'ui.grid'])
.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});