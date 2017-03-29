agencyManager.service('addressService', ['$http', '$q', function ($http, $q) {

    var addressService = {};

    addressService.newAddress = function () {
        var newitem = {
            id: 0,
            name: '',
        }
    }

    addressService.getAll = function () {
        return $http.get('/api/address');
    }

    addressService.save = function (item) {
        return $http.post('/api/address', item);
    }

    addressService.delete = function (id) {
        return $http.delete('/api/address/' + id);
    }

    addressService.staticData = {
        states: ['NSW', 'ACT', 'VIC', 'SA', 'WA', 'NT']
    };

    return addressService;

}]);