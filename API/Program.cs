using DAL;
using Microsoft.Data.Sqlite;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.Text;
using Business;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader());
});

// Add JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");

var secret = jwtSettings["Secret"];

ArgumentException.ThrowIfNullOrEmpty(secret);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret))
        };
    });

builder.Services.AddAuthorization();

// Initialize In-Memory Database Connection
var sqliteConnection = new SqliteConnection("DataSource=:memory:");
sqliteConnection.Open();

// Register repositories
builder.Services.AddSingleton<IDbConnection>(sqliteConnection);
builder.Services.AddSingleton<IUserRepository, UserRepository>();

// Register application services
builder.Services.AddScoped<IAuthService, AuthService>();

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
    var userRepository = scope.ServiceProvider.GetRequiredService<IUserRepository>();
    await userRepository.CreateTable();
}

app.Run();
