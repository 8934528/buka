using Microsoft.EntityFrameworkCore;
using Buka.Api.Models;

namespace Buka.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Zodiac> Zodiacs { get; set; }
    
    public DbSet<User> Users { get; set; }
}
