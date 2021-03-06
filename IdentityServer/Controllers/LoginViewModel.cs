using System.Collections.Generic;
using Microsoft.AspNetCore.Authentication;

namespace IdentityServer.Controllers
{
    public class LoginViewModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string ReturnUrl { get; set; }
        
        // External identity providers
        public IEnumerable<AuthenticationScheme> ExternalProviders { get; set; }
    }
}