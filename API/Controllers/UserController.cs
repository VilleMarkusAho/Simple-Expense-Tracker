using Business;
using DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using FluentValidation;
using static API.Common.Extensions;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserHelper _userHelper;
        private readonly IJWTokenService _jWTokenService;
        private readonly IValidator<CreateUserForm> _createUserFormValidator;
        private readonly IValidator<UpdateUserForm> _updateUserFormValidator;


        public UserController(
            IUserRepository userRepository,
            IUserHelper userHelper,
            IJWTokenService jWTokenService,
            IValidator<CreateUserForm> createUserFormValidator,
            IValidator<UpdateUserForm> updateUserFormValidator
        )
        {
            _userRepository = userRepository;
            _userHelper = userHelper;
            _jWTokenService = jWTokenService;
            _createUserFormValidator = createUserFormValidator;
            _updateUserFormValidator = updateUserFormValidator;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserForm request)
        {
            try
            {
                if (request == null)
                {
                    return BadRequest(new { message = "Request body is required" });
                }

                await _createUserFormValidator.ValidateAndThrowAsync(request);
                await _userRepository.CreateAsync(request);

                return Ok(new { message = "User profile created successfully" });
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { message = ex.Errors });
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserForm request)
        {
            try
            {
                if (request == null)
                {
                    return BadRequest(new { message = "Request body is required" });
                }

                await _updateUserFormValidator.ValidateAndThrowAsync(request);

                var updatedUser = await _userRepository.UpdateAsync(request);
                var token = _jWTokenService.GenerateJwtToken(updatedUser);

                Response.Cookies.Append("access_token", token, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = false, // Use secure in production (HTTPS required)
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddMinutes(_jWTokenService.TokenExpiryMinutes)
                });

                return Ok(new
                {
                    message = "User profile updated successfully",
                    result = updatedUser
                });

            }
            catch (ValidationException ex)
            {
                return BadRequest(new { message = string.Join('\n', ex.Errors.Select(x => x.ErrorMessage)) });
            }
            catch (ArgumentException)
            {
                return NotFound(new { message = "User not found" });
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser()
        {
            try
            {
                LoginUser? user = _userHelper.GetLoginUser(User);

                if (user == null)
                {
                    return Unauthorized();
                }

                bool result = await _userRepository.DeleteAsync(user.UserId);

                if (result)
                {
                    return Ok(new { message = "User profile deleted successfully"});
                }
                
                return NotFound(new { message = "User not found" });
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [AllowAnonymous]
        [HttpGet("exists/{username}")]
        public async Task<IActionResult> UserExists(string username)
        {
            try
            {
                var user = await _userRepository.GetAsync(username);
                return Ok(user != null);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
