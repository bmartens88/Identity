var createState = function () {
    return "SessionValueMakeItABitLongeradflkajdf;akjdf;kldsjfa;lkjdgiupqteqwrnnmb";
}

var createNonce = function () {
    return "NonceValuezcvbcxzljhgeqrouiysdalfjksfha;jkdfhadjlkhljg";
}

var signIn = function () {
    var redirectUri = encodeURIComponent("https://localhost:5001/Home/SignIn");
    var responseType = encodeURIComponent("id_token token");
    var scope = encodeURIComponent("openid ApiOne");
    var authUrl =
        "/connect/authorize/callback" +
        "?client_id=client_id_js" +
        "&redirect_uri=" + redirectUri +
        "&response_type=" + responseType +
        "&scope=" + scope +
        "&nonce=" + createNonce() +
        "&state=" + createState();

    var returnUrl = encodeURIComponent(authUrl);

    window.location.href = "https://localhost:5010/Auth/Login?ReturnUrl=" + returnUrl;
}