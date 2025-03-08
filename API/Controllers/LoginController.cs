using Business;
using DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using System.ComponentModel.DataAnnotations;

namespace API.Controllers
{

    [Produces("application/json")]
    [Route("api")]
    [ApiController]
    [Authorize]
    public class LoginController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserHelper _userHelper;
        private readonly IJWTokenService _jwtService;

        public LoginController(IUserRepository userRepository, IUserHelper userHelper, IJWTokenService jwtService)
        {
            _userRepository = userRepository;
            _userHelper = userHelper;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
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

                if (string.IsNullOrWhiteSpace(request?.Username))
                {
                    return BadRequest(new { message = "Username is required" });
                }

                if (string.IsNullOrWhiteSpace(request?.Password))
                {
                    return BadRequest(new { message = "Password is required" });
                }

                var user = await _userRepository.GetAsync(request.Username, request.Password);

                if (user == null)
                {
                    return Unauthorized(new { message = "Invalid credentials" });
                }

                var token = _jwtService.GenerateJwtToken(user);

                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = false, // Use secure in production (HTTPS required)
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddMinutes(_jwtService.TokenExpiryMinutes)
                };

                // Set token in HTTP-only cookie
                Response.Cookies.Append("access_token", token, cookieOptions);

                return Ok(new { message = "Successful login", result = user });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("logout")]
        public IActionResult Logout() 
        {
            
            // Remove access token and invalidate the cookie
            Response.Cookies.Append("access_token", "", new()
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(-1) // Expire the cookie
            });

            return Ok(new { message = "Logged out successfully"});
        }
    }
}
