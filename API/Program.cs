using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore.Sqlite;
using DAL;
using DAL.Repositories;
using DAL.Models;
using Microsoft.Data.Sqlite;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader());
});

var sqliteConnection = new SqliteConnection("DataSource=:memory:");
sqliteConnection.Open();

// Register repositories
builder.Services.AddSingleton<IDbConnection>(sqliteConnection);
builder.Services.AddSingleton<IRepository<User>, UserRepository>();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Initialize Database Tables
using (var scope = app.Services.CreateScope())
{
    // Initialize Repositories and create tables
    var userRepository = scope.ServiceProvider.GetRequiredService<IRepository<User>>();
    await userRepository.CreateTable();
}

app.Run();
