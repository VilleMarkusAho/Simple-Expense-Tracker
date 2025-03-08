using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public interface IUserRepository
    {
        Task CreateTable();
        Task<User?> GetAsync(int id);
        Task<User?> GetAsync(string username, string password);
        Task<User?> GetAsync(string username);
        Task<User> CreateAsync(CreateUserForm form);
        Task<User> UpdateAsync(UpdateUserForm form);
        Task<bool> DeleteAsync(int? userId);
    }
}
