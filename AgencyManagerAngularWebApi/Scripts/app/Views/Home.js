(function () {

    var agencyManager = angular.module("agencyManager");

    agencyManager.component('home', {
        bindings: {},
        templateUrl: '/Scripts/app/views/home.html',
        controllerAs: 'ctrl',
        controller: ['$scope',
          function ($scope) {
              var ctrl = this;

              ctrl.msg = 'home view';

          }
        ],
    });
})();