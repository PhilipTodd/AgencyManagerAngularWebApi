agencyManager.service('agentService', ['$http', '$q', function ($http, $q) {

    var agentService = {};

    var agent = function () {
        this.id = 0,
        this.name = ''
    }

    agentService.factory = function () {
        this.createAgent = function () {
            return new agent();
        }
    }

    agentService.getAll = function () {
        return $http.get('/api/agent');
    }

    return agentService;

}]);