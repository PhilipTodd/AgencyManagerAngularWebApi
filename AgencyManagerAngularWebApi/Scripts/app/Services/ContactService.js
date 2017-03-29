agencyManager.service('contactService', ['$http', '$q', function ($http, $q) {

    var contactService = {};

    contactService.getAll = function () {
        return $http.get('/api/contact');
    }

    contactService.getFiltered = function (criteria) {

        //return $http.get('/api/contact', { params: { agentId: 1 } })
        //return $http.get('/api/contact/GetFiltered', { params: criteria })
        //return $http.get('/api/contact/GetFiltered?agentId=' + criteria.agentId)
        //return $http.get('/api/contact/GetFiltered', { params: { agentId: 1 } })

        return $http.get('/api/contact', { params: criteria })
    }

    return contactService;

}]);