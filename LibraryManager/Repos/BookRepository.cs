using LibraryManager.Data;
using LibraryManager.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryManager.Repos
{
	public class BookRepository : EntityRepository<Book, ulong>
	{
		public BookRepository(LibraryContext context) : base(context)
		{
		}

		public override async Task<ICollection<Book>> FindAll()
		{
			return await _context.Books.AsNoTracking().ToListAsync();
		}

		public override async Task<Book?> FindById(ulong id)
		{
			return await _context.Books
				.Where(book => book.Id == id)
				.AsNoTracking()
				.SingleOrDefaultAsync();
		}
	}
}
