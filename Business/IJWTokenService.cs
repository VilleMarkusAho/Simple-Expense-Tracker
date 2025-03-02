using Models;

namespace Business
{
    public interface IJWTokenService
    {
        int TokenExpiryMinutes { get; }

        string GenerateJwtToken(User user);

        bool IsTokenWhitelisted(string token);

        void StoreToken(string token);

        void RevokeToken(string token);
    }
}
