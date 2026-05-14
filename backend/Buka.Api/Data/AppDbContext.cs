using Microsoft.EntityFrameworkCore;
using Buka.Api.Models;

namespace Buka.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Zodiac> Zodiacs { get; set; } = null!;
    
    public DbSet<User> Users { get; set; } = null!;
}
