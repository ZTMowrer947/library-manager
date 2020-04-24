using System;
using System.ComponentModel.DataAnnotations;

namespace LibraryManager.Models
{
	public class Book : Entity<ulong>, IEquatable<Book?>
	{
		[Required(AllowEmptyStrings = false, ErrorMessage = "Title is required.")]
		public string Title { get; set; } = "";

		[Required(AllowEmptyStrings = false, ErrorMessage = "Author is required.")]
		public string Author { get; set; } = "";

		public string? Genre { get; set; }
		public int? Year { get; set; }

		public override bool Equals(object? obj)
		{
			return Equals(obj as Book);
		}

		public bool Equals(Book? other)
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
