#nullable enable
using LibraryManager.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace LibraryManager.DTOs
{
	public class BookDto : IEquatable<BookDto?>
	{
		public static BookDto FromModel(Book model)
		{
			return new BookDto
			{
				Id = model.Id,
				Title = model.Title,
				Author = model.Author,
				Genre = model.Genre,
				Year = model.Year
			};
		}

		public ulong Id { get; set; }

		[Required(AllowEmptyStrings = false, ErrorMessage = "Title is required.")]
		public string Title { get; set; } = "";

		[Required(AllowEmptyStrings = false, ErrorMessage = "Author is required.")]
		public string Author { get; set; } = "";

		public string? Genre { get; set; }
		public int? Year { get; set; }

		public Book ToModel()
		{
			return new Book
			{
				Id = Id,
				Title = Title,
				Author = Author,
				Genre = Genre,
				Year = Year
			};
		}

		public override bool Equals(object? obj)
		{
			return Equals(obj as BookDto);
		}

		public bool Equals(BookDto? other)
		{
			return other != null &&
				   Id == other.Id &&
				   Title == other.Title &&
				   Author == other.Author &&
				   Genre == other.Genre &&
				   Year == other.Year;
		}

		public override int GetHashCode()
		{
			return HashCode.Combine(Id, Title, Author, Genre, Year);
		}
	}
}
