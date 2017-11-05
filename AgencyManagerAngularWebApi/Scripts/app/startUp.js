agencyManager = angular.module('agencyManager', ['ngComponentRouter', 'ui.bootstrap',
    'ngNotificationsBar', 'ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.cellNav'])
.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});