namespace Mowrer.TechDegree.LibraryManager.Data.Dto;

public class BookViewDto : IEquatable<BookViewDto>
{
    public int Id { get; set; }
    
    public string Title { get; set; }
    
    public string Author { get; set; }
    
    public string? Genre { get; set; }
    
    public int? Year { get; set; }

    public BookViewDto(Book book)
    {
        Id = book.Id;
        Title = book.Title;
        Author = book.Author;
        Genre = book.Genre;
        Year = book.Year;
    }
    
    public Book ToModel() => new()
    {
        Id = Id,
        Title = Title,
        Author = Author,
        Genre = Genre,
        Year = Year
    };

    public bool Equals(BookViewDto? other)
    {
        if (ReferenceEquals(null, other)) return false;
        if (ReferenceEquals(this, other)) return true;
        return Id == other.Id && Title == other.Title && Author == other.Author && Genre == other.Genre && Year == other.Year;
    }

    public override bool Equals(object? obj)
    {
        if (ReferenceEquals(null, obj)) return false;
        if (ReferenceEquals(this, obj)) return true;
        return obj.GetType() == GetType() && Equals((BookViewDto)obj);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Id, Title, Author, Genre, Year);
    }
}