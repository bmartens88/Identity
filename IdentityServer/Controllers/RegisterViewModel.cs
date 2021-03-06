using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace IdentityServer.Controllers
{
    public class RegisterViewModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string ReturnUrl { get; set; }
    }
}