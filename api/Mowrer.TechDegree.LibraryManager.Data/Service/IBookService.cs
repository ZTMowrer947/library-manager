using Mowrer.TechDegree.LibraryManager.Data.Dto;

namespace Mowrer.TechDegree.LibraryManager.Data.Service;

public interface IBookService
{
    IEnumerable<BookViewDto> Get();

    BookViewDto? Get(int id);

    BookViewDto Create(BookUpsertDto bookData);

    BookViewDto Update(int id, BookUpsertDto updateData);

    void Delete(int id);
}