(function () {

    var agencyManager = angular.module("agencyManager");

    agencyManager.component('admin', {
        bindings: {},
        templateUrl: '/Scripts/app/views/admin.html',
        $routeConfig: [
          { path: '/addresses', name: 'Addresses', component: 'addresses', useAsDefault: true },
          { path: '/companyCategories', name: 'CompanyCategories', component: 'companyCategories' },
          { path: '/contactCategories', name: 'ContactCategories', component: 'contactCategories' },
          { path: '/industries', name: 'Industries', component: 'industries' },
        ],
        controllerAs: 'ctrl',
        controller: [ '$location',
          function ($location) {
              var ctrl = this;

              ctrl.items = [];
              ctrl.msg = 'admin view component rendered correctly';

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