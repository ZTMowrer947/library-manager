using Mowrer.TechDegree.LibraryManager.Data.Dto;
using Mowrer.TechDegree.LibraryManager.Data.Repositories;

namespace Mowrer.TechDegree.LibraryManager.Data.Service;

public sealed class BookService : IBookService
{
    private IBookRepository _repository;

    public BookService(IBookRepository repository)
    {
        _repository = repository;
    }

    public IEnumerable<BookViewDto> Get() => _repository.Get().Select(book => new BookViewDto(book));

    public BookViewDto? Get(int id)
    {
        var book = _repository.Get(id);

        return book != null ? new BookViewDto(book) : null;
    }

    public BookViewDto Create(BookUpsertDto bookData)
    {
        var data = bookData.ToModel();

        var newBook = _repository.Create(data);

        return new BookViewDto(newBook);
    }

    public BookViewDto Update(int id, BookUpsertDto updateData)
    {
        var data = updateData.ToModel();
        data.Id = id;

        var updatedBook = _repository.Update(data);

        return new BookViewDto(updatedBook);
    }

    public void Delete(int id)
    {
        var book = _repository.Get(id);
        
        if (book != null)
            _repository.Delete(book);
    }
}