# Buka Backend – PostgreSQL & EF Core Setup

This section explains how the backend database is configured using **ASP.NET Core + Entity Framework Core + PostgreSQL**.

---

## Stage 1 — Install EF Core Tools

Install the Entity Framework CLI tool globally:

```bash
dotnet tool install --global dotnet-ef
```

Verify installation:

```bash
dotnet ef
```

---

## Stage 2 — Install Required Packages

Run the following commands inside the backend project:

```bash
dotnet add package Microsoft.EntityFrameworkCore --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.Design --version 8.0.0
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL --version 8.0.0
```

These packages enable:

* ORM functionality (EF Core)
* Migration support
* PostgreSQL integration

---

## Stage 3 — Database Model

### Models/Zodiac.cs

```csharp
public class Zodiac
{
    public int Id { get; set; }

    public string Sign { get; set; } = string.Empty;
    public string Strengths { get; set; } = string.Empty;
    public string Weaknesses { get; set; } = string.Empty;
    public string Colors { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
```

This represents a zodiac record stored in the database.

---

## Stage 4 — DbContext

### Data/AppDbContext.cs

```csharp
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Zodiac> Zodiacs { get; set; }
}
```

This connects the model to the database.

---

## Stage 5 — Database Connection

### appsettings.json

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=buka_db;Username=postgres;Password=YOUR_PASSWORD"
  }
}
```

Replace `YOUR_PASSWORD` with your PostgreSQL password.

---

## Stage 6 — Migrations

Create the database structure:

```bash
dotnet ef migrations add InitialCreate
```

Apply it:

```bash
dotnet ef database update
```

## Stage 7 - INSTALL JWT PACKAGE

```bash
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 8.0.0
```

---

## Result

A PostgreSQL table named **Zodiacs** will be created with:

* Id
* Sign
* Strengths
* Weaknesses
* Colors
* CreatedAt

---

## How It Works

1. API receives a request (`/api/zodiac/{month}/{day}`)
2. Zodiac sign is calculated
3. Data is saved into PostgreSQL
4. Response is returned to the client (Flutter app)

---

## Outcome

* Persistent data storage
* History tracking enabled
* Backend ready for scaling
