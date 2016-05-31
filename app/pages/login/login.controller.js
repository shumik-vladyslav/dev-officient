angular
    .module('app', [])
    .controller('LoginController', LoginController);

/** @ngInject */
function LoginController($scope, $http, $httpParamSerializerJQLike) {
    var vm = this;

    $scope.submit = function () {
        console.log($scope.username)
        console.log($scope.password)
        console.log(JSON.stringify({ password: $scope.password }))
        console.log('{"password": "$scope.password}"')
        var url = 'https://dev.officient.dk/users/' + $scope.username + '/login';

        $http({
            method: 'POST',
            url: url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            responseType: "json",
            data: $httpParamSerializerJQLike({ password: $scope.password }),
        }).success(function (req) {
            console.log(angular.fromJson(req))
            if (angular.fromJson(req).userID)
                window.location.href = 'http://dev.officient.dk/create.html';
                // window.location.href = 'file:///c%3A/Users/VladyslavShumik/Documents/dev-off/create.html';
        });

    };

}
