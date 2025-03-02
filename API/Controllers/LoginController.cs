using Business;
using DAL;
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
        private readonly IUserRepository _userRepository;
        private readonly IUserHelper _userHelper;
        private readonly IJWTokenService _jwtService;

        public LoginController(IUserRepository userRepository, IUserHelper userHelper, IJWTokenService jwtService)
        {
            _userRepository = userRepository;
            _userHelper = userHelper;
            _jwtService = jwtService;
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

                var user = await _userRepository.GetUser(request.Username, request.Password);

                if (user == null)
                {
                    return Unauthorized();
                }

                var token = _jwtService.GenerateJwtToken(user);

                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = false, // Set to true in production
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
    }
}
