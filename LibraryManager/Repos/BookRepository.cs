using LibraryManager.Data;
using LibraryManager.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryManager.Repos
{
	public class BookRepository : PagedEntityRepository<Book, ulong>
	{
		public BookRepository(LibraryContext context) : base(context)
		{
		}

		public override async Task<ICollection<Book>> FindAll()
		{
			return await _context.Books.AsNoTracking().ToListAsync();
		}

		public override async Task<Page<Book>> FindPage(int pageNumber, int itemsPerPage)
		{
			// Get count of books in database
			var bookCount = await _context.Books.CountAsync();

			// Calculate pagination parameters
			var skip = itemsPerPage * (pageNumber - 1);
			var totalPages = (int)Math.Ceiling((decimal)bookCount / itemsPerPage);

			// Define book retrieval query
			var bookQuery = _context.Books
				.Skip(skip)
				.Take(itemsPerPage)
				.AsNoTracking();

			// Asynchronously execute query and get results as list
			var data = await bookQuery.ToListAsync();

			// Create page object
			var page = new Page<Book>(pageNumber, totalPages, itemsPerPage, data);

			// Return page data
			return page;
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
