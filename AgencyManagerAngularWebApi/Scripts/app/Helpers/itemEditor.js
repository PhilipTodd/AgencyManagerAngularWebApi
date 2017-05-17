(function () {

    var agencyManager = angular.module("agencyManager");

    agencyManager.component('itemEditor', {
        bindings: {
            itemType: '@',
            item: '=',
            onNewClicked: '&',
            onEditClicked: '&',
            onDeleteClicked: '&',
            itemChanged: '&',
        },
        templateUrl: '/Scripts/app/Helpers/itemEditor.html',
        controllerAs: 'ctrl',
        controller: ['agentService', '$uibModal',
            function (agentService, $uibModal) {
                var ctrl = this;

                ctrl.$onInit = function () {
                    console.log('ctrl.item', ctrl.item)
                }

                ctrl.new = function () {
                    ctrl.onNewClicked({
                        callBack: function (newItem) {
                            console.log(newItem);
                            displayDialog(newItem);
                        }
                    });
                }

                ctrl.edit = function () {

                }

                ctrl.delete = function () {

                }

                function displayDialog(item) {
                    var editType = item.id < 1;
                    switch (item.constructor.name) {
                        case 'agent': {
                            openAgent(editType, item);
                        }
                            break;
                        default:
                    }
                }

                function openAgent(editType, item) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        component: 'agentEdit',
                        resolve: {
                            editParams: function () {
                                return {
                                    editType: editType,
                                    agentId: item.id,
                                    item: item,
                                };
                            }
                        }
                    });

                    modalInstance.result.then(function () {
                    }, function (value) {
                        console.log('modal-component dismissed at: ' + new Date());
                        console.log('value', value);
                        if (value.type === 'REFRESH') {
                            ctrl.itemChanged({ value: value });
                        }
                    });
                }
            }
        ],
    }).component('agentEdit', {
        templateUrl: 'agentEdit.html',
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controllerAs: 'ctrl',
        controller: ['agentService', function (agentService) {
            var ctrl = this;

            ctrl.isSaving = false;

            ctrl.$onInit = function () {
                ctrl.editParams = ctrl.resolve.editParams;
                if (ctrl.editParams.editType == 'NEW') {
                    ctrl.item = new agentService.factory().createAgent();
                }
                else {
                    ctrl.item = ctrl.editParams.item;
                }
            };

            ctrl.ok = function () {
                ctrl.isSaving = true;

                agentService.save(ctrl.item).then(function (result) {
                    ctrl.isSaving = false;
                    ctrl.dismiss({ $value: { type: 'REFRESH', item: result.data } });
                });
            };

            ctrl.cancel = function () {
                ctrl.dismiss({ $value: 'CANCEL' });
            };

        }]

    });
})();