angular
        .module('app', ['ngMaterial', 'md.data.table'])
        .controller('CreateController', CreateController);

/** @ngInject */
function CreateController($scope, $http, $timeout, $httpParamSerializerJQLike) {
    var vm = this;

    $scope.invoiceTable = [
//                 {
//            description: "Test",
//            discount: 10,
//            price: 100,
//            quantity: "1 month",
//            tax: 2,
//            Total: "100"
//        }
    ];
    $scope.invoiceChange = function () {
        $scope.invoiceNewObject.Total = $scope.invoiceNewObject.price * $scope.invoiceNewObject.quantity;
        if ($scope.invoiceNewObject.discount)
            $scope.invoiceNewObject.disTotal = (($scope.invoiceNewObject.Total * $scope.invoiceNewObject.discount / 100));
        if ($scope.invoiceNewObject.disTotal) {
            $scope.invoiceNewObject.subTotal = ($scope.invoiceNewObject.Total - $scope.invoiceNewObject.disTotal);
            $scope.invoiceNewObject.Total = $scope.invoiceNewObject.subTotal;
        }
        if ($scope.invoiceNewObject.tax)
            $scope.invoiceNewObject.taxTotal = ($scope.invoiceNewObject.subTotal * (($scope.invoiceNewObject.tax * 100) / 10000));
        if ($scope.invoiceNewObject.subTotal || $scope.invoiceNewObject.taxTotal)
            $scope.invoiceNewObject.Total = $scope.invoiceNewObject.subTotal + $scope.invoiceNewObject.taxTotal;
        $scope.invoiceNewObject.Total = $scope.invoiceNewObject.Total.toFixed(2);

    }
    $scope.invoiceSumm = {
        Discout: 0,
        Subtotal: 0,
        Tax: 0,
        Total: 0,
    }

    $scope.valuesCur = {currenciesGetValue: ""};
    $scope.currenciesGet = function (id) {
        for (var item in $scope.currencies) {
            if ($scope.currencies[item].id === +id) {
                console.log($scope.currencies[item].code)
                $scope.valuesCur.currenciesGetValue = $scope.currencies[item].code;
            }
        }
    }
    $scope.invoiceNewObject = {
        description: "",
        discount: 0,
        price: 0,
        quantity: 0,
        tax: 0,
        Total: "0",
        disTotal: 0,
        subTotal: 0, taxTotal: 0
    };
    $scope.invoice = {};
    $scope.invoice.Invoice = {};
    $scope.hasCreate = false;
    $scope.invoices = [];

    $scope.user = JSON.parse($.cookie('user'));
    console.log($scope.user)
    var url = 'http://dev.officient.dk/lara/public/api/';
    $http({
        method: 'GET',
        url: url + "lib/companies",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        responseType: "json"
    }).success(function (req) {
        $scope.companies = req;
        var obj = angular.fromJson(req);
    });
    function getInvoice() {
        $http({
            method: 'GET',
            url: url + "invoice",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            responseType: "json"
        }).success(function (req) {
            var obj = angular.fromJson(req);

            for (o in obj) {
                obj[o].invoice_dt = new Date(obj[o].invoice_dt);
                obj[o].total = +obj[o].total;

            }
            $scope.invoices = obj;
            console.log(obj)
        })
                .error(function () {
                    window.location.href = 'http://dev.officient.dk/login.html';

                });
    }
    $http({
        method: 'GET',
        url: url + "lib/currencies",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        responseType: "json"
    }).success(function (req) {
        $scope.currencies = req;
        var obj = angular.fromJson(req);
    });

    $http({
        method: 'GET',
        url: url + "lib/countries",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        responseType: "json"
    }).success(function (req) {
        $scope.countries = req;
        var obj = angular.fromJson(req);
    });
    getInvoice();

    // $scope.companies = [{ "_id": 1, "objecttype": "Officient\\FrontEnd\\Company", "name": "The Big Company", "companyidents": { "CVR": "12321232" }, "primaryemail": "ak@nemportal.dk" }, { "_id": 2, "objecttype": "Officient\\FrontEnd\\Company", "name": "EHFPortal.no A\/S", "companyidents": { "CVR": "NO876543210", "EAN": "5790008886541" }, "primaryemail": "mb@officient.dk" }, { "_id": 3, "objecttype": "Officient\\FrontEnd\\Company", "name": "IBM", "companyidents": { "EAN": "6559874400012" }, "primaryemail": "jb@ehfportal.no" }, { "_id": 4, "objecttype": "Officient\\FrontEnd\\Company", "name": "Company #3", "companyidents": { "CVR": "55446622" }, "primaryemail": "ak@ehfportal.no" }]

    $scope.invoice.companySelectShow = false;

    $scope.invoice.company = "";

    $scope.hasXMLSource = false;

    $scope.configureApp = false;

    $scope.companySelect = function (company) {
        $scope.invoice.company = company.name;
        $scope.invoice.Invoice.company_to = company.id;
        $timeout(function () {
            $scope.invoice.companySelectShow = false;
        }, 100);
    };

    $scope.invoice.InvoiceFile = {notes: ""};

    $scope.createInvoice = function () {
        $scope.invoice.Invoice.invoice_dt = $("#datepicker-autoclose").val();
        $scope.invoice.Invoice.delivery_dt = $("#datepicker-autoclose2").val();

        $scope.invoice.InvoiceItem = $scope.invoiceTable;
        $scope.invoice.InvoiceFile.payment_dt = $("#datepicker-autoclose3").val();

        var user = angular.fromJson($.cookie('user'));
        $scope.invoice.Invoice.company_from = user.created_companies[0].id;
        console.log($scope.invoice)

        if ($scope.invoice.Invoice.invoice_dt && $scope.invoice.Invoice.delivery_dt) {
            $http({
                method: 'POST',
                url: url + "invoice",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                responseType: "json",
                data: $httpParamSerializerJQLike($scope.invoice),
            }).success(function (req) {
            });
        }
        setTimeout(function () {
            getInvoice();

        }, 3000)
//
        $scope.hasCreate = !$scope.hasCreate;
    };
    $scope.uploadFile = function (files) {
        console.log(files)
        var fd = new FormData();
        //Take the first selected file
        fd.append("file", files[0]);
        console.log(fd)
        $scope.invoice.InvoiceFile.file = files[0];

    }
    $scope.createSetFalse = function () {
        $scope.hasCreate = false;
        $scope.hasXMLSource = false;
    };

    $scope.XMLSourceSwap = function () {
        $scope.hasCreate = true;
        $scope.hasXMLSource = !$scope.hasXMLSource;
    };

    $scope.configureAppSwap = function () {
        $scope.configureApp = !$scope.configureApp;
    };

    $scope.companyBlur = function () {
        $timeout(function () {
            $scope.invoice.companySelectShow = false;
        }, 200);
    };

    $scope.toPDF = function () {

    };

    $scope.companyFocus = function () {
        $scope.invoice.companySelectShow = true;
        $scope.companySelectChange();
    };

    $scope.companySelectChange = function () {
        $scope.invoice.companySelectShow = true;
        if (!$scope.invoice.company)
            $scope.invoice.company = "";
        var companies = $scope.companies;
        var companiesSelected = [];
        for (var key in companies) {
            if (companies.hasOwnProperty(key)) {
                var element = companies[key];
                var companyLower = $scope.invoice.company.toLowerCase();
                var nameLower = element.name.toLowerCase();
                var hasCVR = false;

                if (element.regno) {
                    var cvrLower = element.regno.toLowerCase();
                    hasCVR = cvrLower.startsWith(companyLower);
                }
                if (nameLower.startsWith(companyLower) || hasCVR) {
                    companiesSelected.push(element);
                }
                if (companiesSelected.length || (!companiesSelected.length && $scope.invoice.company))
                    $scope.companiesSelected = companiesSelected;
                else
                    $scope.companiesSelected = $scope.companies;
                if ($scope.invoice.company === "") {
                    $scope.companiesSelected = $scope.companies;

                }
            }
        }

    };

    $scope.invoiceAddToTable = function () {
        $scope.invoiceTable.push($scope.invoiceNewObject);
        $scope.showInvoiceTable = false;
        $scope.invoiceSumm = {
            Discout: 0,
            Subtotal: 0,
            Tax: 0,
            Total: 0
        }
        for (var i = 0; i < $scope.invoiceTable.length; i++) {
            $scope.invoiceSumm.Subtotal += $scope.invoiceTable[i].subTotal;
            $scope.invoiceSumm.Discout += $scope.invoiceTable[i].disTotal;
            $scope.invoiceSumm.Tax += $scope.invoiceTable[i].taxTotal;
            $scope.invoiceSumm.Total += $scope.invoiceTable[i].Total;
        }
        $scope.invoiceNewObject = {
            description: "",
            discount: 0,
            price: 0,
            quantity: 0,
            tax: 0,
            Total: "0",
            disTotal: 0,
            subTotal: 0, taxTotal: 0
        };
    };

    $scope.deletedInvoce = function (id) {
        $scope.invoiceTable.splice(id, 1);
    };

    $scope.editInvoce = function (id) {
        $scope.showInvoiceTable = true;
        $scope.invoiceNewObject = $scope.invoiceTable[id];
        $scope.invoiceTable.splice(id, 1);
    };

    $scope.logOut = function () {
        // users/<username>/logout
        $.cookie.json = true;
        var user = $.cookie('user');
        $http({
            method: 'GET',
            url: 'http://dev.officient.dk/lara/public/api/auth/logout',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            responseType: "json",
        }).success(function (req) {
            $.removeCookie('user');

            window.location.href = 'http://dev.officient.dk/login.html';

        }).error(function (params) {
        });

    };
    $scope.selectModalObj = {};
    $scope.selectModal = function (index) {

        $http({
            method: 'GET',
            url: 'http://dev.officient.dk/lara/public/api/invoice/' + index,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            responseType: "json",
        }).success(function (req) {
            req.delivery_dt = new Date(req.delivery_dt);
            req.invoice_dt = new Date(req.invoice_dt);

            $scope.selectModalObj = req;
            console.log(req)
        }).error(function (params) {
        });
    }
    $scope.deleteInvoice = function (id) {
        $http({
            method: 'DELETE',
            url: 'http://dev.officient.dk/lara/public/api/invoice/' + id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            responseType: "json",
        }).success(function (req) {
            console.log(req)
            setTimeout(function () {
                getInvoice();

            }, 3000)
        }).error(function (params) {
        });
    }
    $scope.options = {
        rowSelection: true,
        multiSelect: true,
        autoSelect: true,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: false,
        limitSelect: true,
        pageSelect: true
    };

    $scope.query = {
        order: '',
        limit: 8,
        page: 1
    };
}
