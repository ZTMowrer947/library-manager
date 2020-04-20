using LibraryManager.Models;
using LibraryManager.Models.Builders;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LibraryManagerTests.Utils
{
	class BookUtils
	{
		public static Book GetFakeBook()
		{
			// Generate properties of new book
			var title = string.Join(" ", Faker.Lorem.Words(3));
			var author = Faker.Name.FullName();
			var genre = "Testing";
			var currentYear = new DateTime().Year;
			var bookYear = currentYear - Faker.RandomNumber.Next(1, 50);

			// Build and return book
			return new BookBuilder()
				.WithTitle(title)
				.WithAuthor(author)
				.WithGenre(genre)
				.WithYear(bookYear)
				.Build();
		}

		public static IEnumerable<Book> GetFakeBooks(int count = 10) {
			// Generate given number of fake books
			return Enumerable.Range(1, count)
				.Select(id =>
				{
					// Generate fake book
					var book = GetFakeBook();

					// Set book ID
					book.Id = (ulong)id;

					// Return book data
					return book;
				});
		}
	}
}
