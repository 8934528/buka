using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Buka.Api.Data;
using Buka.Api.Models;
using System.Security.Claims;

namespace Buka.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/user")]
public class UserController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    [HttpGet("profile")]
    public IActionResult GetProfile()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId == null)
            return Unauthorized();

        var user = _context.Users.FirstOrDefault(x => x.Id == int.Parse(userId));

        if (user == null)
            return NotFound();

        return Ok(new
        {
            user.Id,
            user.Name,
            user.Email,
            user.CreatedAt
        });
    }

    [HttpPut("profile")]
    public IActionResult UpdateProfile([FromBody] UpdateProfileDto request)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
            return Unauthorized();

        if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Email))
            return BadRequest(new { message = "Name and email are required." });

        var parsedUserId = int.Parse(userId);
        var user = _context.Users.FirstOrDefault(x => x.Id == parsedUserId);
        if (user == null)
            return NotFound(new { message = "User not found." });

        var normalizedEmail = request.Email.Trim().ToLowerInvariant();
        var emailExists = _context.Users.Any(x => x.Id != parsedUserId && string.Equals(x.Email, normalizedEmail, StringComparison.OrdinalIgnoreCase));
        if (emailExists)
            return BadRequest(new { message = "That email is already used by another account." });

        user.Name = request.Name.Trim();
        user.Email = normalizedEmail;
        _context.SaveChanges();

        return Ok(new
        {
            user.Id,
            user.Name,
            user.Email,
            user.CreatedAt
        });
    }
}
