angular
    .module('app', ['ngMaterial'])
    .controller('ThankController', ThankController);

/** @ngInject */
function ThankController($scope, $http) {
    var vm = this;


    $scope.billing = [
        {
            head: '50 invoices per month',
            subtitle: ['You have an allowance of 50 invoices per 30 days.', 'When you are out of prepaid invoices you can always buy more.']
        },
        {
            head: 'Invoice Importar',
            subtitle: ['Automatic fill from PDF, XLS, TXT and other fromats.', 'Great choise for small and big business.']
        },
    ];
    $scope.card = [
        {
            name: 'Your Logo',
            cost: '$19.95',
            costsub: 'one-time',
            sub: 'Your company`s logo instead of Officient logo. Forever. Ridiculoously cheap.'
        },
        {
            name: 'Invoice Importar',
            cost: '$4.95',
            costsub: '/ mo',
            sub: 'Automatic fill from PDF, XLS, TXT and other formats. Hreat choise for small and big business.'
        },
        {
            name: 'Easy Type',
            cost: '$6.95',
            costsub: '/ mo',
            sub: 'Never again you will need to type your invoices. With EasyType you can clone invoices and only change what you need!'
        },
        {
            name: 'Invoice Firewall',
            cost: '$6.95',
            costsub: '/ mo',
            sub: 'Don`t worry about security. Invoice Firewall will make sure all your data is absolutely safe.'
        }
    ];
}
