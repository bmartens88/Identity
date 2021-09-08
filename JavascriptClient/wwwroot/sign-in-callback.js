var extractTokens = function (address) {
    var returnValue = address.split('#')[1];
    var values = returnValue.split('&');

    for (var index = 0; index < values.length; index++) {
        var v = values[index];
        var kvPair = v.split('=');
        localStorage.setItem(kvPair[0], kvPair[1]);
    }
    
    window.location.href = '/home/index';
}

extractTokens(window.location.href);