agencyManager.service('positionService', ['$http', '$q', function ($http, $q) {

    var positionService = {};

    function position(contactId) {
        this.id = 0;
        this.contactId = contactId;
        this.title = '';
        this.responsibilities = '';
        this.skills = '';
    }

    positionService.factory = function () {
        this.createPosition = function (contactId) {
            return new position(contactId);
        }
    }

    positionService.getAll = function () {
        return $http.get('/api/position');
    }

    positionService.getFiltered = function (criteria) {
        return $http.get('/api/position', { params: criteria })
    }

    positionService.save = function (item) {
        return $http.post('/api/position', item);
    }

    positionService.delete = function (id) {
        return $http.delete('/api/position/' + id);
    }

    return positionService;

}]);