using Business;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly IUserHelper _userHelper;

        public AuthorizationController(IUserHelper userHelper)
        {
            _userHelper = userHelper;
        }

        [HttpGet("status")]
        public IActionResult IsAuthenticated()
        {
            bool isAuthenticated = _userHelper.IsAuthenticated(User);

            return Ok(isAuthenticated);
        }
    }
}
