//example of using a message handler from the inject scripts
//chrome.extension.onMessage.addListener(
//    function (request, sender, sendResponse) {
//        if (request.command === "createProduct") {
//            console.log('background.js: got CreateProduct message');
//            createProduct(request.ASIN, sendResponse);
//        }
//    });


function drawIcon(text) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, 19);
    context.lineTo(19, 19);
    context.lineTo(19, 0);
    context.lineTo(0, 0);
    context.closePath();
    context.lineWidth = 1;
    context.fillStyle = '#5555FF';
    context.fill();
    context.strokeStyle = '#775555';
    context.stroke();

    context.fillStyle = "black";
    context.font = "Bold 10px Arial";
    context.textAlign = 'center';
    context.fillText(text, 9, 14);

    var imageData = context.getImageData(0, 0, 19, 19);
    chrome.browserAction.setIcon({
        imageData: imageData
    });
}

drawIcon('sell');