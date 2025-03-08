﻿using Business;
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
        private readonly IUserHelper _userHelper;
        private readonly IJWTokenService _jWTokenService;

        public UserController(IUserRepository userRepository, IUserHelper userHelper, IJWTokenService jWTokenService) 
        {
            _userRepository = userRepository;
            _userHelper = userHelper;
            _jWTokenService = jWTokenService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User request)
        {
            try
            {
                // TODO: Add validation for user object
                await _userRepository.AddAsync(request);
                return Ok();
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
                // TODO: Add validation for user object and remember create new jwt token
                //await _userRepository.AddAsync(request);
                return Ok();
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

                await _userRepository.DeleteAsync(user.UserId);

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
