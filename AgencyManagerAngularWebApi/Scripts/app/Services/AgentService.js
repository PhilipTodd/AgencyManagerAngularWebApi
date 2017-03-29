agencyManager.service('agentService', ['$http', '$q', function ($http, $q) {

    var agentService = {};

    agentService.getAll = function () {
        return $http.get('/api/agent');
    }

    return agentService;

}]);