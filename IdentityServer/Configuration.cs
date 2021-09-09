using System.Collections.Generic;
using IdentityServer4;
using IdentityServer4.Models;

namespace IdentityServer
{
    public static class Configuration
    {
        public static IEnumerable<IdentityResource> GetResources() =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new("rc.scope", new[] {"rc.grandma"})
            };

        public static IEnumerable<ApiResource> GetApis() =>
            new List<ApiResource>
            {
                new("ApiOne", new[] {"rc.api.grandma"}) {Scopes = {"ApiOne"}},
                new("ApiTwo") {Scopes = {"ApiTwo"}}
            };

        public static IEnumerable<ApiScope> GetScopes() =>
            new[]
            {
                new ApiScope("ApiOne"),
                new ApiScope("ApiTwo")
            };

        public static IEnumerable<Client> GetClients() =>
            new List<Client>
            {
                new()
                {
                    ClientId = "client_id",
                    ClientSecrets = {new Secret("client_secret".Sha256())},

                    AllowedGrantTypes = GrantTypes.ClientCredentials,

                    AllowedScopes = {"ApiOne"},

                    RequireConsent = false
                },
                // Client using Code Flow, access to both API's
                new()
                {
                    ClientId = "client_id_mvc",
                    ClientSecrets = {new Secret("client_secret_mvc".Sha256())},

                    AllowedGrantTypes = GrantTypes.Code,

                    RedirectUris = {"https://localhost:5003/signin-oidc"},

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "ApiOne",
                        "ApiTwo",
                        "rc.scope"
                    },

                    // Normally you would access the user endpoint, but to save another roundtrip to the server, include
                    // claims in the ID Token
                    // AlwaysIncludeUserClaimsInIdToken = true,
                    
                    // To enable refresh tokens
                    AllowOfflineAccess = true,

                    RequireConsent = false
                },
                new()
                {
                    ClientId = "client_id_js",
                    
                    AllowedGrantTypes = GrantTypes.Implicit,
                    
                    RedirectUris = {"https://localhost:5004/Home/SignIn"},
                    
                    AllowedCorsOrigins = { "https://localhost:5004" },
                    
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        "ApiOne",
                        "ApiTwo",
                        "rc.scope"
                    },
                    
                    AccessTokenLifetime = 1,
                    
                    AllowAccessTokensViaBrowser = true,
                    
                    RequireConsent = false
                }
            };
    }
}