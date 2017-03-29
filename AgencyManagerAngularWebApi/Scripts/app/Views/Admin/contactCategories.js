(function () {

    var agencyManager = angular.module("agencyManager");

    agencyManager.component('contactCategories', {
        bindings: {},
        templateUrl: '/Scripts/app/views/Admin/contactCategories.html',
        controllerAs: 'ctrl',
        controller: ['contactCategoryService', '$uibModal',
        function (contactCategoryService, $uibModal) {
              var ctrl = this;

              ctrl.items = [];

              ctrl.$routerOnActivate = function () {
                  ctrl.load();
              }

              ctrl.load = function () {
                  contactCategoryService.getAll().then(function (data) {
                      ctrl.items = data.data;
                  })
              }

              ctrl.open = function (editType, item) {
                  var modalInstance = $uibModal.open({
                      animation: true,
                      component: 'contactCategoryEdit',
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

                  contactCategoryService.delete(item.id).then(function (result) {
                      ctrl.load();
                      ctrl.isSaving = false;
                  });
              }

          }
        ],
    }).component('contactCategoryEdit', {
        templateUrl: 'contactCategoryEdit.html',
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controllerAs: 'ctrl',
        controller: ['contactCategoryService',
            function (contactCategoryService) {
                var ctrl = this;

                ctrl.isSaving = false;

                ctrl.$onInit = function () {
                    ctrl.editParams = ctrl.resolve.editParams;
                    if (ctrl.editParams.editType == 'NEW') {
                        ctrl.item = contactCategoryService.newContactCategory();
                    }
                    else {
                        ctrl.item = ctrl.editParams.item;
                    }
                };

                ctrl.ok = function () {
                    ctrl.isSaving = true;

                    contactCategoryService.save(ctrl.item).then(function (result) {
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