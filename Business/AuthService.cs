using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DAL;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Models;

namespace Business
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<(UserWithoutPassword user, string token)?> LoginAsync(string username, string password)
        {
            var user = await _userRepository.GetUser(username, password);

            if (user == null)
            {
                return null;
            }

            // Generate JWT token
            var token = GenerateJwtToken(user.UserId.ToString(), user.Username);

            return (user, token);
        }

        private string GenerateJwtToken(string userId, string username)
        {
            var settings = _configuration.GetSection("JwtSettings");
            var secret = settings["Secret"] ?? throw new Exception("JWT Secret is missing in configuration");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
      
            var expiryMinutes = settings.GetValue<int>("ExpiryMinutes", 30);

            Claim[] claims =
            [
                new Claim(JwtRegisteredClaimNames.Sub, userId),
                new Claim(JwtRegisteredClaimNames.UniqueName, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // Unique identifier for the token for preventing token replay attacks
                new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64) // Issued At Time
            ];

            var token = new JwtSecurityToken(
                issuer: settings["Issuer"],
                audience: settings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expiryMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
