var config = {
    authority: "https://localhost:5010",
    client_id: "client_id_js",
    response_type: "id_token token",
    redirect_uri: "https://localhost:5004/Home/SignIn",
    scope: "openid ApiOne"
}

var userManager = new Oidc.UserManager(config);

var signIn = function () {
    userManager.signinRedirect();
};

userManager.getUser().then(user => {
    console.log('user: ', user);
    if (user) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + user.access_token;
    }
});

var callApi = function () {
    axios.get("https://localhost:5001/secret")
        .then(res => {
            console.log(res);
        });
}