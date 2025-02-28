using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LoginRequest
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
    }

    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        [HttpPost]
        public IActionResult Login(LoginRequest request)
        {
            return Ok();
        }
    }
}
