angular.module('popupApp').controller('popupMainController', function ($rootScope, $http) {
    this.currentASIN = "No ASIN";
    this.createStatus = "No Status";
    this.status = 'none';

    chrome.extension.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.command === "productCreated") {
                console.log('popupController.js: productCreated ' + request.result);
                this.createStatus = request.result;
                this.status = 'done';
                $rootScope.$digest();
                sendResponse();
            }
        }.bind(this));

    this.getASIN = function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {command: "getASIN"}, function (response) {
                console.log('popupController.js: getASIN returned ' + response);
                this.currentASIN = response;
                $rootScope.$digest();
            }.bind(this));
        }.bind(this));
    };

    this.sellProductClicked = function () {
        this.sellProduct(this.currentASIN);
    };


    this.sellProduct = function (ASIN) {
        this.status = 'loading';
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {command: "createProduct", ASIN:ASIN}, function (response) { });
        });
    };

    this.getASIN();
});

