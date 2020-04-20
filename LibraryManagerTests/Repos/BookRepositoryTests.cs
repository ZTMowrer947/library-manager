using Xunit;
using LibraryManager.Repos;
using System;
using System.Collections.Generic;
using System.Text;
using LibraryManager.Data;
using Microsoft.EntityFrameworkCore;
using LibraryManager.Models;
using LibraryManagerTests.Utils;
using System.Linq;

namespace LibraryManager.Repos.Tests
{
	public class LibraryContextFixture : IDisposable
	{
		public LibraryContext Context { get; private set; }
		public IRepository<Book, ulong> Repository { get; private set; }
		public ulong TestBookId => Context.Books.AsNoTracking().Last().Id;

		public LibraryContextFixture()
		{
			// Configure context
			var options = new DbContextOptionsBuilder<LibraryContext>()
				.UseInMemoryDatabase(databaseName: "library-book-testing")
				.Options;

			// Initialize and setup context
			Context = new LibraryContext(options);
			Context.Database.EnsureCreated();

			// Seed database with test data
			Context.EnsureSeeded();

			// Initialize repository under test
			Repository = new BookRepository(Context);
		}

		public void Dispose()
		{
			// Dispose context
			Context.Dispose();
		}
	}

	public class BookRepositoryTests : IClassFixture<LibraryContextFixture>
	{
		private readonly LibraryContextFixture _fixture;

		public BookRepositoryTests(LibraryContextFixture fixture)
		{
			_fixture = fixture ?? throw new ArgumentNullException(nameof(fixture));
		}

		[Fact()]
		public void FindAll_ShouldReturnNonEmptyBookListing()
		{
			// Get listing from repository
			var books = _fixture.Repository.FindAll();

			// Assert that collection has nonzero size
			Assert.True(books.Count > 0, "FindAll method should return non-empty book listing");
		}

		[Fact()]
		public void FindById_ShouldReturnNullIfCourseIsNotFound()
		{
			// Define ID of nonexistent book
			var id = ulong.MaxValue;

			// Attempt to get book from repository
			var book = _fixture.Repository.FindById(id);

			// Assert that book is null
			Assert.Null(book);
		}

		[Fact()]
		public void Create_ShouldPersistBook()
		{
			// Generate fake book data
			var newBook = BookUtils.GetFakeBook();

			// Save book using repository
			_fixture.Repository.Create(newBook);

			// Retrieve new book using context
			var retrievedBook = _fixture.Context.Books
				.Where(book => book.Id == newBook.Id)
				.AsNoTracking()
				.SingleOrDefault();

			// Assert that retrieved book is non-null and matches created book
			Assert.NotNull(retrievedBook);
			Assert.StrictEqual(newBook, retrievedBook);
		}

		[Fact()]
		public void Update_ShouldModifyExistingBook()
		{
			// Get test ID
			var testId = _fixture.TestBookId;

			// Retrieve current book with ID using context
			var currentBook = _fixture.Context.Books
				.Where(book => book.Id == testId)
				.AsNoTracking()
				.SingleOrDefault();

			// Generate fake book update data
			var updatedBook = BookUtils.GetFakeBook();

			// Attach test book Id to book update data
			updatedBook.Id = testId;

			// Update book using repository
			_fixture.Repository.Update(updatedBook);

			// Assert that books share the same ID, but are not equal
			Assert.StrictEqual(currentBook.Id, updatedBook.Id);
			Assert.NotStrictEqual(currentBook, updatedBook);
		}

		[Fact()]
		public void Delete_ShouldRemoveBook()
		{
			// Get test ID
			var testId = _fixture.TestBookId;

			// Retrieve book to delete with ID using context
			var bookToDelete = _fixture.Context.Books
				.Where(book => book.Id == testId)
				.AsNoTracking()
				.SingleOrDefault();

			// Delete book using repository
			_fixture.Repository.Delete(bookToDelete);

			// Attempt to fetch book again using context
			var deletedBook = _fixture.Context.Books
				.Where(book => book.Id == testId)
				.AsNoTracking()
				.SingleOrDefault();

			// Assert that post-delete fetch returned null
			Assert.Null(deletedBook);
		}
	}
}