var peopleSearch = angular.module('app', ['naif.base64']);


peopleSearch.controller('PeopleCtrl', function PeopleController($scope, $http, PeopleService) {

    $scope.timeout = 1000;
    $scope.checked = false;
    $scope.stateChanged = function (form) {
        console.log("here");
        if($scope.checked == false)
        {
            $scope.checked == true;
            $scope.timeout = 0;
           
        }

        else {
            $scope.timeout = 1000;
            
        }

        console.log($scope.timeout);
    };
    $scope.myVar = false;
    $scope.addShow = function(){
        $scope.myVar = !$scope.myVar;
       console.log($scope.file.base64);
    };

    $scope.addToDB = function () {
        var dataObj = {
            image: $scope.file.base64,
            FirstName: $scope.firstname,
            LastName: $scope.lastname,
            age: $scope.age,
            address: $scope.address,
            interests: $scope.interests
        };
        console.log(dataObj);

        $http.post("Home/PostPerson", dataObj).success(function (data) {
            Alert(ok)
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