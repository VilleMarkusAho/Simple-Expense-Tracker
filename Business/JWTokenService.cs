using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Business
{
    public class JWTokenService : IJWTokenService
    {
        private readonly IConfiguration _configuration;
        private readonly int _tokenExpiryMinutes;

        public JWTokenService(IConfiguration configuration) 
        {
            _configuration = configuration;

            _tokenExpiryMinutes = _configuration.GetValue<int>("JwtSettings:ExpiryMinutes");

            if (_tokenExpiryMinutes <= 0) 
            {
                throw new Exception("JWT expiry minutes missing in configuration");
            }
        }

        public int TokenExpiryMinutes { get { return _tokenExpiryMinutes; } }

        public string GenerateJwtToken(User user)
        {
            var settings = _configuration.GetSection("JwtSettings");
            var secret = settings["Secret"] ?? throw new Exception("JWT Secret is missing in configuration");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            Claim[] claims =
            [
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // Unique identifier for the token for preventing token replay attacks
                new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64), // Issued At Time
                new Claim("UserId", user.UserId.ToString()),
                new Claim("Username", user.Username),
                new Claim("FirstName", user.FirstName ?? ""),
                new Claim("LastName", user.LastName ?? "")
            ];

            var token = new JwtSecurityToken(
                issuer: settings["Issuer"],
                audience: settings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_tokenExpiryMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
