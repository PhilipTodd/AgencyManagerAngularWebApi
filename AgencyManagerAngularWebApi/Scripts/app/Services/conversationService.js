agencyManager.service('conversationService', ['$http', '$q', function ($http, $q) {

    var conversationService = {};

    conversationService.newConversation = function (contactId) {
        var newitem = {
            id: 0,
            time: new Date(),
            notes: '',
            contactId: contactId,
        }

        return newitem;
    }

    conversationService.getAll = function () {
        return $http.get('/api/conversation');
    }

    conversationService.getFiltered = function (criteria) {
        return $http.get('/api/conversation', { params: criteria })
    }

    conversationService.save = function (item) {
        return $http.post('/api/conversation', item);
    }

    conversationService.delete = function (id) {
        return $http.delete('/api/conversation/' + id);
    }

    return conversationService;

}]);