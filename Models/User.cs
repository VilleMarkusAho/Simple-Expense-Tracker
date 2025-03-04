﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class LoginUser
    {
        public int UserId { get; set; }
        public required string Username { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }

    public class User : LoginUser
    {
        public required string Password { get; set; }
    }    
}
