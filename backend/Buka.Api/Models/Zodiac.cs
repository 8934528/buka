namespace Buka.Api.Models;

public class Zodiac
{
    public int Id { get; set; }

    public string Sign { get; set; } = string.Empty;
    public string Strengths { get; set; } = string.Empty;
    public string Weaknesses { get; set; } = string.Empty;
    public string Colors { get; set; } = string.Empty;

    // store user input
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int UserId { get; set; }
    public User? User { get; set; }
}
