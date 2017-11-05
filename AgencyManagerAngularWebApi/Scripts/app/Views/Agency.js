(function () {

    var agencyManager = angular.module("agencyManager");

    agencyManager.component('agency', {
        bindings: {},
        templateUrl: '/Scripts/app/views/agency.html',
        require: {
            parent: '^root'
        },
        controllerAs: 'ctrl',
        controller: ['$scope', '$q', '$interval', 'agentService', 'contactService', 'conversationService',
            'positionService', '$uibModal', 'notifications', 'uiGridConstants', '$timeout',
            function ($scope, $q, $interval, agentService, contactService, conversationService,
                positionService, $uibModal, notifications, uiGridConstants, $timeout) {
                var ctrl = this;

                ctrl.local = {};
                var agentFactory = new agentService.factory();
                var contactFactory = new contactService.factory();
                var positionFactory = new positionService.factory();

                var columnDefs = [
                    {
                        field: 'id',
                        //displayName: 'Id',
                        visible: false,
                        //width: '200',
                        //enableHiding: false,
                        //enableSorting: false,
                        //enableCellEdit: true,
                    },
                    {
                        field: 'contactId',
                        visible: false,
                    },
                    {
                        field: 'title',
                        displayName: 'Title',
                        visible: true,
                        width: '200',
                        enableHiding: false,
                        enableSorting: false,
                        enableCellEdit: true,
                        //enableFiltering: true,
                        //filter: {
                        //    term: 'xx',
                        //    condition: uiGridConstants.filter.CONTAINS,
                        //    placeholder: 'starts with...',
                        //    ariaLabel: 'Starts with filter for title',
                        //    flags: { caseSensitive: false },
                        //    type: uiGridConstants.filter.SELECT,
                        //    selectOptions: [{ value: 1, label: 'male' }, { value: 2, label: 'female' }],
                        //    disableCancelFilterButton: true
                        //}
                    },
                    {
                        field: 'responsibilities',
                        displayName: 'Responsibilities',
                        visible: true,
                        width: '300',
                        enableHiding: false,
                        enableSorting: false,
                    },
                    {
                        field: 'skills',
                        displayName: 'Skills',
                        visible: true,
                        width: '300',
                        enableHiding: false,
                        enableSorting: false,
                    }
                ];

                ctrl.saveRow = function (rowEntity) {
                    var promise = positionService.save(rowEntity);
                    $scope.gridApi.rowEdit.setSavePromise(rowEntity, promise);
                };

                ctrl.newPosition = function () {
                    var newPosition = positionFactory.createPosition(ctrl.selectedValues.consultant.id);
                    ctrl.local.positions.push(newPosition);
                }

                ctrl.positionGridOptions = {
                    enableSorting: false,
                    enableColumnResizing: true,
                    columnDefs: columnDefs,
                    data: ctrl.local.positions,
                    onRegisterApi: function (gridApi) {
                        //set gridApi on scope
                        $scope.gridApi = gridApi;
                        gridApi.rowEdit.on.saveRow($scope, ctrl.saveRow);
                    }
                }

                ctrl.selectedValues = {
                    agent: null,
                    consultant: null,
                    position: null
                };

                ctrl.$onInit = function () {
                    ctrl.parent.activeNav = 'AGENCY';
                }

                ctrl.$routerOnActivate = function () {
                    initialise();
                    ctrl.load();
                }

                ctrl.onNewAgentClicked = function (callBack) {
                    var newAgent = agentFactory.createAgent();
                    callBack(newAgent);
                }

                ctrl.onNewConsultantClicked = function (callBack) {
                    var newConsultant = contactFactory.createContact();
                    newConsultant.agentId = ctrl.selectedValues.agent.id;
                    callBack(newConsultant);
                }

                ctrl.agentChanged = function (value) {
                    console.log('ctrl.agentChanged = function (item) {', value);

                    if (value.type = 'REFRESH') {
                        ctrl.load(function () {

                            var index = null;

                            angular.forEach(ctrl.local.agents, function (item, key) {
                                if (item.id == value.item.id) {
                                    index = ctrl.local.agents.indexOf(item);
                                }
                            });

                            ctrl.local.agents[index] = angular.copy(value.item);

                            ctrl.selectAgent(ctrl.local.agents[index]);
                        });
                    }
                };

                ctrl.consultantChanged = function (value) {
                    console.log('ctrl.consultantChanged = function (item) {', value);

                    if (value.type = 'REFRESH') {
                        ctrl.load(function () {

                            var index = null;

                            angular.forEach(ctrl.local.consultants, function (item, key) {
                                if (item.id == value.item.id) {
                                    index = ctrl.local.consultants.indexOf(item);
                                }
                            });

                            ctrl.local.consultants[index] = angular.copy(value.item);

                            ctrl.selectConsultant(ctrl.local.consultants[index]);
                        });
                    }
                };

                ctrl.load = function (callBack) {
                    ctrl.loadingAgents = true;

                    var _agencies = agentService.getAll();
                    _agencies.then(function (response) {
                        ctrl.local.agents = response.data;

                        angular.forEach(ctrl.local.agents, function (item, key) {
                            item.typeName = 'AGENT';
                        });

                        //$timeout(function () {
                        //    ctrl.loadingAgents = false;
                        //}, 5000)
                        ctrl.loadingAgents = false;

                        clearSelection('AGENT');

                        if (callBack) callBack();
                    },
                        function (error) {
                            ctrl.loadingAgents = false;
                            notifications.showError(error.status + ': ' + error.statusText);
                            console.log('error occured retrieving agencies: ' + error);
                        });
                }

                ctrl.selectAgent = function (agent) {
                    clearSelection('AGENT');
                    agent.isSelected = true;
                    ctrl.selectedValues.agent = agent;
                    loadConsultants(agent);
                }

                ctrl.deleteAgent = function (value) {
                    agentService.delete(value.item.id)
                        .then(function (result) {
                            notifications.showSuccess('Delete successful')
                            ctrl.load();
                        },
                        function () {
                            notifications.showError(error.status + ': ' + error.statusText);
                        });
                }

                ctrl.deleteConsultant = function (value) {
                    contactService.delete(value.item.id)
                        .then(function (result) {
                            notifications.showSuccess('Delete successful')
                            ctrl.load();
                        },
                        function () {
                            notifications.showError(error.status + ': ' + error.statusText);
                        });
                }

                function loadConsultants(agent) {
                    ctrl.loadingConsultants = true;
                    ctrl.local.consultants = [];

                    var criteria = {
                        agentId: ctrl.selectedValues.agent.id,
                    }

                    var _consultants = contactService.getFiltered(criteria);
                    _consultants.then(function (response) {
                        ctrl.local.consultants = response.data;

                        angular.forEach(ctrl.local.consultants, function (item, key) {
                            item.typeName = 'CONSULTANT';
                        });

                        ctrl.loadingConsultants = false;

                        clearSelection('CONSULTANT');
                    },
                        function (error) {
                            ctrl.loadingConsultants = false;
                            notifications.showError(error.status + ': ' + error.statusText);
                            console.log('error occured retrieving consultants: ' + error);
                        });
                }

                ctrl.selectConsultant = function (consultant) {
                    clearSelection('CONSULTANT');
                    consultant.isSelected = true;
                    ctrl.selectedValues.consultant = consultant;
                    loadConversation(consultant);
                    loadPosition(consultant);
                }

                function loadConversation(consultant) {
                    ctrl.loadingConversation = true;
                    ctrl.local.conversations = [];

                    var criteria = {
                        contactId: ctrl.selectedValues.consultant.id,
                    }

                    var _conversations = conversationService.getFiltered(criteria);
                    _conversations.then(function (response) {

                        angular.forEach(response.data, function (item, key) {
                            item.time = new Date(item.time);
                            item.typeName = 'CONVERSATION';
                        });

                        ctrl.loadingConversation = false;
                        ctrl.local.conversations = response.data;
                    },
                        function (error) {
                            ctrl.loadingConversation = false;
                            notifications.showError(error.status + ': ' + error.statusText);
                            console.log('error occured retrieving conversations: ' + error);
                        });
                }

                ctrl.openConversation = function (editType, item) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        component: 'conversationEdit',
                        resolve: {
                            editParams: function () {
                                return {
                                    editType: editType,
                                    consultantId: ctrl.selectedValues.consultant.id,
                                    item: item,
                                };
                            }
                        }
                    });

                    modalInstance.result.then(function () {
                    }, function (value) {
                        console.log('modal-component dismissed at: ' + new Date());
                        if (value == 'REFRESH') {
                            loadConversation(ctrl.selectedValues.consultant);
                        }
                    });
                }

                ctrl.deleteConversation = function (item) {
                    ctrl.isSaving = true;
                    ctrl.loadConversation = true;

                    conversationService.delete(item.id).then(function (result) {
                        loadConversation(ctrl.selectedValues.consultant);
                        ctrl.isSaving = false;
                    });
                }

                function loadPosition(consultant) {
                    ctrl.local.positions = [];
                    ctrl.loadingPositions = true;

                    var criteria = {
                        contactId: ctrl.selectedValues.consultant.id,
                    }

                    var _positions = positionService.getFiltered(criteria);
                    _positions.then(function (response) {

                        angular.forEach(response.data, function (position, key) {
                            //delete position.contactId;
                            //delete position.id;
                            position.typeName = 'POSITION';
                        });

                        ctrl.loadingPositions = false;
                        ctrl.local.positions = response.data;
                        ctrl.positionGridOptions.data = ctrl.local.positions;

                        console.log('ctrl.positionGridOptions.data', ctrl.positionGridOptions.data);
                    },
                        function (error) {
                            ctrl.loadingPositions = false;
                            notifications.showError(error.status + ': ' + error.statusText);
                            console.log('error occured retrieving positions: ' + error);
                        });

                }

                ctrl.selectPosition = function (position) {
                    clearSelection('POSITION');
                    position.isSelected = true;
                    ctrl.selectedValues.position = position;
                }

                function clearSelection(level) {
                    switch (level) {
                        case 'AGENT':
                            {
                                angular.forEach(ctrl.local.agents, function (item, index) {
                                    item.isSelected = false;
                                });

                                ctrl.local.conversations = [];
                                ctrl.selectedValues.agent = null;
                                ctrl.selectedValues.consultant = null;
                                ctrl.selectedValues.position = null;
                            }
                            break;

                        case 'CONSULTANT':
                            {
                                angular.forEach(ctrl.local.consultants, function (item, index) {
                                    item.isSelected = false;
                                });

                                ctrl.local.conversations = [];
                                ctrl.selectedValues.consultant = null;
                                ctrl.selectedValues.position = null;
                            }
                            break;

                        default:

                    }
                }

                function initialise() {
                    ctrl.local = {
                        agents: [],
                        consulatants: [],
                        conversations: "",
                        positions: [],
                    }
                }

            }
        ],
    }).component('conversationEdit', {
        templateUrl: 'conversationEdit.html',
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controllerAs: 'ctrl',
        controller: ['conversationService',
            function (conversationService) {
                var ctrl = this;

                ctrl.isSaving = false;

                // date picker settings
                ctrl.popup1 = {
                    opened: false
                };

                ctrl.dateFormat = 'dd-MM-yyyy';
                ctrl.dateOptions = {
                    dateDisabled: disabled,
                    formatYear: 'yy',
                    maxDate: new Date(2020, 5, 22),
                    minDate: new Date(),
                    startingDay: 1
                };
                ctrl.altInputFormats = ['M!/d!/yyyy'];

                // Disable weekend selection
                function disabled(data) {
                    var date = data.date,
                        mode = data.mode;
                    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
                }

                ctrl.open1 = function () {
                    ctrl.popup1.opened = true;
                };
                // end date picker settings

                ctrl.$onInit = function () {
                    ctrl.editParams = ctrl.resolve.editParams;
                    if (ctrl.editParams.editType == 'NEW') {
                        ctrl.item = conversationService.newConversation(ctrl.editParams.consultantId);
                    }
                    else {
                        ctrl.item = ctrl.editParams.item;
                    }
                };

                ctrl.ok = function () {
                    ctrl.isSaving = true;

                    conversationService.save(ctrl.item).then(function (result) {
                        ctrl.isSaving = false;
                        ctrl.dismiss({ $value: 'REFRESH' });
                    });
                };

                ctrl.cancel = function () {
                    ctrl.dismiss({ $value: 'cancel' });
                };
            }]
    }).component('contactConversation', {
        templateUrl: 'contactConversation.html',
        bindings: {
            conversation: '<',
            index: '<',
            openConversation: '&',
            deleteConversation: '&',
        },
        controllerAs: 'ctrl',
        controller: ['conversationService',
            function (conversationService) {
                var ctrl = this;

                ctrl.$onInit = function () {

                };

                ctrl.open = function (type, conversation) {
                    ctrl.openConversation({ editType: type, item: conversation });
                }

                ctrl.delete = function (item) {
                    ctrl.deleteConversation({ item: item });

                    //    ctrl.isSaving = true;

                    //    conversationService.delete(item.id).then(function (result) {
                    //        loadConversation(ctrl.selectedValues.consultant);
                    //        ctrl.isSaving = false;
                    //    });
                }

            }]
    });
})();