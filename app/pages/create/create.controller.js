angular
    .module('app', [])
    .controller('CreateController', CreateController);

/** @ngInject */
function CreateController($scope, $http, $timeout, $httpParamSerializerJQLike) {
    var vm = this;

    $scope.invoiceTable = [{
        Description:"Test",
        Discount:"10%",
        Id:"1",
        Price:"100$",
        Qty:"1 month",
        Tax:"2%",
        Total:"100"
    }
    ];

    var url = 'https://dev.officient.dk/companies';

   $http({
            method: 'GET',
            url: url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            responseType: "json",
            data: $httpParamSerializerJQLike({ password: $scope.password }),
        }).success(function (req) {
            console.log(angular.fromJson(req))
            $scope.companies = angular.fromJson(req);
            $scope.companiesSelected = $scope.companies;
            
        }).error(function (params) {
            console.log(params)
        });

    // $scope.companies = [{ "_id": 1, "objecttype": "Officient\\FrontEnd\\Company", "name": "The Big Company", "companyidents": { "CVR": "12321232" }, "primaryemail": "ak@nemportal.dk" }, { "_id": 2, "objecttype": "Officient\\FrontEnd\\Company", "name": "EHFPortal.no A\/S", "companyidents": { "CVR": "NO876543210", "EAN": "5790008886541" }, "primaryemail": "mb@officient.dk" }, { "_id": 3, "objecttype": "Officient\\FrontEnd\\Company", "name": "IBM", "companyidents": { "EAN": "6559874400012" }, "primaryemail": "jb@ehfportal.no" }, { "_id": 4, "objecttype": "Officient\\FrontEnd\\Company", "name": "Company #3", "companyidents": { "CVR": "55446622" }, "primaryemail": "ak@ehfportal.no" }]

    $scope.companySelectShow = false;

    $scope.companySelect = function (company) {
        $scope.company = company.name;
        $scope.companySelectShow = false;
    };

    $scope.companyBlur = function () {
        $timeout(function () {
            $scope.companySelectShow = false;
        }, 100);
    };

    $scope.companySelectChange = function () {
        $scope.companySelectShow = true;
        if (!$scope.company)
            $scope.company = "";
        var companies = $scope.companies;
        var companiesSelected = [];
        for (var key in companies) {
            if (companies.hasOwnProperty(key)) {
                var element = companies[key];
                var companyLower = $scope.company.toLowerCase();
                var nameLower = element.name.toLowerCase();
                var hasCVR = false;

                if (element.companyidents.CVR) {
                    var cvrLower = element.companyidents.CVR.toLowerCase();
                    hasCVR = cvrLower.startsWith(companyLower);
                }
                if (nameLower.startsWith(companyLower) || hasCVR) {
                    companiesSelected.push(element);
                }
                if (companiesSelected.length || (!companiesSelected.length && $scope.company))
                    $scope.companiesSelected = companiesSelected;
                else
                    $scope.companiesSelected = $scope.companies;

            }
        }
    };

    $scope.invoiceAddToTable = function () {
        $scope.invoiceTable.push($scope.invoiceNewObject);
        $scope.showInvoiceTable = false;
        $scope.invoiceNewObject = {};
    };
    
    $scope.deletedInvoce = function(id){
        $scope.invoiceTable.splice(id, 1);
    };
    
    $scope.editInvoce = function(id){
        $scope.showInvoiceTable = true;
        $scope.invoiceNewObject = $scope.invoiceTable[id];
        $scope.invoiceTable.splice(id, 1);
    };

}
