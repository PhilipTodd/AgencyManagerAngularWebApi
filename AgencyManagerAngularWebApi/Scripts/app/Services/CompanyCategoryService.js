agencyManager.service('companyCategoryService', ['$http', '$q', function ($http, $q) {

    var companyCategoryService = {};

    companyCategoryService.newCompanyCategory = function () {
        var newitem = {
            id: 0,
            name: '',
        }
    }

    companyCategoryService.getAll = function () {
        return $http.get('/api/CompanyCategory');
    }

    companyCategoryService.save = function(item){
        return $http.post('/api/CompanyCategory', item);
    }

    companyCategoryService.delete = function (id) {
        return $http.delete('/api/CompanyCategory/' + id);
    }

    return companyCategoryService;

}]);