(function () {

    var agencyManager = angular.module("agencyManager");

    agencyManager.component('addresses', {
        bindings: {},
        templateUrl: '/Scripts/app/views/Admin/addresses.html',
        controllerAs: 'ctrl',
        controller: ['addressService', '$uibModal',
        function (addressService, $uibModal) {
              var ctrl = this;

              ctrl.items = [];

              ctrl.$routerOnActivate = function () {
                  ctrl.load();
              }

              ctrl.load = function () {
                  addressService.getAll().then(function (data) {
                      ctrl.items = data.data;
                  })
              }

              ctrl.open = function (editType, item) {
                  var modalInstance = $uibModal.open({
                      animation: true,
                      component: 'addressEdit',
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
                      if (value === 'REFRESH') {
                          ctrl.load();
                      }
                  });
              }

              ctrl.delete = function (item) {
                  ctrl.isSaving = true;

                  addressService.delete(item.id).then(function (result) {
                      ctrl.load();
                      ctrl.isSaving = false;
                  });
              }
          }
        ],
    }).component('addressEdit', {
        templateUrl: 'addressEdit.html',
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controllerAs: 'ctrl',
        controller: ['addressService',
            function (addressService) {
                var ctrl = this;

                ctrl.isSaving = false;
                ctrl.states = addressService.staticData.states;

                ctrl.$onInit = function () {
                    ctrl.editParams = ctrl.resolve.editParams;
                    if (ctrl.editParams.editType === 'NEW') {
                        ctrl.item = addressService.newAddress();
                    }
                    else {
                        ctrl.item = ctrl.editParams.item;
                    }
                };

                ctrl.ok = function () {
                    ctrl.isSaving = true;

                    addressService.save(ctrl.item).then(function (result) {
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
