(function () {

    var agencyManager = angular.module("agencyManager");

    agencyManager.component('industries', {
        bindings: {},
        templateUrl: '/Scripts/app/views/Admin/industries.html',
        controllerAs: 'ctrl',
        controller: ['industryService', '$uibModal',
          function (industryService, $uibModal) {
              var ctrl = this;

              ctrl.items = [];

              ctrl.$routerOnActivate = function () {
                  ctrl.load();
              }

              ctrl.load = function () {
                  industryService.getAll().then(function (data) {
                      ctrl.items = data.data;
                  })
              }

              ctrl.open = function (editType, item) {
                  var modalInstance = $uibModal.open({
                      animation: true,
                      component: 'industryEdit',
                      resolve: {
                          editParams: function () {
                              return {
                                  editType: editType,
                                  item: item,
                              };
                          }
                      }
                  });

                  modalInstance.result.then(function () {
                  }, function (value) {
                      console.log('modal-component dismissed at: ' + new Date());
                      if (value == 'REFRESH') {
                          ctrl.load();
                      }
                  });
              }

              ctrl.delete = function (item) {
                  ctrl.isSaving = true;

                  industryService.delete(item.id).then(function (result) {
                      ctrl.load();
                      ctrl.isSaving = false;
                  });
              }
          }
        ],
    }).component('industryEdit', {
        templateUrl: 'industryEdit.html',
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controllerAs: 'ctrl',
        controller: ['industryService',
            function (industryService) {
                var ctrl = this;

                ctrl.isSaving = false;

                ctrl.$onInit = function () {
                    ctrl.editParams = ctrl.resolve.editParams;
                    if (ctrl.editParams.editType == 'NEW') {
                        ctrl.item = industryService.newIndustry();
                    }
                    else {
                        ctrl.item = ctrl.editParams.item;
                    }
                };

                ctrl.ok = function () {
                    ctrl.isSaving = true;

                    industryService.save(ctrl.item).then(function (result) {
                        ctrl.isSaving = false;
                        ctrl.dismiss({ $value: 'REFRESH' });
                    });
                };

                ctrl.cancel = function () {
                    ctrl.dismiss({ $value: 'cancel' });
                };
            }]
    });
})();