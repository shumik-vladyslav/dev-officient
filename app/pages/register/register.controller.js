angular
        .module('app', [])
        .controller('RegisterController', RegisterController);

/** @ngInject */
function RegisterController($scope, $http, $httpParamSerializerJQLike) {
    var vm = this;
    $scope.obj = {};
    $scope.obj.salutation = "Mr.";

    $scope.submit = function () {
        var url = 'http://dev.officient.dk/lara/public/api/auth/create';
        console.log($scope.obj)
        $http({
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            responseType: "json",
            data: $httpParamSerializerJQLike($scope.obj),
        }).success(function (req) {
            console.log(req)
            var obj = angular.fromJson(req);
            if (obj.status)
                window.location.href = 'http://dev.officient.dk/login.html';


            //window.location.href = 'http://192.168.1.118:8081/create.html';
        });

    };

}
