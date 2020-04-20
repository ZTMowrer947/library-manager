using System;

namespace LibraryManager.Models
{
	public class Book : Entity<ulong>, IEquatable<Book>
	{
		public string Title { get; set; }
		public string Author { get; set; }
		public string Genre { get; set; }
		public int Year { get; set; }

		public override bool Equals(object obj)
		{
			return Equals(obj as Book);
		}

		public bool Equals(Book other)
		{
			return other != null &&
				   Title == other.Title &&
				   Author == other.Author &&
				   Genre == other.Genre &&
				   Year == other.Year;
		}

		public override int GetHashCode()
		{
			return HashCode.Combine(Title, Author, Genre, Year);
		}
	}
}
