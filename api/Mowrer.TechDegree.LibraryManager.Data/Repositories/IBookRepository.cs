namespace Mowrer.TechDegree.LibraryManager.Data.Repositories;

public interface IBookRepository
{
    IEnumerable<Book> Get();

    Book? Get(int id);

    Book Create(Book data);

    Book Update(Book book);

    void Delete(Book book);
}