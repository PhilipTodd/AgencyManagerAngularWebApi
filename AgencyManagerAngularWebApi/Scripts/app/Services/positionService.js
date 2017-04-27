agencyManager.service('positionService', ['$http', '$q', function ($http, $q) {

    var positionService = {};

    positionService.newPosition = function (contactId) {
        var newitem = {
            id: 0,
            contactId: contactId,
            title: '',
            responsibilities: '',
            skills: '',
        }

        return newitem;
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