using System;
using System.Collections;
using System.Collections.Generic;

namespace LibraryManager.Models
{
	public class Page<T> : IReadOnlyCollection<T>
	{
		public int PageNumber { get; }
		public int TotalPages { get; }
		public int ItemsPerPage { get; }
		public ICollection<T> Data { get; }

		public int Count => Data.Count;

		public Page(int pageNumber, int totalPages, int itemsPerPage, ICollection<T> data)
		{
			PageNumber = pageNumber;
			TotalPages = totalPages;
			ItemsPerPage = itemsPerPage;
			Data = data ?? throw new ArgumentNullException(nameof(data));
		}

		public static Page<T> FromCollection(ICollection<T> data)
		{
			return new Page<T>(pageNumber: 1, totalPages: 1, itemsPerPage: data.Count, data);
		}

		public IEnumerator<T> GetEnumerator()
		{
			return Data.GetEnumerator();
		}

		IEnumerator IEnumerable.GetEnumerator()
		{
			return GetEnumerator();
		}
	}
}
