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

    agentService.save = function (item) {
        return $http.post('/api/agent', item);
    }

    agentService.delete = function (id) {
        return $http.delete('/api/agent/' + id);
    }

    return agentService;

}]);