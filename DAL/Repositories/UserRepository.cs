using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;
using System.Data.SQLite;
using Microsoft.Extensions.Configuration;

namespace DAL.Repositories
{
    public class UserRepository : IRepository<User>
    {
        private readonly SQLiteConnection _connection;
        private readonly IConfiguration _configuration;

        public UserRepository(string connectionString, IConfiguration configuration)
        {
            _configuration = configuration;

            _connection = new SQLiteConnection(connectionString);
            _connection.Open();

            CreateTable();
        }

        private void CreateTable()
        {
            string query = @"
                CREATE TABLE IF NOT EXISTS Users (
                    UserId INTEGER PRIMARY KEY AUTOINCREMENT, 
                    Username VARCHAR(20) UNIQUE, 
                    Password VARCHAR(32), 
                    FirstName TEXT, 
                    LastName TEXT";

            using var cmd = new SQLiteCommand(query, _connection);
            cmd.ExecuteNonQuery();

            // Seed the database with a default user
            var defaultUser = _configuration.GetSection("EXAMPLE_USER") as User;



        }

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
