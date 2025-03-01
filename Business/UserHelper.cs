using Models;
using System.Security.Claims;
using System.Security.Principal;

namespace Business
{
    public interface IUserHelper
    {
        LoginUser? GetLoginUser(ClaimsPrincipal? claimsPrincipal);

        bool IsAuthenticated(ClaimsPrincipal? principal);
    }

    public class UserHelper : IUserHelper
    {
        public bool IsAuthenticated(ClaimsPrincipal? principal)
        {
            return principal?.Identity?.IsAuthenticated ?? false;
        }

        public LoginUser? GetLoginUser(ClaimsPrincipal? claimsPrincipal)
        {
            LoginUser? user = null;
            var userClaims = claimsPrincipal?.Claims?.ToDictionary(c => c.Type, c => c.Value);

            if (userClaims != null)
            {
                // Get the user claims
                user = new LoginUser()
                {
                    UserId = userClaims != null ? int.Parse(userClaims["UserId"]) : -1,
                    Username = userClaims?["Username"] ?? "",
                    FirstName = userClaims?["FirstName"] ?? "",
                    LastName = userClaims?["LastName"]
                };
            }

            return user;
        }
    }
}
