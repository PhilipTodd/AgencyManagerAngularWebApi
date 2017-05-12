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
        controller: ['agentService',
            function (agentService) {
                var ctrl = this;

                ctrl.$onInit = function () {

                }
                
                ctrl.new = function () {
                    ctrl.onNewClicked({
                        callBack: function (newItem) {
                            console.log(newItem);
                            console.log(newItem.constructor.name);
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

                function openAgent (editType, item) {
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
                        if (value == 'REFRESH') {
                            ctrl.itemChanged(value);
                        }
                    });
                }
            }
        ],
    });
})();