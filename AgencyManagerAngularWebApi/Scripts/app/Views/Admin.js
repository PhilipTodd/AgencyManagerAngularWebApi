﻿(function () {

    var agencyManager = angular.module("agencyManager");

    agencyManager.component('admin', {
        bindings: {},
        templateUrl: '/Scripts/app/views/admin.html',
        require: {
            parent: '^root'
        },
        $routeConfig: [
          { path: '/addresses', name: 'ADDRESSES', component: 'addresses', useAsDefault: true },
          { path: '/companyCategories', name: 'COMPANYCATEGORIES', component: 'companyCategories' },
          { path: '/contactCategories', name: 'CONTACTCATEGORIES', component: 'contactCategories' },
          { path: '/industries', name: 'INDUSTRIES', component: 'industries' },
        ],
        controllerAs: 'ctrl',
        controller: [ '$location',
          function ($location) {
              var ctrl = this;

              ctrl.items = [];
              ctrl.msg = 'admin view component rendered correctly';

              ctrl.$onInit = function () {
                  ctrl.parent.activeNav = 'HOME';
              }

              ctrl.$onInit = function () {
                  ctrl.parent.activeNav = 'ADMIN';
              }

              ctrl.$routerOnActivate = function (next, previous) {
                  console.log($location.url())

                  var currentUrl = $location.url();
                  if (currentUrl.indexOf('admin/addresses') > 0) {
                      ctrl.activePill = 0;
                  }
                  else if (currentUrl.indexOf('admin/companyCategories') > 0) {
                      ctrl.activePill = 1;
                  }
                  else if (currentUrl.indexOf('admin/contactCategories') > 0) {
                      ctrl.activePill = 2;
                  }
                  else if (currentUrl.indexOf('admin/industries') > 0) {
                      ctrl.activePill = 3;
                  }

              }

              ctrl.load = function () {

              }

          }
        ],
    });
})();