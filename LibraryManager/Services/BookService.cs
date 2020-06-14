using LibraryManager.Models;
using LibraryManager.Repos;

namespace LibraryManager.Services
{
	public class BookService : PagedEntityService<Book, ulong>
	{
		public BookService(IPagedRepository<Book, ulong> repository) : base(repository)
		{
		}
	}
}
