agencyManager.service('industryService', ['$http', '$q', function ($http, $q) {

    var industryService = {};

    industryService.newIndustry = function () {
        var newitem = {
            id: 0,
            name: '',
        }
    }

    industryService.getAll = function () {
        return $http.get('/api/industry');
    }

    industryService.save = function (item) {
        return $http.post('/api/industry', item);
    }

    industryService.delete = function (id) {
        return $http.delete('/api/industry/' + id);
    }

    return industryService;

}]);