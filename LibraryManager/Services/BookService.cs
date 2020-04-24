using LibraryManager.Models;
using LibraryManager.Repos;

namespace LibraryManager.Services
{
	public class BookService : EntityService<Book, ulong>
	{
		public BookService(IRepository<Book, ulong> repository) : base(repository)
		{
		}
	}
}
