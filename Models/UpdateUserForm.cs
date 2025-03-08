using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class UpdateUserForm : CreateUserForm
    {
        public int? UserId { get; set; }
    }
}
