using Microsoft.AspNetCore.Mvc;
using Buka.Api.Data;
using Buka.Api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Buka.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly string _jwtKey;

    public AuthController(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _jwtKey = ResolveJwtKey(configuration["Jwt:Key"]);
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterDto request)
    {
        try
        {
            Console.WriteLine($"Received registration request: {request.Name}, {request.Email}");
            var password = string.IsNullOrWhiteSpace(request.PasswordHash) ? request.Password : request.PasswordHash;
            var normalizedEmail = request.Email.Trim().ToLowerInvariant();

            // Validate input
            if (string.IsNullOrEmpty(request.Name) || 
                string.IsNullOrEmpty(normalizedEmail) || 
                string.IsNullOrEmpty(password))
            {
                return BadRequest(new { message = "All fields are required" });
            }

            // Check if user exists
            if (_context.Users.Any(x => x.Email.ToLower() == normalizedEmail))
                return BadRequest(new { message = "User already exists" });

            // Create new user
            var newUser = new User
            {
                Name = request.Name,
                Email = normalizedEmail,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(newUser);
            _context.SaveChanges();

            Console.WriteLine($"User registered successfully: {request.Email}");
            return Ok(new { message = "User registered successfully" });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error during registration: {ex.Message}");
            return StatusCode(500, new { message = $"Server error: {ex.Message}" });
        }
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto request)
    {
        try
        {
            Console.WriteLine($"Login attempt: {request.Email}");
            var password = string.IsNullOrWhiteSpace(request.PasswordHash) ? request.Password : request.PasswordHash;
            var normalizedEmail = request.Email.Trim().ToLowerInvariant();

            if (string.IsNullOrWhiteSpace(normalizedEmail) || string.IsNullOrWhiteSpace(password))
            {
                return BadRequest(new { message = "Email and password are required" });
            }

            var dbUser = _context.Users.FirstOrDefault(x => x.Email.ToLower() == normalizedEmail);

            if (dbUser == null)
            {
                Console.WriteLine($"User not found: {request.Email}");
                return Unauthorized(new { message = "Invalid email or password" });
            }

            if (!BCrypt.Net.BCrypt.Verify(password, dbUser.PasswordHash))
            {
                Console.WriteLine($"Invalid password for: {request.Email}");
                return Unauthorized(new { message = "Invalid email or password" });
            }

            var token = GenerateToken(dbUser);
            Console.WriteLine($"Login successful for: {request.Email}");

            return Ok(new { token });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error during login: {ex.Message}");
            return StatusCode(500, new { message = $"Server error: {ex.Message}" });
        }
    }

    private string GenerateToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var keyBytes = Encoding.UTF8.GetBytes(_jwtKey);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Name)
            }),
            Expires = DateTime.UtcNow.AddHours(2),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(keyBytes),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    private static string ResolveJwtKey(string? configuredKey)
    {
        const string fallbackKey = "BukaSuperSecretJwtSigningKey_AtLeast32Chars_2026_SecureKey";
        var key = string.IsNullOrWhiteSpace(configuredKey) ? fallbackKey : configuredKey;

        if (Encoding.UTF8.GetByteCount(key) < 32)
        {
            Console.WriteLine("JWT key is too short (< 256 bits). Falling back to secure default key.");
            return fallbackKey;
        }

        return key;
    }
}
