using Microsoft.EntityFrameworkCore;

namespace Mowrer.TechDegree.LibraryManager.Data;

public class LibraryContext : DbContext
{
    public LibraryContext(DbContextOptions options) : base(options)
    {
    }
    
    public DbSet<Book> Books { get; set; }

    private void AddTimestamps()
    {
        var entities = ChangeTracker.Entries()
            .Where(x => x.Entity is Book && x.State is EntityState.Added or EntityState.Modified);

        foreach (var entity in entities)
        {
            var now = DateTime.UtcNow;

            if (entity.State == EntityState.Added)
            {
                ((Book)entity.Entity).CreatedAt = now;
            }
            ((Book)entity.Entity).UpdatedAt = now;
        }
    }


    public override int SaveChanges()
    {
        AddTimestamps();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        AddTimestamps();
        return base.SaveChangesAsync(cancellationToken);
    }
}