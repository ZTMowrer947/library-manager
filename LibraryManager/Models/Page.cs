using System;
using System.Collections.Generic;

namespace LibraryManager.Models
{
	public class Page<T>
	{
		public int PageNumber { get; }
		public int TotalPages { get; }
		public int ItemsPerPage { get; }
		public ICollection<T> Data { get; }

		public Page(int pageNumber, int totalPages, int itemsPerPage, ICollection<T> data)
		{
			PageNumber = pageNumber;
			TotalPages = totalPages;
			ItemsPerPage = itemsPerPage;
			Data = data ?? throw new ArgumentNullException(nameof(data));
		}
	}
}
