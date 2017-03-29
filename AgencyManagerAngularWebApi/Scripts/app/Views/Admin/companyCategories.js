(function () {

    var agencyManager = angular.module("agencyManager");

    agencyManager.component('companyCategories', {
        bindings: {},
        templateUrl: '/Scripts/app/views/Admin/companyCategories.html',
        controllerAs: 'ctrl',
        controller: ['companyCategoryService', '$uibModal',
        function (companyCategoryService, $uibModal) {
            var ctrl = this;

            ctrl.items = [];

            ctrl.$routerOnActivate = function () {
                ctrl.load();
            }

            ctrl.load = function () {
                companyCategoryService.getAll().then(function (data) {
                    ctrl.items = data.data;
                })
            }

            ctrl.open = function (editType, item) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    component: 'companyCategoryEdit',
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

                companyCategoryService.delete(item.id).then(function (result) {
                    ctrl.load();
                    ctrl.isSaving = false;
                });
            }

        }],
    }).component('companyCategoryEdit', {
        templateUrl: 'companyCategoryEdit.html',
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controllerAs: 'ctrl',
        controller: ['companyCategoryService', 
            function (companyCategoryService) {
            var ctrl = this;

            ctrl.isSaving = false;

            ctrl.$onInit = function () {
                ctrl.editParams = ctrl.resolve.editParams;
                if (ctrl.editParams.editType == 'NEW') {
                    ctrl.item = companyCategoryService.newCompanyCategory();
                }
                else {
                    ctrl.item = ctrl.editParams.item;
                }
            };

            ctrl.ok = function () {
                ctrl.isSaving = true;

                companyCategoryService.save(ctrl.item).then(function (result) {
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
