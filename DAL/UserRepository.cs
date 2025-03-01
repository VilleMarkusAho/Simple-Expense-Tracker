using Microsoft.Extensions.Configuration;
using System.Data;
using Dapper;
using Models;

namespace DAL
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetUser(string username, string password);
    }

    public class UserRepository : IUserRepository
    {
        private readonly IDbConnection _connection;
        private readonly IConfiguration _configuration;
        private readonly int _defaultWorkFactor = 13;

        public UserRepository(IDbConnection connection, IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = connection;
        }

        // Databases needs to initialized during the application starts, since we are using an in-memory database
        public async Task CreateTable()
        {
            string query = @"
                CREATE TABLE IF NOT EXISTS Users (
                    UserId INTEGER PRIMARY KEY AUTOINCREMENT, 
                    Username VARCHAR(20) UNIQUE NOT NULL, 
                    Password VARCHAR(100) NOT NULL DEFAULT '', 
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

        public async Task<User?> GetUser(string username, string password) 
        {
            string query = "SELECT * FROM Users WHERE Username = @Username";

            var user = await _connection.QueryFirstOrDefaultAsync<User>(query, new { Username = username });

            // Verify the password using BCrypt since it's stored in a hashed format
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return null;
            }

            // Return the user without the password for security reasons
            user.Password = "";

            return user;
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            string query = "SELECT UserId, Username, FirstName, LastName FROM Users WHERE UserId = @id";

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
            entity.Password = BCrypt.Net.BCrypt.HashPassword(entity.Password, _defaultWorkFactor);

            int userId = await _connection.ExecuteScalarAsync<int>(query, entity);

            entity.UserId = userId;
            return entity;
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
