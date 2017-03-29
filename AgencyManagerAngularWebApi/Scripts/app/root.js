agencyManager.component('root', {
    templateUrl: '/Scripts/app/root.html',
    $routeConfig: [
          { path: '/', name: 'Home', component: 'home', useAsDefault: true },
          { path: '/agency', name: 'Agency', component: 'agency' },
          { path: '/interviews', name: 'Interviews', component: 'interviews' },
          { path: '/documents', name: 'Documents', component: 'documents' },
          { path: '/admin/...', name: 'Admin', component: 'admin' },
    ]
});

agencyManager.value('$routerRootComponent', 'root');
