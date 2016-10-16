var peopleSearch = angular.module('PeopleSearchApp', []);

peopleSearch.controller('PeopleCtrl', function PeopleController($scope) {

});

peopleSearch.factory('PeopleService', ['$http', function($http){
    var ServiceResult = {};

    ServiceResult.getPeople = function () {
        return $http.get('/Home/GetPeople');
    };
    return ServiceResult;

}]);