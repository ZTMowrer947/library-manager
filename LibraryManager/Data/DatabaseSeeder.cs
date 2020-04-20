using LibraryManager.Models;
using LibraryManager.Models.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryManager.Data
{
	public static class DatabaseSeeder
	{
		public static void EnsureSeeded(this LibraryContext @this)
		{
			// Define list of seed book data
			var books = new List<Book>()
			{
				new BookBuilder()
					.WithTitle("A Brief History of Time")
					.WithAuthor("Stephen Hawking")
					.WithGenre("Non-Fiction")
					.WithYear(1988)
					.Build(),

				new BookBuilder()
					.WithTitle("The Universe in a Nutshell")
					.WithAuthor("Stephen Hawking")
					.WithGenre("Non-Fiction")
					.WithYear(2001)
					.Build(),

				new BookBuilder()
					.WithTitle("The Martian")
					.WithAuthor("Andy Weir")
					.WithGenre("Science Fiction")
					.WithYear(2014)
					.Build(),

				new BookBuilder()
					.WithTitle("Ready Player One")
					.WithAuthor("Ernest Cline")
					.WithGenre("Science Fiction")
					.WithYear(2011)
					.Build(),

				new BookBuilder()
					.WithTitle("Armada")
					.WithAuthor("Ernest Cline")
					.WithGenre("Science Fiction")
					.WithYear(2015)
					.Build(),

				new BookBuilder()
					.WithTitle("Pride and Prejudice")
					.WithAuthor("Jane Austen")
					.WithGenre("Classic")
					.WithYear(1813)
					.Build(),

				new BookBuilder()
					.WithTitle("Emma")
					.WithAuthor("Jane Austen")
					.WithGenre("Classic")
					.WithYear(1815)
					.Build(),

				new BookBuilder()
					.WithTitle("Harry Potter and the Philosopher's Stone")
					.WithAuthor("J.K. Rowling")
					.WithGenre("Fantasy")
					.WithYear(1997)
					.Build(),

				new BookBuilder()
					.WithTitle("Harry Potter and the Chamber of Secrets")
					.WithAuthor("J.K. Rowling")
					.WithGenre("Fantasy")
					.WithYear(1998)
					.Build(),

				new BookBuilder()
					.WithTitle("Harry Potter and the Prisoner of Azkaban")
					.WithAuthor("J.K. Rowling")
					.WithGenre("Fantasy")
					.WithYear(1999)
					.Build(),

				new BookBuilder()
					.WithTitle("Harry Potter and the Goblet of Fire")
					.WithAuthor("J.K. Rowling")
					.WithGenre("Fantasy")
					.WithYear(2000)
					.Build(),

				new BookBuilder()
					.WithTitle("Harry Potter and the Order of the Phoenix")
					.WithAuthor("J.K. Rowling")
					.WithGenre("Fantasy")
					.WithYear(2003)
					.Build(),

				new BookBuilder()
					.WithTitle("Harry Potter and the Half-Blood Prince")
					.WithAuthor("J.K. Rowling")
					.WithGenre("Fantasy")
					.WithYear(2005)
					.Build(),

				new BookBuilder()
					.WithTitle("Harry Potter and the Deathly Hallows")
					.WithAuthor("J.K. Rowling")
					.WithGenre("Fantasy")
					.WithYear(2007)
					.Build(),
			};

			// Add book data to context
			@this.Books.AddRange(books);

			// Persist changes to database
			@this.SaveChanges();
		}
	}
}
