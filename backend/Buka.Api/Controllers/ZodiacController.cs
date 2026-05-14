using Microsoft.AspNetCore.Mvc;
using Buka.Api.Data;
using Buka.Api.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Buka.Api.Controllers;

[Authorize]

[ApiController]
[Route("api/zodiac")]

public class ZodiacController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    [HttpGet("{month}/{day}")]
    public async Task<IActionResult> Get(int month, int day)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (userId == null)
            return Unauthorized();

        var result = Calculate(month, day);
        
        var zodiac = new Zodiac
        {
            Sign = result.sign,
            Strengths = result.strengths,
            Weaknesses = result.weaknesses,
            Colors = result.colors,
            UserId = int.Parse(userId)
        };

        _context.Zodiacs.Add(zodiac);
        await _context.SaveChangesAsync();

        return Ok(result);
    }

    private static dynamic Calculate(int month, int day)
    {
        if ((month == 3 && day >= 21) || (month == 4 && day <= 19))
            return Create("Aries", "Brave, Confident", "Impulsive", "Red");

        if ((month == 4 && day >= 20) || (month == 5 && day <= 20))
            return Create("Taurus", "Reliable, Patient", "Stubborn", "Green");

        if ((month == 5 && day >= 21) || (month == 6 && day <= 20))
            return Create("Gemini", "Adaptable, Curious", "Indecisive", "Yellow");

        if ((month == 6 && day >= 21) || (month == 7 && day <= 22))
            return Create("Cancer", "Loyal, Protective", "Moody", "Silver");

        if ((month == 7 && day >= 23) || (month == 8 && day <= 22))
            return Create("Leo", "Leader, Confident", "Arrogant", "Gold");

        if ((month == 8 && day >= 23) || (month == 9 && day <= 22))
            return Create("Virgo", "Analytical, Organized", "Overthinking", "Grey");

        if ((month == 9 && day >= 23) || (month == 10 && day <= 22))
            return Create("Libra", "Balanced, Fair", "Indecisive", "Pink");

        if ((month == 10 && day >= 23) || (month == 11 && day <= 21))
            return Create("Scorpio", "Passionate, Loyal", "Jealous", "Black");

        if ((month == 11 && day >= 22) || (month == 12 && day <= 21))
            return Create("Sagittarius", "Optimistic, Adventurous", "Blunt", "Purple");

        if ((month == 12 && day >= 22) || (month == 1 && day <= 19))
            return Create("Capricorn", "Disciplined, Ambitious", "Rigid", "Brown");

        if ((month == 1 && day >= 20) || (month == 2 && day <= 18))
            return Create("Aquarius", "Innovative, Independent", "Detached", "Blue");

        return Create("Pisces", "Compassionate, Artistic", "Emotional", "Sea Green");
    }

    private static object Create(string sign, string strengths, string weaknesses, string colors)
    {
        return new
        {
            sign,
            strengths,
            weaknesses,
            colors
        };
    }

    [HttpGet("history")]
    public IActionResult GetHistory()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
            return Unauthorized();

        var parsedUserId = int.Parse(userId);
        var history = _context.Zodiacs
            .Where(x => x.UserId == parsedUserId)
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new {
                x.Sign,
                x.Strengths,
                x.Weaknesses,
                x.Colors,
                x.CreatedAt
            })
            .ToList();

        return Ok(history);
    }
}
