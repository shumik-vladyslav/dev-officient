angular
    .module('app', [])
    .controller('LoginController', LoginController);

/** @ngInject */
function LoginController($scope, $http, $httpParamSerializerJQLike) {
    var vm = this;
        console.log($( "#checkbox-signup" ))

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
            var user = angular.fromJson(req);
            console.log(user);
            user.loginName = $scope.username;
            $.cookie.json = true;
            $.cookie('user', user);

            if (user.userID)
                window.location.href = 'http://dev.officient.dk/create.html';
                 //window.location.href = 'http://192.168.1.118:8081/create.html';
        });

    };

}
