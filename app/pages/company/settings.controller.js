angular
    .module('app', ['ngMaterial'])
    .controller('CompanySettingsController', CompanySettingsController);

/** @ngInject */
function CompanySettingsController($scope, $http) {
    var vm = this;

    $scope.hasEditDetails = false;

    $scope.userNew = {};

    $scope.contactNew = {};

    $scope.userNewShow = false;

    $scope.contactNewShow = false;

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

    $scope.editDetails = function (value) {
        $scope.hasEditDetails = value;
    };

    $(document).ready(function () {
        // $('#users').DataTable();
        // $('#contact').DataTable();
    });
}
