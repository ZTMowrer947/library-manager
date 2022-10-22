using Microsoft.EntityFrameworkCore;

namespace Mowrer.TechDegree.LibraryManager.Data.Repositories;

public sealed class BookRepository : IBookRepository, IDisposable
{
    private readonly LibraryContext _context;

    public BookRepository(LibraryContext context)
    {
        _context = context;
    }

    public IEnumerable<Book> Get()
    {
        return _context.Books.AsNoTracking().AsEnumerable();
    }

    public Book? Get(int id) =>
        _context.Books
            .AsNoTracking()
            .SingleOrDefault(book => book.Id == id);

    public Book Create(Book data)
    {
        _context.Books.Add(data);

        _context.SaveChanges();

        return data;
    }

    public Book Update(Book book)
    {
        _context.Books.Update(book);

        _context.SaveChanges();

        return book;
    }

    public void Delete(Book book)
    {
        _context.Books.Remove(book);

        _context.SaveChanges();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}