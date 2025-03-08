using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class UserForm
    {
        public required int UserId { get; set; }

        public required string Username { get; set; }

        public string FirstName { get; set; } = "";

        public string LastName { get; set; } = "";

        public string Password { get; set; } = "";

        public string ConfirmPassword { get; set; } = "";
    }
}
