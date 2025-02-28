using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;

namespace DAL.Repositories
{
    public class UserRepository : IRepository<User>
    {
        public Task<User> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<User>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<User> AddAsync(User entity)
        {
            throw new NotImplementedException();
        }
        public Task<User> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }
       
        public Task<User> UpdateAsync(User entity)
        {
            throw new NotImplementedException();
        }
    }
}
