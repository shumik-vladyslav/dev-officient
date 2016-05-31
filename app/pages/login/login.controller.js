angular
    .module('app', [])
    .controller('LoginController', LoginController);

 /** @ngInject */
function LoginController($scope, $http, $httpParamSerializerJQLike) {
     var vm = this;
     
     $scope.submit = function () {
         console.log($scope.username)
         console.log($scope.password)
         console.log(JSON.stringify({password: $scope.password}))
         console.log('{"password": "$scope.password}"')
         var url = 'https://secret-bayou-62805.herokuapp.com/users/'+ $scope.username +'/login';
         
         $http({
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              responseType: "json",
            //  async: false,
            // transformRequest: function(obj) {
            //     var str = [];
            //     for(var p in obj)
            //     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            //     return str.join("&");
            // },
            data: $httpParamSerializerJQLike({password: $scope.password}),
        }).success(function (req,o,b) {
            console.log(req,o,b)
        });
    //      $.ajax({
    //   type: "POST",
    //   url: url,
    //   data: {password: $scope.password},
    //   dataType: "json",
    //   success: function(data) {
    //       //alert(data);
    //       if (data.msg != null) {
    //           alert(data.msg);
    //       } else {
    //         if (mode == 1) {
    //             document.getElementById('createLoadGen').innerHTML = 'creating loadGen...';
    //             setTimeout(checkStatus, 1000);
    //         }
    //       }
    //   }
    // });
     };
    
}
