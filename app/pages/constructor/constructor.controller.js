angular
    .module('app', ['ngMaterial'])
    .controller('ConstructorController', ConstructorController);

/** @ngInject */
function ConstructorController($scope, $http) {
    var vm = this;
    $scope.bundleFlags = {
        importer: false,
        firewall: false,
        logo: false,
        type: false
    };

    $scope.bundleCost = {
        importer: 4.95,
        firewall: 6.95,
        logo: 19.95,
        type: 6.95
    };

    $scope.invoicePerMontheObj = {
        "4.95": 10,
        "9.95": 20,
        "19.95": 50
    };

    $scope.invoicePerMontheFlag = {
        "4.95": false,
        "9.95": false,
        "19.95": false
    };

    $scope.order = 0;

    $scope.invoicesPerMonthChange = function () {
        console.log($scope.invoicesPerMonth)
        for (var key in $scope.invoicePerMontheFlag) {
            if ($scope.invoicePerMontheFlag.hasOwnProperty(key)) {
                var element = $scope.invoicePerMontheFlag[key];
                console.log(key, element)
                if (element) {
                    $scope.order = ($scope.order * 100 - (+key) * 100) / 100;
                    $scope.invoicePerMontheFlag[key] = false;
                }
            }
        }
        $scope.invoicePerMontheFlag[$scope.invoicesPerMonth] = true;
        $scope.order = ($scope.order * 100 + (+$scope.invoicesPerMonth) * 100) / 100;

    };

    $scope.bundleSwap = function (key, value) {
        console.log(key, value)
        $scope.bundleFlags[key] = value;

        if (value)
            $scope.order = ($scope.order * 100 + $scope.bundleCost[key] * 100) / 100;
        else
            $scope.order = ($scope.order * 100 - $scope.bundleCost[key] * 100) / 100;


    };
}
