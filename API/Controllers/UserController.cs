using DAL;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository) 
        {
            _userRepository = userRepository;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User request)
        {
            try
            {
                // TODO: Add validation for user object
                var createdUser = await _userRepository.AddAsync(request);
                return Ok(createdUser);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] User request)
        {
            try
            {
                // TODO: Add validation for user object
                //await _userRepository.AddAsync(request);
                return Ok();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

        }

                [HttpGet("exists/{username}")]
        public async Task<IActionResult> UserExists(string username)
        {
            try
            {
                var user = await _userRepository.GetUser(username);
                return Ok(user != null);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
