using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mowrer.TechDegree.LibraryManager.Data;

[Table("Books")]
public class Book
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
    
    [Column("createdAt")]
    public DateTime CreatedAt { get; set; }
    
    [Column("updatedAt")]
    [Timestamp]
    public DateTime UpdatedAt { get; set; }
}