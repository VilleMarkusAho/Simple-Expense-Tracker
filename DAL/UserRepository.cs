using Microsoft.Extensions.Configuration;
using System.Data;
using Dapper;
using Models;

namespace DAL
{

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
                    Password VARCHAR(36) NOT NULL, 
                    FirstName VARCHAR(30) NOT NULL DEFAULT '', 
                    LastName VARCHAR(30) NOT NULL DEFAULT '',
                    CHECK(Password != '')
                )";

            await _connection.ExecuteAsync(query);

            var defaultUser = _configuration.GetSection("EXAMPLE_USER").Get<CreateUserForm>();

            if (defaultUser == null)
            {
                throw new Exception("No default user found in configuration");
            }

            await CreateAsync(defaultUser);
        }

        public async Task<User?> GetAsync(string username, string password) 
        {
            string query = "SELECT * FROM Users WHERE Username = @Username";

            var user = await _connection.QueryFirstOrDefaultAsync<User>(query, new { Username = username });

            // Verify the password using BCrypt since it's stored in a hashed format
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return null;
            }

            // Ensure that the password is not returned for security reasons
            user.Password = "";

            return user;
        }

        public async Task<User?> GetAsync(string username)
        {
            string query = "SELECT UserId, Username, FirstName, LastName FROM Users WHERE Username = @Username";

            var user = await _connection.QueryFirstOrDefaultAsync<User>(query, new { Username = username });
            
            if (user != null)
            {
                // Double check that the password is not returned for security reasons
                user.Password = "";
            }

            return user;
        }

        public async Task<User?> GetAsync(int userId)
        {
            string query = "SELECT UserId, Username, FirstName, LastName FROM Users WHERE UserId = @userId";

            return await _connection.QueryFirstOrDefaultAsync<User>(query, new { userId });
        }

        public async Task<User> CreateAsync(CreateUserForm form)
        {
            string query = @"
                INSERT INTO Users (Username, Password, FirstName, LastName) 
                VALUES (@Username, @Password, @FirstName, @LastName);
                SELECT last_insert_rowid();";

            // Hash the password before storing it for security
            // Using 13 as the work factor is a good balance between security and performance
            form.Password = BCrypt.Net.BCrypt.HashPassword(form.Password, _defaultWorkFactor);

            int userId = await _connection.ExecuteScalarAsync<int>(query, form);

            return new User
            {
                UserId = userId,
                Username = form.Username,
                FirstName = form.FirstName,
                LastName = form.LastName,
            };
        }

        public async Task<User> UpdateAsync(UpdateUserForm form)
        {
            string query = @"
                UPDATE Users 
                SET Username = @Username, Password = @Password, FirstName = @FirstName, LastName = @LastName
                WHERE UserId = @UserId;
                SELECT UserId, Username, FirstName, LastName FROM Users WHERE UserId = @UserId;";


            if (string.IsNullOrWhiteSpace(form.Password) == false)
            {
                form.Password = BCrypt.Net.BCrypt.HashPassword(form.Password, _defaultWorkFactor);
            }
            else
            {
                // If the password is not provided, we should not update it
                query = query.Replace("Password = @Password,", "");
            }

            var updatedEntity = await _connection.QueryFirstOrDefaultAsync<User>(query, form)
                ?? throw new ArgumentException("No user found with the given id");

            updatedEntity.Password = "";
            return updatedEntity;
        }

        public async Task<bool> DeleteAsync(int? userId)
        {
            string query = "DELETE FROM Users WHERE UserId = @userId";

            return await _connection.ExecuteAsync(query, new { userId }) > 0;
        }
    }
}