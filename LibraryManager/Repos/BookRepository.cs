#nullable enable
using LibraryManager.Data;
using LibraryManager.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace LibraryManager.Repos
{
	public class BookRepository : EntityRepository<Book, ulong>
	{
		public BookRepository(LibraryContext context) : base(context)
		{
		}

		public override ICollection<Book> FindAll()
		{
			return _context.Books.AsNoTracking().ToList();
		}

		public override Book? FindById(ulong id)
		{
			return _context.Books
				.Where(book => book.Id == id)
				.AsNoTracking()
				.SingleOrDefault();
		}
	}
}
