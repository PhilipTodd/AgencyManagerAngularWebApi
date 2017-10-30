(function () {

    var agencyManager = angular.module("agencyManager");

    agencyManager.component('interviews', {
        bindings: {},
        templateUrl: '/Scripts/app/views/interviews.html',
        require: {
            parent: '^root'
        },
        controllerAs: 'ctrl',
        controller: ['agentService',
          function (agentService) {
              var ctrl = this;

              ctrl.items = [];
              ctrl.msg = 'interviews view component rendered correctly';

              ctrl.$onInit = function () {
                  ctrl.parent.activeNav = 'INTERVIEWS';
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