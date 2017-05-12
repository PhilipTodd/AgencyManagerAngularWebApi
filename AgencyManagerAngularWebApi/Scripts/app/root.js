agencyManager.component('root', {
    templateUrl: '/Scripts/app/root.html',
    $routeConfig: [
          { path: '/', name: 'HOME', component: 'home', useAsDefault: true },
          { path: '/agency', name: 'AGENCY', component: 'agency' },
          { path: '/interviews', name: 'INTERVIEWS', component: 'interviews' },
          { path: '/documents', name: 'DOCUMENTS', component: 'documents' },
          { path: '/admin/...', name: 'ADMIN', component: 'admin' },
    ],
    controllerAs: 'ctrl',
    controller: function ($rootRouter) {
        var ctrl = this;

        ctrl.activeNav = 'HOME';

        ctrl.navigate = function (target) {
            ctrl.activeNav = target;
            $rootRouter.navigate([target]);
        }
    },
});

agencyManager.value('$routerRootComponent', 'root');
