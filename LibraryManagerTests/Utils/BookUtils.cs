using LibraryManager.Models;
using LibraryManager.Models.Builders;
using System;

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
	}
}
