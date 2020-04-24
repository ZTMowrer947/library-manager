#nullable enable

namespace LibraryManager.Models.Builders
{
	public class BookBuilder
	{
		private string _title = "";
		private string _author = "";
		private string? _genre;
		private int? _year;

		public BookBuilder WithTitle(string title)
		{
			_title = title;
			return this;
		}

		public BookBuilder WithAuthor(string author)
		{
			_author = author;
			return this;
		}

		public BookBuilder WithGenre(string? genre)
		{
			_genre = genre;
			return this;
		}

		public BookBuilder WithYear(int? year)
		{
			_year = year;
			return this;
		}

		public Book Build()
		{
			return new Book
			{
				Title = _title,
				Author = _author,
				Genre = _genre,
				Year = _year
			};
		}
	}
}
