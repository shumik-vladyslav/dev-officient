angular
    .module('app', ['ngMaterial'])
    .controller('BillingController', BillingController);

/** @ngInject */
function BillingController($scope, $http) {
    var vm = this;


    $scope.billing = [
        {
            name: '50 invoices per month',
            cost: '$19.95'
        },
        {
            name: 'Invoice Importar',
            cost: '$4.95'
        },
    ];

 

}
