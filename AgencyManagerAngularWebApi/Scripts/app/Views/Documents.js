(function () {

    var agencyManager = angular.module("agencyManager");

    agencyManager.component('documents', {
        bindings: {},
        templateUrl: '/Scripts/app/views/documents.html',
        controllerAs: 'ctrl',
        controller: ['agentService',
          function (agentService) {
              var ctrl = this;

              ctrl.items = [];
              ctrl.msg = 'documents view component rendered correctly';

              ctrl.$onInit = function () {
                  ctrl.parent.activeNav = 'DOCUMENTS';
              }

              ctrl.$routerOnActivate = function () {
                  //ctrl.load();
              }

              ctrl.load = function () {

              }
          }
        ],
    });
})();