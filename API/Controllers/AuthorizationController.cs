using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {

        [HttpGet("status")]
        public IActionResult IsAuthenticated()
        {
            bool isAuthenticated = User?.Identity?.IsAuthenticated ?? false;

            return Ok(isAuthenticated);
        }
    }
}
