agencyManager = angular.module('agencyManager', ['ngComponentRouter', 'ui.bootstrap', 'ngNotificationsBar'])
.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});