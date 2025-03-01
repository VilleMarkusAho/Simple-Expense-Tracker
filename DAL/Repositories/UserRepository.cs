using DAL.Models;
using Microsoft.Extensions.Configuration;
using Dapper;
using System.Data;

namespace DAL.Repositories
{
    public class UserRepository : IRepository<User>
    {
        private readonly IDbConnection _connection;
        private readonly IConfiguration _configuration;

        public UserRepository(IDbConnection connection, IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = connection;
        }

        public async Task CreateTable()
        {
            string query = @"
                CREATE TABLE IF NOT EXISTS Users (
                    UserId INTEGER PRIMARY KEY AUTOINCREMENT, 
                    Username VARCHAR(20) UNIQUE NOT NULL, 
                    Password VARCHAR(32) NOT NULL DEFAULT '', 
                    FirstName TEXT NOT NULL DEFAULT '', 
                    LastName TEXT NOT NULL DEFAULT ''
                )";

            await _connection.ExecuteAsync(query);

            var defaultUser = _configuration.GetSection("EXAMPLE_USER").Get<User>();

            if (defaultUser == null)
            {
                throw new Exception("No default user found in configuration");
            }

            await AddAsync(defaultUser);
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            string query = "SELECT * FROM Users WHERE UserId = @id";

            return await _connection.QueryFirstOrDefaultAsync<User>(query, new { id });
        }

        public async Task<User?> AddAsync(User entity)
        {
            string query = @"
                INSERT INTO Users (Username, Password, FirstName, LastName) 
                VALUES (@Username, @Password, @FirstName, @LastName);
                SELECT last_insert_rowid();";

            // Hash the password before storing it for security
            // Using 13 as the work factor is a good balance between security and performance
            entity.Password = BCrypt.Net.BCrypt.HashPassword(entity.Password, 13);

            int userId = await _connection.ExecuteScalarAsync<int>(query, entity);

            entity.UserId = userId;
            return entity;
        }

        public Task<IEnumerable<User>> GetAllAsync()
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
