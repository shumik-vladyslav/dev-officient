angular
    .module('app', ['ngMaterial'])
    .controller('IndexController', IndexController);

/** @ngInject */
function IndexController($scope) {
    var vm = this;
   $scope.logIn = function(){
        window.location.href = 'http://dev.officient.dk/login.html';

   }
}
