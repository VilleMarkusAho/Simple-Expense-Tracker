using Models;

namespace Business
{
    public interface IAuthService
    {
        Task<(LoginUser user, string token)?> LoginAsync(string username, string password);
    }
}
