angular
        .module('app', ['ngMaterial', 'md.data.table', 'flow'])
        .controller('CreateController', CreateController)
        .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
            $scope.close = function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav('right').close()
                        .then(function () {
                            $log.debug("close RIGHT is done");
                        });
            };
        });

/** @ngInject */
function CreateController($scope, $http, $timeout, $httpParamSerializerJQLike, $mdDialog, $mdMedia,$mdSidenav, $log) {
    var vm = this;
    $scope.$on('flow::fileAdded', function (event, $flow, flowFile) {
        console.log(event, $flow, flowFile)
    });
    $scope.invoiceTable = [];
    $scope.invoice = {};
    $scope.invoice.Invoice = {};
    $scope.invoice.Invoice.logo = "";
    $scope.invoice.InvoiceFile = {notes: "", files: []};

    $scope.invoiceType = ["Invoice", "Credit Note"];
    $scope.hasCreate = false;
    $scope.invoices = [];
    $scope.user = JSON.parse($.cookie('user'));
    console.log($scope.user)
    var url = 'http://dev.officient.dk/lara/public/api/';
    $scope.selectDiscFunc = function (select) {
        $scope.invoiceChange();
    }
    $scope.invoiceChange = function () {
        $scope.invoiceNewObject.Total = $scope.invoiceNewObject.price * $scope.invoiceNewObject.quantity;
        if ($scope.invoiceNewObject.discount && $scope.disc.discValue === "%")
            $scope.invoiceNewObject.disTotal = (($scope.invoiceNewObject.Total * $scope.invoiceNewObject.discount / 100));
        if ($scope.invoiceNewObject.discount && $scope.disc.discValue !== "%")
            $scope.invoiceNewObject.disTotal = $scope.invoiceNewObject.discount;
        if ($scope.invoiceNewObject.disTotal) {
            $scope.invoiceNewObject.subTotal = ($scope.invoiceNewObject.Total - $scope.invoiceNewObject.disTotal);
            $scope.invoiceNewObject.Total = $scope.invoiceNewObject.subTotal;
        }
        if ($scope.invoiceNewObject.tax)
            $scope.invoiceNewObject.taxTotal = ($scope.invoiceNewObject.subTotal * (($scope.invoiceNewObject.tax * 100) / 10000));
        if ($scope.invoiceNewObject.subTotal || $scope.invoiceNewObject.taxTotal)
            $scope.invoiceNewObject.Total = $scope.invoiceNewObject.subTotal + $scope.invoiceNewObject.taxTotal;
        if ($scope.invoiceNewObject.Total && $scope.invoiceNewObject.vatRates) {
            for (var key in $scope.invoiceNewObject.vatRatesArr) {
                if ($scope.invoiceNewObject.vatRatesArr[key].id === +$scope.invoiceNewObject.vatRates) {
                    $scope.invoiceNewObject.Total += $scope.invoiceNewObject.Total * $scope.invoiceNewObject.vatRatesArr[key].rate / 100;
                }
            }
        }
        if ($scope.invoiceNewObject.taxTotal) {
            $scope.invoiceNewObject.taxTotal = $scope.invoiceNewObject.taxTotal.toFixed(2);
        }
        $scope.invoiceNewObject.Total = $scope.invoiceNewObject.Total.toFixed(2);
    }
    $scope.invoiceSumm = {
        Discout: 0,
        Subtotal: 0,
        Tax: 0,
        Total: 0,
        invoiceSumm: "Proc"
    }

    $scope.valuesCur = {currenciesGetValue: ""};
    $scope.currenciesGet = function (id) {

        for (var item in $scope.currencies) {
            if ($scope.currencies[item].id === +id) {
                $scope.valuesCur.currenciesGetValue = $scope.currencies[item].code;
            }
        }
    }
    $scope.countryChange = function (id, name) {
        for (var item in $scope.countries) {
            if ($scope.countries[item].id === +$scope.invoice.Invoice.country_id) {
                for (var key in $scope.currencies) {
                    if ($scope.currencies[key].country.name === $scope.countries[item].name) {
                        $scope.invoice.Invoice.currency_id = $scope.currencies[key].id.toString();
                        for (var key2 in $scope.currencies) {
                            if ($scope.currencies[key2].id === +$scope.invoice.Invoice.currency_id) {
                                $scope.valuesCur.currenciesGetValue = $scope.currencies[key2].code;
                            }
                        }
                    }
                }
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
        subTotal: 0,
        taxTotal: 0,
        selectDisc: "Proc",
        vatRates: "",
        vatRatesArr: ["NO"]
    };

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
        console.log(company, $scope.user.created_companies[0].primary_contact_id)
        if (company.country_id === $scope.user.created_companies[0].country_id) {
            $http({
                method: 'GET',
                url: url + "lib/countries/" + company.country_id,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                responseType: "json"
            }).success(function (req) {
                if (req.vat_rates) {

                    $scope.invoiceNewObject.vatRatesArr = req.vat_rates;
                    $scope.invoiceNewObject.vatRates = $scope.invoiceNewObject.vatRatesArr[0].id.toString();
                } else {
                    $scope.invoiceNewObject.vatRates = "";
                    $scope.invoiceNewObject.vatRatesArr = ["NO"];
                }
            });
        }
        $scope.invoice.company = company.name;
        $scope.invoice.Invoice.company_to = company.id;
        $timeout(function () {
            $scope.invoice.companySelectShow = false;
        }, 100);
    };
    $scope.vatChange = function () {
        $scope.invoiceChange();
    }

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
    $scope.invoiceSummTotal = function () {
        $scope.invoiceSumm = {
            Discout: 0,
            Subtotal: 0,
            Tax: 0,
            Total: 0,
            invoiceSumm: $scope.invoiceSumm.invoiceSumm
        }
        for (var i = 0; i < $scope.invoiceTable.length; i++) {
            $scope.invoiceSumm.Subtotal += $scope.invoiceTable[i].subTotal;
            $scope.invoiceSumm.Discout += $scope.invoiceTable[i].disTotal;
            $scope.invoiceSumm.Tax += $scope.invoiceTable[i].taxTotal;
            $scope.invoiceSumm.Total += $scope.invoiceTable[i].Total;
        }
    }

    $scope.invoiceAddToTable = function () {
        $scope.invoiceTable.push($scope.invoiceNewObject);
        $scope.showInvoiceTable = false;
        $scope.invoiceSumm = {
            Discout: 0,
            Subtotal: 0,
            Tax: 0,
            Total: 0,
            invoiceSumm: $scope.invoiceSumm.invoiceSumm
        }
        for (var i = 0; i < $scope.invoiceTable.length; i++) {
            $scope.invoiceSumm.Subtotal += $scope.invoiceTable[i].subTotal;
            $scope.invoiceSumm.Discout += $scope.invoiceTable[i].disTotal;
            $scope.invoiceSumm.Tax += +$scope.invoiceTable[i].taxTotal;
            $scope.invoiceSumm.Total += +$scope.invoiceTable[i].Total;
        }
        $scope.invoiceNewObject = {
            description: "",
            discount: 0,
            price: 0,
            quantity: 0,
            tax: 0,
            Total: "0",
            disTotal: 0,
            subTotal: 0,
            taxTotal: 0,
            selectDisc: "Proc",
            vatRates: ""
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
            setTimeout(function () {
                getInvoice();
            }, 3000)
        }).error(function (params) {
        });
    }
    $scope.disc = {};
    $scope.disc.discValue = "%";
    $scope.disc.discShow = false;
    $scope.discSelect = function (select) {
        $scope.disc.discValue = select;
        $scope.disc.discShow = false;
        $scope.invoiceChange();
    }
    $scope.someHandlerMethod = function ($file, $message, $flow) {
        console.log($file, $message, $flow);
        $scope.invoice.Invoice.logo = $message;
    }
    $scope.someHandlerMethodAll = function ($file, $message, $flow) {
        console.log($file, $message, $flow);
        console.log($scope.invoice.InvoiceFile);

        $scope.invoice.InvoiceFile.files.push($message);
    }
    $scope.deleteInvoiceFile = function (index) {
        $scope.invoice.InvoiceFile.files.splice(index, 1);
    }
    $scope.showAdvanced = function (ev) {
        $scope.status = '  ';
        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        console.log(23232)
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/app/pages/create/dialog1.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
        })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });

    };
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

    $scope.selectPro = function () {
        if ($('#wrapper').width() < 600) {
            console.log($('#wrapper').width())

            $('md-tab-item[aria-controls="tab-content-5"]').css("left", "0");
            ;
        }
    }
    setTimeout(function () {
        console.log($('md-tab-item[aria-controls="tab-content-5"]'))
        $('md-tab-item[aria-controls="tab-content-5"]').addClass("content-5");
        $('md-tabs-canvas').append("<div class='message-number-documents'>1</div>");
        $('md-tabs-canvas').append("<div class='message-number-messages'>33</div>");


    }, 3000);

    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function () {
        return $mdSidenav('right').isOpen();
    };
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
        var timer;
        return function debounced() {
            var context = $scope,
                    args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function () {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
        return debounce(function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
        }, 200);
    }
    function buildToggler(navID) {
        return function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
        }
    }
}

