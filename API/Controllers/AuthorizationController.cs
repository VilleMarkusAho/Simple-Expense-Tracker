using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {

        [HttpGet("isAuthenticated")]
        public IActionResult IsAuthorized()
        {
            return Unauthorized();
        }
    }
}
