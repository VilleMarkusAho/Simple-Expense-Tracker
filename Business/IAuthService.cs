using Models;

namespace Business
{
    public interface IAuthService
    {
        Task<(UserWithoutPassword user, string token)?> LoginAsync(string username, string password);
    }
}
