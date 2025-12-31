---
title: 'Entity Framework Core: Complete Guide to .NET ORM'
subtitle: 'Master EF Core with migrations, LINQ queries, and performance optimization'
readTime: '20-24 minutes'
date: '2024-09-05'
language: 'entityframework'
meta_description: 'Complete Entity Framework Core guide covering Code First, migrations, LINQ queries, relationships, and performance optimization for .NET applications.'
SEO_Keywords_List: 'Entity Framework Core, EF Core, .NET ORM, Code First, LINQ, database migrations, .NET data access'
---

# Entity Framework Core: Complete Guide to .NET ORM

Entity Framework Core is a modern object-relational mapper (ORM) for .NET. It enables developers to work with databases using .NET objects, eliminating the need for most data-access code.

## Why Entity Framework Core?

- 🎯 **Type-Safe** - LINQ queries with compile-time checking
- 🔄 **Cross-Platform** - Works on Windows, Linux, and macOS
- 📊 **Multiple Databases** - SQL Server, PostgreSQL, MySQL, SQLite, and more
- 🚀 **Performance** - Optimized query generation and tracking
- 🛠️ **Migrations** - Database schema versioning

## Installation

```bash
# Install EF Core packages
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools

# Install EF Core CLI tools
dotnet tool install --global dotnet-ef
```

## Creating Your First DbContext

```csharp
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Comment> Comments { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(
            "Server=(localdb)\\mssqllocaldb;Database=MyApp;Trusted_Connection=True;"
        );
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure entity relationships and constraints
        modelBuilder.Entity<Post>()
            .HasOne(p => p.User)
            .WithMany(u => u.Posts)
            .HasForeignKey(p => p.UserId);

        modelBuilder.Entity<Comment>()
            .HasOne(c => c.Post)
            .WithMany(p => p.Comments)
            .HasForeignKey(c => c.PostId);
    }
}
```

## Defining Entities

```csharp
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation property
    public ICollection<Post> Posts { get; set; }
}

public class Post
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public DateTime PublishedAt { get; set; }

    // Foreign key
    public int UserId { get; set; }

    // Navigation properties
    public User User { get; set; }
    public ICollection<Comment> Comments { get; set; }
}

public class Comment
{
    public int Id { get; set; }
    public string Text { get; set; }
    public DateTime CreatedAt { get; set; }

    public int PostId { get; set; }
    public Post Post { get; set; }
}
```

## Migrations

```bash
# Create initial migration
dotnet ef migrations add InitialCreate

# Update database
dotnet ef database update

# Add new migration after model changes
dotnet ef migrations add AddUserProfile

# Rollback to previous migration
dotnet ef database update PreviousMigrationName

# Remove last migration (if not applied)
dotnet ef migrations remove

# Generate SQL script
dotnet ef migrations script
```

## CRUD Operations

### Create

```csharp
using (var context = new ApplicationDbContext())
{
    var user = new User
    {
        Name = "John Doe",
        Email = "john@example.com",
        CreatedAt = DateTime.UtcNow
    };

    context.Users.Add(user);
    await context.SaveChangesAsync();

    Console.WriteLine($"Created user with ID: {user.Id}");
}
```

### Read

```csharp
using (var context = new ApplicationDbContext())
{
    // Get all users
    var allUsers = await context.Users.ToListAsync();

    // Get single user
    var user = await context.Users
        .FirstOrDefaultAsync(u => u.Email == "john@example.com");

    // Get user with posts
    var userWithPosts = await context.Users
        .Include(u => u.Posts)
        .FirstOrDefaultAsync(u => u.Id == 1);

    // Get user with posts and comments
    var userWithDetails = await context.Users
        .Include(u => u.Posts)
            .ThenInclude(p => p.Comments)
        .FirstOrDefaultAsync(u => u.Id == 1);
}
```

### Update

```csharp
using (var context = new ApplicationDbContext())
{
    var user = await context.Users.FindAsync(1);

    if (user != null)
    {
        user.Name = "Jane Doe";
        user.Email = "jane@example.com";

        await context.SaveChangesAsync();
    }
}
```

### Delete

```csharp
using (var context = new ApplicationDbContext())
{
    var user = await context.Users.FindAsync(1);

    if (user != null)
    {
        context.Users.Remove(user);
        await context.SaveChangesAsync();
    }
}
```

## LINQ Queries

### Filtering

```csharp
// Where clause
var activeUsers = await context.Users
    .Where(u => u.CreatedAt > DateTime.UtcNow.AddDays(-30))
    .ToListAsync();

// Multiple conditions
var results = await context.Posts
    .Where(p => p.UserId == 1 && p.PublishedAt.Year == 2024)
    .ToListAsync();
```

### Sorting

```csharp
// Order by
var sortedPosts = await context.Posts
    .OrderByDescending(p => p.PublishedAt)
    .ThenBy(p => p.Title)
    .ToListAsync();
```

### Projection

```csharp
// Select specific fields
var userNames = await context.Users
    .Select(u => new { u.Id, u.Name, u.Email })
    .ToListAsync();

// Complex projection
var postSummaries = await context.Posts
    .Select(p => new PostSummary
    {
        Title = p.Title,
        AuthorName = p.User.Name,
        CommentCount = p.Comments.Count
    })
    .ToListAsync();
```

### Grouping

```csharp
var postsByUser = await context.Posts
    .GroupBy(p => p.UserId)
    .Select(g => new
    {
        UserId = g.Key,
        PostCount = g.Count(),
        LatestPost = g.OrderByDescending(p => p.PublishedAt).First()
    })
    .ToListAsync();
```

### Joins

```csharp
var query = from user in context.Users
            join post in context.Posts on user.Id equals post.UserId
            where post.PublishedAt.Year == 2024
            select new
            {
                UserName = user.Name,
                PostTitle = post.Title
            };

var results = await query.ToListAsync();
```

## Relationships

### One-to-Many

```csharp
public class Blog
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<Post> Posts { get; set; }
}

public class Post
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int BlogId { get; set; }
    public Blog Blog { get; set; }
}

// Configuration
modelBuilder.Entity<Post>()
    .HasOne(p => p.Blog)
    .WithMany(b => b.Posts)
    .HasForeignKey(p => p.BlogId);
```

### Many-to-Many

```csharp
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<Course> Courses { get; set; }
}

public class Course
{
    public int Id { get; set; }
    public string Title { get; set; }
    public ICollection<Student> Students { get; set; }
}

// EF Core 5.0+ automatically creates join table
modelBuilder.Entity<Student>()
    .HasMany(s => s.Courses)
    .WithMany(c => c.Students);
```

### One-to-One

```csharp
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public UserProfile Profile { get; set; }
}

public class UserProfile
{
    public int Id { get; set; }
    public string Bio { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}

// Configuration
modelBuilder.Entity<User>()
    .HasOne(u => u.Profile)
    .WithOne(p => p.User)
    .HasForeignKey<UserProfile>(p => p.UserId);
```

## Advanced Features

### Raw SQL Queries

```csharp
// Execute raw SQL
var users = await context.Users
    .FromSqlRaw("SELECT * FROM Users WHERE CreatedAt > {0}", DateTime.UtcNow.AddDays(-30))
    .ToListAsync();

// Execute stored procedure
var results = await context.Users
    .FromSqlRaw("EXEC GetActiveUsers")
    .ToListAsync();

// Execute non-query
await context.Database.ExecuteSqlRawAsync(
    "UPDATE Users SET IsActive = 1 WHERE CreatedAt > {0}",
    DateTime.UtcNow.AddDays(-30)
);
```

### Global Query Filters

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // Soft delete filter
    modelBuilder.Entity<Post>()
        .HasQueryFilter(p => !p.IsDeleted);

    // Multi-tenant filter
    modelBuilder.Entity<Order>()
        .HasQueryFilter(o => o.TenantId == _currentTenantId);
}
```

### Value Conversions

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // Convert enum to string
    modelBuilder.Entity<User>()
        .Property(u => u.Status)
        .HasConversion<string>();

    // Custom conversion
    modelBuilder.Entity<User>()
        .Property(u => u.DateOfBirth)
        .HasConversion(
            v => v.ToUniversalTime(),
            v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
        );
}
```

### Shadow Properties

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .Property<DateTime>("LastModified");
}

// Set shadow property
context.Entry(post).Property("LastModified").CurrentValue = DateTime.UtcNow;
```

## Performance Optimization

### 1. AsNoTracking for Read-Only Queries

```csharp
// Faster for read-only scenarios
var users = await context.Users
    .AsNoTracking()
    .ToListAsync();
```

### 2. Explicit Loading

```csharp
var user = await context.Users.FindAsync(1);

// Load related data on demand
await context.Entry(user)
    .Collection(u => u.Posts)
    .LoadAsync();
```

### 3. Split Queries

```csharp
// Avoid cartesian explosion
var users = await context.Users
    .Include(u => u.Posts)
    .Include(u => u.Comments)
    .AsSplitQuery()
    .ToListAsync();
```

### 4. Compiled Queries

```csharp
private static readonly Func<ApplicationDbContext, int, Task<User>> _getUserById =
    EF.CompileAsyncQuery((ApplicationDbContext context, int id) =>
        context.Users.FirstOrDefault(u => u.Id == id));

// Use compiled query
var user = await _getUserById(context, 1);
```

### 5. Batch Operations

```csharp
// Bulk insert
var users = new List<User>();
for (int i = 0; i < 1000; i++)
{
    users.Add(new User { Name = $"User {i}" });
}

context.Users.AddRange(users);
await context.SaveChangesAsync();
```

## Best Practices

### 1. Use Dependency Injection

```csharp
// Startup.cs
services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

// Controller
public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UsersController(ApplicationDbContext context)
    {
        _context = context;
    }
}
```

### 2. Use DTOs for API Responses

```csharp
public class UserDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}

var users = await context.Users
    .Select(u => new UserDto
    {
        Id = u.Id,
        Name = u.Name,
        Email = u.Email
    })
    .ToListAsync();
```

### 3. Handle Concurrency

```csharp
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }

    [Timestamp]
    public byte[] RowVersion { get; set; }
}

try
{
    await context.SaveChangesAsync();
}
catch (DbUpdateConcurrencyException ex)
{
    // Handle concurrency conflict
}
```

## Conclusion

Entity Framework Core is a powerful ORM that simplifies data access in .NET applications. Master these concepts to build efficient, maintainable database applications.

## Resources

- [EF Core Documentation](https://docs.microsoft.com/en-us/ef/core/)
- [EF Core GitHub](https://github.com/dotnet/efcore)
