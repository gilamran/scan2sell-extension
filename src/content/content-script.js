function mainWrapper() {

    function init() {
        cLog("init");
        chrome.extension.onMessage.addListener(
            function (request, sender, sendResponse) {
                if (request.command === "getASIN") {
                    console.log('content-script.js: got getASIN message');
                    var ASIN = getASIN();
                    console.log('content-script.js: Found ASIN:' + ASIN);
                    sendResponse(ASIN);
                }

                if (request.command === "createProduct") {
                    console.log('content-script.js: got CreateProduct message');
                    createProduct(request.ASIN, sendResponse);
                }
            });
    }

    function getASIN() {
        return document.querySelectorAll("input#ASIN")[0].value;
    }

    function notifyProductCreated(result) {
        chrome.runtime.sendMessage({command: "productCreated", result: result}, function (response) { });
    }

    function createProduct(ASIN, cb) {
        //$.get('http://localhost:5000/create-product', {barcode: 'XXX'})
        $.get('http://scan2sell-server.herokuapp.com/create-product', {barcode: ASIN})
            .done(function () {
                console.log('background.js: createProduct success');
                notifyProductCreated("create product success");
            })
            .fail(function () {
                notifyProductCreated("create product error");
            });
    }

    init();
}


function cLog(msg) {
    if (true)  // make true when on debug
        console.log(msg);
}

mainWrapper();