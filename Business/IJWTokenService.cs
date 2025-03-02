using Models;

namespace Business
{
    public interface IJWTokenService
    {
        int TokenExpiryMinutes { get; }

        string GenerateJwtToken(User user);
    }
}
