var peopleSearch = angular.module('app', []);

peopleSearch.controller('PeopleCtrl', function PeopleController($scope, PeopleService) {

    $scope.options =
    [
        {
            "id": "FirstName",
            "value": "First Name"
        },
        {
            "id": "LastName",
            "value": "Last Name"
        },
        {
            "id": "age",
            "value": "Age"
        },         
    ];
    $scope.message = "hello";
    $scope.query = {};
    $scope.queryBy = 'FirstName';
    
    getPeople();
    function getPeople() {
        PeopleService.getPeople()
            .success(function (result) {
                $scope.people = result;
                console.log($scope.people);
            })
            .error(function (error) {
                $scope.status = 'Fail ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.query = '';

    $scope.search = function (user) {
        var query = $scope.query.toLowerCase(),
        fullname = user.FirstName.toLowerCase() + ' ' + user.LastName.toLowerCase();

        if (fullname.indexOf(query) != -1) {
            return true;
        }
        return false;
    };

});

peopleSearch.factory('PeopleService', ['$http', function($http){
    var ServiceResult = {};
    ServiceResult.getPeople = function () {
        return $http.get('/Home/GetPeople');
    };
    return ServiceResult;

}]);