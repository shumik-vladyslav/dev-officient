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
        var url = 'http://dev.officient.dk/lara/public/api/auth/login';

        $http({
            method: 'POST',
            url: url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            responseType: "json",
            data: $httpParamSerializerJQLike({ password: $scope.password, email: $scope.username }),
        }).success(function (req) {
            var user = angular.fromJson(req);
            $http({
            method: 'GET',
            url: 'http://dev.officient.dk/lara/public/api/auth/user',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            responseType: "json",
        }).success(function (req) {
            var user = angular.fromJson(req);
            console.log(23);
            console.log(user);
           
        });
            console.log(user);
            user.loginName = $scope.username;
            $.cookie.json = true;
            $.cookie('user', user);

            //if (user.userID)
               // window.location.href = 'http://dev.officient.dk/create.html';
                //window.location.href = 'http://192.168.1.118:8081/create.html';
        });

    };

}
