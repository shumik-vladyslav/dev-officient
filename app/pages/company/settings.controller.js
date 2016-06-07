angular
    .module('app', ['ngMaterial'])
    .controller('CompanySettingsController', CompanySettingsController);

/** @ngInject */
function CompanySettingsController($scope, $http) {
    var vm = this;

    $scope.hasEditDetails = false;

    $scope.userNew = {};

    $scope.contactNew = {};

    $scope.packageNew = {};

    $scope.paymentNew = {};

    $scope.userNewShow = false;

    $scope.contactNewShow = false;

    $scope.packageNewShow = false;

    $scope.paymentNewShow = false;

    $scope.companyDetails = {
        name: "Officient",
        CVR: 67123474554,
        phone: "+1-555-345-65-09",
        address: "2130 Drive Park Lane, New Yorkm NY, USA",
        postal: "10012"
    };

    $scope.contractPersonDetails = {
        firstName: "Morten",
        lastName: "Boas",
        phone: "+1-555-345-65-09",
        mail: "mdoas@officient.com",
    };

    $scope.users = [
        {
            id: 1,
            fullName: "Morten Boas",
            userName: "mboas@officient.dk",
            userType: "User Level 1"
        },
        {
            id: 2,
            fullName: "Johanny Kartakov",
            userName: "iamjohhan@gmail.com",
            userType: "Admin"
        },
        {
            id: 3,
            fullName: "Kirill Zima",
            userName: "desginer@gmail.com",
            userType: "User Level 2"
        }
    ];

    $scope.contacts = [
        {
            id: 1,
            fullName: "Morten Boas",
            company: "mboas",
        },
        {
            id: 2,
            fullName: "Johanny Kartakov",
            company: "iamjohhan",
        },
        {
            id: 3,
            fullName: "Kirill Zima",
            company: "desginer",
        }
    ];

    $scope.packages = [
        {
            id: 1,
            name: "package 1",
            status: "done",
            type: "cargo",
        },
        {
            id: 2,
            name: "package 2",
            status: "wait",
            type: "cargo",
        },
        {
            id: 3,
            name: "package 3",
            status: "done",
            type: "cargo",
        }
    ];

    $scope.payments = [
        {
            id: 1,
            name: "payment 1",
            status: "done",
            price: "30$",
        },
        {
            id: 2,
            name: "payment 2",
            status: "wait",
            price: "20$",
        },
        {
            id: 3,
            name: "payment 3",
            status: "done",
            price: "10$",
        }
    ];

    $scope.userActivity = function (id) {
        for (var key in $scope.users) {
            if ($scope.users.hasOwnProperty(key)) {
                var element = $scope.users[key];
                if (element.id === id) {
                    $scope.userActivitySelect = element;
                }
            }
        }
    };

    $scope.contactHistory = function (id) {
        for (var key in $scope.contacts) {
            if ($scope.contacts.hasOwnProperty(key)) {
                var element = $scope.contacts[key];
                if (element.id === id) {
                    $scope.contacActivitySelect = element;
                }
            }
        }
    };

    $scope.userEdit = function (id, index) {
        $scope.userEditFlag = index;
    };

    $scope.contactEdit = function (id, index) {
        $scope.contactEditFlag = index;
    };

    $scope.packageEdit = function (id, index) {
        $scope.packageEditFlag = index;
    };

    $scope.paymentEdit = function (id, index) {
        $scope.paymentEditFlag = index;
    };

    $scope.userAdd = function (value) {
        $scope.userNewShow = value;
        if (!value) {
            $scope.users.push($scope.userNew);
            $scope.userNew = {};
        }
    };

    $scope.contactAdd = function (value) {
        $scope.contactNewShow = value;
        if (!value) {
            $scope.contacts.push($scope.contactNew);
            $scope.contactNew = {};
        }
    };

    $scope.packageAdd = function (value) {
        $scope.packageNewShow = value;
        if (!value) {
            $scope.packages.push($scope.packageNew);
            $scope.packageNew = {};
        }
    };

    $scope.paymentAdd = function (value) {
        $scope.paymentNewShow = value;
        if (!value) {
            $scope.payments.push($scope.paymentNew);
            $scope.paymentNew = {};
        }
    };

    $scope.userRemove = function (id) {
        for (var key in $scope.users) {
            if ($scope.users.hasOwnProperty(key)) {
                var element = $scope.users[key];
                if (element.id === id) {
                    $scope.users.splice(key, 1);
                }
            }
        }
    };

    $scope.contactRemove = function (id) {
        for (var key in $scope.contacts) {
            if ($scope.contacts.hasOwnProperty(key)) {
                var element = $scope.contacts[key];
                if (element.id === id) {
                    $scope.contacts.splice($scope.contacts.indexOf(element), 1);
                }
            }
        }
    };

    $scope.packageRemove = function (id) {
        for (var key in $scope.packages) {
            if ($scope.packages.hasOwnProperty(key)) {
                var element = $scope.packages[key];
                if (element.id === id) {
                    $scope.packages.splice($scope.packages.indexOf(element), 1);
                }
            }
        }
    };

    $scope.paymentRemove = function (id) {
        for (var key in $scope.payments) {
            if ($scope.payments.hasOwnProperty(key)) {
                var element = $scope.payments[key];
                if (element.id === id) {
                    $scope.payments.splice($scope.payments.indexOf(element), 1);
                }
            }
        }
    };

    $scope.editDetails = function (value) {
        $scope.hasEditDetails = value;
    };

    $scope.backToAccount = function () {
        console.log(23)
        window.location.href = 'http://dev.officient.dk/create.html';
    };

    $(document).ready(function () {
        // $('#users').DataTable();
        // $('#contact').DataTable();
    });
}
