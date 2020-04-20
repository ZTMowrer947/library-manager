using LibraryManager.Data;
using LibraryManager.Models;
using System;
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

		public override ICollection<Book> FindAll()
		{
			throw new NotImplementedException();
		}

		public override Book FindById(ulong id)
		{
			throw new NotImplementedException();
		}
	}
}
