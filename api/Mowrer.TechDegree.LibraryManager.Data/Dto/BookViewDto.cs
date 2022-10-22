namespace Mowrer.TechDegree.LibraryManager.Data.Dto;

public class BookViewDto
{
    public int Id { get; set; }
    
    public string Title { get; set; }
    
    public string Author { get; set; }
    
    public string? Genre { get; set; }
    
    public int? Year { get; set; }
    
    public Book ToModel() => new()
    {
        Id = Id,
        Title = Title,
        Author = Author,
        Genre = Genre,
        Year = Year
    };
}