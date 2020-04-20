using LibraryManager.Models;
using LibraryManager.Repos;
using System;
using System.Threading.Tasks;

namespace LibraryManager.Services
{
	public class BookService : EntityService<Book, ulong>
	{
		public BookService(IRepository<Book, ulong> repository) : base(repository)
		{
		}
	}
}
