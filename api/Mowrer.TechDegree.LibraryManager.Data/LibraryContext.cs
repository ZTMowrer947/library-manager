using Microsoft.EntityFrameworkCore;

namespace Mowrer.TechDegree.LibraryManager.Data;

public class LibraryContext : DbContext
{
    public LibraryContext(DbContextOptions options) : base(options)
    {
    }
    
    public DbSet<Book> Books { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>()
            .Property(b => b.CreatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP");

        modelBuilder.Entity<Book>()
            .Property(b => b.UpdatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP")
            .ValueGeneratedOnAddOrUpdate();
    }
}