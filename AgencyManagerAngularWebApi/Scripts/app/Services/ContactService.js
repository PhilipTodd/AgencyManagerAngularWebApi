agencyManager.service('contactService', ['$http', '$q', function ($http, $q) {

    var contactService = {};

    function contact() {
        this.typeName = 'CONTACT';
        this.id = 0;
        this.agentId = 0;
        this.firstName = '';
        this.lastName = '';
        this.phone = '';
        this.mobile = '';
        this.fax = '';
        this.email = '';
        this.notes = '';
        this.contactType = '';
        this.companyId = 0;
        this.contactCategoryId = 0;
        this.conversations = [];
        this.interviews = [];
        this.positions = [];
    }

    contactService.factory = function () {
        this.createContact = function () {
            return new contact();
        }
    }

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