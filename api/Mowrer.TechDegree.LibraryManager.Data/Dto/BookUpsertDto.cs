using System.ComponentModel.DataAnnotations;

namespace Mowrer.TechDegree.LibraryManager.Data.Dto;

public class BookUpsertDto
{
    [Required]
    public string Title { get; set; }
    
    [Required]
    public string Author { get; set; }
    
    public string? Genre { get; set; }
    
    public int? Year { get; set; }

    public Book ToModel() => new()
    {
        Title = Title,
        Author = Author,
        Genre = Genre,
        Year = Year
    };
}