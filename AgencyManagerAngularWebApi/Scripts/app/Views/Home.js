(function () {

    var agencyManager = angular.module("agencyManager");

    agencyManager.component('home', {
        bindings: {},
        templateUrl: '/Scripts/app/views/home.html',
        controllerAs: 'ctrl',
        require: {
            parent: '^root'
        },
        controller: ['$scope',
          function ($scope) {
              var ctrl = this;

              ctrl.$onInit = function () {
                  ctrl.parent.activeNav = 'HOME';
              }

              ctrl.msg = 'home view';

          }
        ],
    });
})();