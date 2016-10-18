var peopleSearch = angular.module('app', ['naif.base64']);


peopleSearch.controller('PeopleCtrl', function PeopleController($scope, $http, $interval, $timeout, PeopleService) {


    //Slow Search
    $scope.searchText = "Searching...";
    $scope.timeout = 5000;


    //Show add person
    $scope.myVar = false;
    $scope.addShow = function(){
        $scope.myVar = !$scope.myVar;
    };

    //Send new person to db
    $scope.addToDB = function () {
        var dataObj = {
            image: $scope.file.base64,
            FirstName: $scope.firstname,
            LastName: $scope.lastname,
            age: $scope.age,
            address: $scope.address,
            interests: $scope.interests
        };

        $http.post("Home/PostPerson", dataObj).success(function (data) {
        })

        $scope.people.unshift(dataObj);

    };


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
    $scope.query = '';
    $scope.queryBy = 'FirstName';

   
    //Query the database
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


  //Get the search results 
    $scope.search = function(user) {
        console.log("here");
        var query = $scope.query.toLowerCase(),
        fullname = user.FirstName.toLowerCase() + ' ' + user.LastName.toLowerCase();

        if (fullname.indexOf(query) != -1) {
            return true;
        }
        return false;
    };



});

//People service
peopleSearch.factory('PeopleService', ['$http', function($http){
    var ServiceResult = {};
    ServiceResult.getPeople = function () {
        return $http.get('/Home/GetPeople');
    };
    return ServiceResult;

}]);