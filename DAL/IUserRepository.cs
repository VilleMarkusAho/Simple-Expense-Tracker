using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetUserAsync(string username, string password);
        Task<User?> GetUserAsync(string username);
    }
}
