using Business;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using System.ComponentModel.DataAnnotations;

namespace API.Controllers
{
    public class LoginRequest
    {
        [Required]
        public required string Username { get; set; }

        [Required]
        public required string Password { get; set; }
    }

    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LoginController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserHelper _userHelper;
        private readonly int _expiryMinutes;

        public LoginController(IAuthService authService, IUserHelper userHelper, IConfiguration configuration)
        {
            _authService = authService;
            _userHelper = userHelper;
            _expiryMinutes = configuration.GetValue<int>("JwtSettings:ExpiryMinutes");

            if (_expiryMinutes <= 0)
            {
                throw new Exception("Invalid expiry minutes in configuration");
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                // Skip login if user is already authenticated
                if (_userHelper.IsAuthenticated(User))
                {
                    LoginUser? loginUser = _userHelper.GetLoginUser(User);

                    if (loginUser != null)
                    {
                        return Ok(new { message = "Already logged in", result = loginUser });
                    }
                }

                var loginResult = await _authService.LoginAsync(request.Username, request.Password);

                if (loginResult == null)
                {
                    return Unauthorized();
                }

                var user = loginResult.Value.user;
                var token = loginResult.Value.token;

                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = false, // Set to true in production
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddMinutes(_expiryMinutes)
                };

                // Set token in HTTP only cookie
                Response.Cookies.Append("access_token", token, cookieOptions);

                return Ok(new { message = "Successful login", result = user });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
