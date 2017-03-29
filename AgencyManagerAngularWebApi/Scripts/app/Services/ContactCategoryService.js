agencyManager.service('contactCategoryService', ['$http', '$q', function ($http, $q) {

    var contactCategoryService = {};

    contactCategoryService.newContactCategory = function () {
        var newitem = {
            id: 0,
            name: '',
        }
    }

    contactCategoryService.getAll = function () {
        return $http.get('/api/contactCategory');
    }

    contactCategoryService.save = function (item) {
        return $http.post('/api/contactCategory', item);
    }

    contactCategoryService.delete = function (id) {
        return $http.delete('/api/contactCategory/' + id);
    }

    return contactCategoryService;

}]);