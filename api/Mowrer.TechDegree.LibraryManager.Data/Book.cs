using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mowrer.TechDegree.LibraryManager.Data;

[Table("Books")]
public class Book : IEquatable<Book>
{
    [Column("id")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    [Column("title")]
    public string Title { get; set; }
    
    [Column("author")]
    public string Author { get; set; }
    
    [Column("genre")]
    public string? Genre { get; set; }
    
    [Column("year")]
    public int? Year { get; set; }
    
    [Column("createdAt", TypeName = "DATETIME")]
    public DateTime CreatedAt { get; set; }
    
    [Column("updatedAt", TypeName = "DATETIME")]
    [Timestamp]
    public DateTime UpdatedAt { get; set; }

    public bool Equals(Book? other)
    {
        if (ReferenceEquals(null, other)) return false;
        if (ReferenceEquals(this, other)) return true;
        return Id == other.Id && Title == other.Title &&
               Author == other.Author &&
               Genre == other.Genre &&
               Year == other.Year &&
               CreatedAt.Equals(other.CreatedAt) &&
               UpdatedAt.Equals(other.UpdatedAt);
    }

    public override bool Equals(object? obj)
    {
        if (ReferenceEquals(null, obj)) return false;
        if (ReferenceEquals(this, obj)) return true;
        return obj.GetType() == GetType() && Equals((Book)obj);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Id, Title, Author, Genre, Year, CreatedAt, UpdatedAt);
    }
}