angular
        .module('app', [])
        .controller('LoginController', LoginController);

/** @ngInject */
function LoginController($scope, $http, $httpParamSerializerJQLike) {
    var vm = this;
    console.log($("#checkbox-signup"))

    $scope.submit = function () {
        var url = 'http://dev.officient.dk/lara/public/api/auth/login';

        $http({
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            responseType: "json",
            data: $httpParamSerializerJQLike({password: $scope.password, email: $scope.username}),
        }).success(function (req) {
            var obj = angular.fromJson(req);
            if (obj.status)
                $http({
                    method: 'GET',
                    url: 'http://dev.officient.dk/lara/public/api/auth/user',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    responseType: "json",
                }).success(function (req) {
                    var user = angular.fromJson(req);
                    $.cookie.json = true;
                    $.cookie('user', user, { expiry: 0, domain: '', path: '' });
                    if (user)
                        window.location.href = 'http://dev.officient.dk/create.html';

                });


            //window.location.href = 'http://192.168.1.118:8081/create.html';
        });

    };

}
