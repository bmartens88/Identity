var config = {
    userStore: new Oidc.WebStorageStateStore({store: window.localStorage}),
    authority: "https://localhost:5010",
    client_id: "client_id_js",
    response_type: "code",
    post_logout_redirect_uri: "https://localhost:5004/Home/Index",
    redirect_uri: "https://localhost:5004/Home/SignIn",
    scope: "openid ApiOne ApiTwo rc.scope"
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

var signOut = function() {
    userManager.signoutRedirect();
}

var callApi = function () {
    axios.get("https://localhost:5001/secret")
        .then(res => {
            console.log(res);
        });
}

var refreshing = false;

axios.interceptors.response.use(
    function (response) {
        return response;
    }, 
    function (error) {
        console.log('axios error: ', error.response);
        
        var axiosConfig = error.response.config;
        
        // If error response is 401 try to refresh token
        if(error.response.status === 401)
        {
            // If already refreshing, don't make another request
            if(!refreshing) {
                refreshing = true;
                
                // Do the refresh
                return userManager.signinSilent().then(res => {
                    // Update the HTTP request and client
                    axios.defaults.headers.common["Authorization"] = "Bearer " + res.access_token;
                    axiosConfig.headers["Authorization"] = "Bearer " + res.access_token;
                    // Retry the HTTP request
                    return axios(axiosConfig);
                });
            }
        }
        
        return Promise.reject(error);
    });